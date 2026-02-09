import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, Form, Button, Select, Input, Popover } from "@repo/ui";
import { useSetStatusDialogStore } from "./store";
import {
  useSetMemberStatus,
  useClearMemberStatus,
} from "@repo/backend/members/mutations";
import { useGetMemberStatus } from "@repo/backend/members/queries";
import { XIcon, SmileIcon } from "lucide-react";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";

// Status options with their display info
const STATUS_OPTIONS = [
  {
    value: "in_meeting" as const,
    label: "In a meeting",
    emoji: "📅",
  },
  {
    value: "focus" as const,
    label: "Focus",
    emoji: "🎯",
  },
  {
    value: "sick" as const,
    label: "Sick",
    emoji: "🤒",
  },
  {
    value: "vacation" as const,
    label: "Vacation",
    emoji: "🏝️",
  },
  {
    value: "custom" as const,
    label: "Custom status",
    emoji: "💬",
  },
];

// Duration options in milliseconds
const DURATION_OPTIONS = [
  { value: "30min", label: "30 minutes", ms: 30 * 60 * 1000 },
  { value: "1hour", label: "1 hour", ms: 60 * 60 * 1000 },
  { value: "4hours", label: "4 hours", ms: 4 * 60 * 60 * 1000 },
  { value: "today", label: "Today", ms: null }, // Will be calculated
  { value: "thisweek", label: "This week", ms: null }, // Will be calculated
  { value: "forever", label: "Don't clear", ms: undefined },
];

const formSchema = z.object({
  status: z.enum(["in_meeting", "focus", "sick", "vacation", "custom"]),
  customText: z.string().optional(),
  customEmoji: z.string().optional(),
  duration: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

// Helper to calculate end of today in ms from now
const getEndOfTodayMs = () => {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime();
};

// Helper to calculate end of week in ms from now
const getEndOfWeekMs = () => {
  const now = new Date();
  const endOfWeek = new Date(now);
  const daysUntilSunday = 7 - now.getDay();
  endOfWeek.setDate(now.getDate() + daysUntilSunday);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek.getTime();
};

export const SetStatusDialog = () => {
  const { isOpen, onClose } = useSetStatusDialogStore();
  const { mutate: setStatus, isPending: isSettingStatus } =
    useSetMemberStatus();
  const { mutate: clearStatus, isPending: isClearingStatus } =
    useClearMemberStatus();
  const { data: currentStatus, isPending: isGettingStatus } =
    useGetMemberStatus();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "focus",
      customText: "",
      customEmoji: "😊",
      duration: "1hour",
    },
  });

  const selectedStatus = form.watch("status");
  const customEmoji = form.watch("customEmoji");
  const isCustomStatus = selectedStatus === "custom";

  // Reset custom fields when switching away from custom
  useEffect(() => {
    if (!isGettingStatus) {
      console.log({ currentStatus });
      if (currentStatus?.status === "custom") {
        form.setValue("status", "custom");
        form.setValue("customText", currentStatus.customText);
        form.setValue("customEmoji", currentStatus.emoji);
      } else {
        form.setValue("status", currentStatus?.status ?? "focus");
        form.setValue("customText", "");
        form.setValue("customEmoji", "😊");
      }
    }
  }, [form, isGettingStatus, currentStatus]);

  const onSubmit = (values: FormValues) => {
    const statusOption = STATUS_OPTIONS.find((s) => s.value === values.status);
    const durationOption = DURATION_OPTIONS.find(
      (d) => d.value === values.duration,
    );

    let expiresAt: number | undefined;
    if (durationOption) {
      if (values.duration === "today") {
        expiresAt = getEndOfTodayMs();
      } else if (values.duration === "thisweek") {
        expiresAt = getEndOfWeekMs();
      } else if (durationOption.ms) {
        expiresAt = Date.now() + durationOption.ms;
      }
      // undefined means "Don't clear"
    }

    // Determine emoji and custom text based on status type
    const emoji = isCustomStatus ? values.customEmoji : statusOption?.emoji;
    const customText = isCustomStatus ? values.customText : undefined;

    setStatus(
      {
        status: values.status,
        emoji,
        customText,
        expiresAt,
      },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      },
    );
  };

  const handleClearStatus = () => {
    clearStatus(
      {},
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      form.reset();
    }
  };

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    form.setValue("customEmoji", emojiData.emoji);
    setIsEmojiPickerOpen(false);
  };

  const isPending = isSettingStatus || isClearingStatus;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content size="sm">
        <Dialog.Header>
          <Dialog.Title>Set a status</Dialog.Title>
          <Dialog.Description>
            Let your team know what you're up to.
          </Dialog.Description>
        </Dialog.Header>
        <div className="px-4">
          <Form {...form}>
            <Form.Base
              onSubmit={form.handleSubmit(onSubmit)}
              id="set-status-form"
            >
              <div className="space-y-4">
                {/* Status Selection */}
                <Form.Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    const selectedOption = STATUS_OPTIONS.find(
                      (option) => option.value === field.value,
                    );
                    const label = selectedOption
                      ? `${selectedOption.emoji} ${selectedOption.label}`
                      : "Select a status";
                    return (
                      <Form.Item>
                        <Form.Controller.Label>Status</Form.Controller.Label>
                        <Form.Controller.Field>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <Select.Trigger
                              variant="bordered"
                              className="w-full"
                            >
                              {label}
                            </Select.Trigger>
                            <Select.Content>
                              {STATUS_OPTIONS.map((option) => (
                                <Select.Item
                                  key={option.value}
                                  value={option.value}
                                  label={`${option.emoji} ${option.label}`}
                                />
                              ))}
                            </Select.Content>
                          </Select>
                        </Form.Controller.Field>
                        <Form.Controller.Message />
                      </Form.Item>
                    );
                  }}
                />

                {/* Custom Status Fields - Only shown when custom is selected */}
                {isCustomStatus && (
                  <>
                    {/* Custom Text Input with Emoji Picker */}
                    <Form.Controller
                      control={form.control}
                      name="customText"
                      render={({ field }) => (
                        <Form.Item>
                          <Form.Controller.Label>
                            What's your status?
                          </Form.Controller.Label>
                          <Form.Controller.Field>
                            <div className="flex gap-2">
                              {/* Emoji Selector Button */}
                              <Popover
                                open={isEmojiPickerOpen}
                                onOpenChange={setIsEmojiPickerOpen}
                              >
                                <Popover.Trigger asChild>
                                  <button
                                    color="tertiary"
                                    className="w-8 h-8 border border-border-2 rounded-md cursor-pointer"
                                  >
                                    {customEmoji || (
                                      <SmileIcon className="h-5 w-5 text-text-muted" />
                                    )}
                                  </button>
                                </Popover.Trigger>
                                <Popover.Content
                                  side="bottom"
                                  align="start"
                                  sideOffset={8}
                                  className="p-0 border-0 bg-transparent shadow-none"
                                >
                                  <EmojiPicker
                                    onEmojiClick={handleEmojiSelect}
                                    emojiStyle={EmojiStyle.NATIVE}
                                    width={320}
                                    height={400}
                                    searchPlaceholder="Search emoji..."
                                    previewConfig={{ showPreview: false }}
                                  />
                                </Popover.Content>
                              </Popover>
                              {/* Custom Text Input */}
                              <Input
                                {...field}
                                placeholder="What are you up to?"
                                className="flex-1"
                              />
                            </div>
                          </Form.Controller.Field>
                          <Form.Controller.Message />
                        </Form.Item>
                      )}
                    />
                  </>
                )}

                {/* Duration Selection */}
                <Form.Controller
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Controller.Label>Clear after</Form.Controller.Label>
                      <Form.Controller.Field>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Select.Trigger variant="bordered" className="w-full">
                            <Select.Value placeholder="Select duration" />
                            <Select.Icon />
                          </Select.Trigger>
                          <Select.Content>
                            {DURATION_OPTIONS.map((option) => (
                              <Select.Item
                                key={option.value}
                                value={option.value}
                                label={option.label}
                              />
                            ))}
                          </Select.Content>
                        </Select>
                      </Form.Controller.Field>
                      <Form.Controller.Message />
                    </Form.Item>
                  )}
                />
              </div>
            </Form.Base>
          </Form>
        </div>
        <Dialog.Footer>
          {currentStatus && (
            <Button
              variant="ghost"
              type="button"
              color="error"
              onClick={handleClearStatus}
              loading={isClearingStatus}
              disabled={isPending}
            >
              <XIcon className="h-4 w-4 mr-1" />
              Clear status
            </Button>
          )}
          <div className="flex-1" />
          <Button
            variant="ghost"
            type="button"
            color="tertiary"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="set-status-form"
            loading={isSettingStatus}
            disabled={isPending}
          >
            Save
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Form } from "@repo/ui";
import { useGetMemberWithProfile } from "@repo/backend/members/queries";
import { useUpdateMemberProfile } from "@repo/backend/members/mutations";
import { useGlobalData } from "@/common/providers/globalDataProvider/globalDataProvider";
import { Save, Loader2 } from "lucide-react";

type ProfileFormData = {
  name: string;
  displayName: string;
  role: string;
  location: string;
  bio: string;
  contactEmail: string;
  contactPhone: string;
};

export const ProfilePage = () => {
  const { workSpace } = useGlobalData();

  const { data: memberData, isPending: isLoading } = useGetMemberWithProfile(
    workSpace._id,
  );

  const { mutate: updateProfile, isPending: isSaving } =
    useUpdateMemberProfile();

  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      displayName: "",
      role: "",
      location: "",
      bio: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const {
    formState: { isDirty },
    reset,
  } = form;

  // Populate form when data loads
  useEffect(() => {
    if (memberData?.profile) {
      reset({
        name: memberData.profile.name || "",
        displayName: memberData.profile.displayName || "",
        role: memberData.profile.role || "",
        location: memberData.profile.location || "",
        bio: memberData.profile.bio || "",
        contactEmail: memberData.profile.contactEmail || "",
        contactPhone: memberData.profile.contactPhone || "",
      });
    }
  }, [memberData, reset]);

  const onSubmit = (data: ProfileFormData) => {
    if (!memberData?.member?._id) return;

    updateProfile(
      {
        memberId: memberData.member._id,
        ...data,
      },
      {
        onSuccess: () => {
          reset(data);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
        <p className="text-text-muted">
          Update your profile information for this workspace.
        </p>
      </div>

      <Form {...form}>
        <Form.Base onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Form.Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Controller.Label>Full Name</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input placeholder="Your full name" {...field} />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Item>
                )}
              />

              <Form.Controller
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Controller.Label>Display Name</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input
                        placeholder="How you want to be called"
                        {...field}
                      />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Item>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Controller.Label>Job Title</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input placeholder="e.g. Software Engineer" {...field} />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Item>
                )}
              />

              <Form.Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Controller.Label>Location</Form.Controller.Label>
                    <Form.Controller.Field>
                      <Input placeholder="e.g. San Francisco, CA" {...field} />
                    </Form.Controller.Field>
                    <Form.Controller.Message />
                  </Form.Item>
                )}
              />
            </div>

            <Form.Controller
              control={form.control}
              name="bio"
              render={({ field }) => (
                <Form.Item>
                  <Form.Controller.Label>Bio</Form.Controller.Label>
                  <Form.Controller.Field>
                    <textarea
                      placeholder="Tell others a bit about yourself..."
                      rows={4}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border-2 bg-background-muted text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      {...field}
                    />
                  </Form.Controller.Field>
                  <Form.Controller.Message />
                </Form.Item>
              )}
            />

            <div className="border-t border-border-2 pt-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Contact Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <Form.Controller
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Controller.Label>
                        Contact Email
                      </Form.Controller.Label>
                      <Form.Controller.Field>
                        <Input
                          type="email"
                          placeholder="work@example.com"
                          {...field}
                        />
                      </Form.Controller.Field>
                      <Form.Controller.Message />
                    </Form.Item>
                  )}
                />

                <Form.Controller
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Controller.Label>
                        Phone Number
                      </Form.Controller.Label>
                      <Form.Controller.Field>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...field}
                        />
                      </Form.Controller.Field>
                      <Form.Controller.Message />
                    </Form.Item>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={!isDirty || isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </Form.Base>
      </Form>
    </div>
  );
};

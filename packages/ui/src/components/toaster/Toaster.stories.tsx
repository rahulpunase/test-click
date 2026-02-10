import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast, useToast } from "./Toaster";
import { Button } from "../button/Button";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

const ToasterDemo = () => {
  const { show, success, error, warning, info, promise } = useToast();

  const runPromise = () => {
    promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: { title: "Loading...", description: "Please wait" },
      success: { title: "Success", description: "Promise resolved" },
      error: { title: "Error", description: "Promise rejected" },
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2 flex-wrap justify-center max-w-lg">
        <Button
          variant="outlined"
          onClick={() =>
            show({
              title: "Default Notification",
              description: "This is a standard toast message.",
            })
          }
        >
          Default
        </Button>
        <Button
          variant="solid"
          color="success"
          onClick={() =>
            success("Success", "Your changes have been saved successfully.")
          }
        >
          Success
        </Button>
        <Button
          variant="solid"
          color="error"
          onClick={() =>
            error("Error Occurred", "Something went wrong. Please try again.")
          }
        >
          Error
        </Button>
        <Button
          variant="solid"
          color="secondary"
          onClick={() =>
            warning("Warning", "Your account is about to expire in 3 days.")
          }
        >
          Warning
        </Button>
        <Button
          variant="solid"
          color="tertiary"
          onClick={() =>
            info("New Update", "A new software update is available.")
          }
        >
          Info
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            show({
              title: "With Action",
              description: "File deleted successfully",
              actionProps: {
                children: "Undo",
                onClick: () => alert("Undo clicked"),
              },
            })
          }
        >
          With Action
        </Button>
        <Button variant="ghost" onClick={runPromise}>
          Promise Toast
        </Button>
      </div>
    </div>
  );
};

export const Demo: Story = {
  render: (args) => (
    <Toaster {...args}>
      <ToasterDemo />
    </Toaster>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 h-[300px] w-full items-center justify-items-center">
      <Toaster position="top-left">
        <Button
          size="sm"
          variant="outlined"
          onClick={() => toast.show({ title: "Top Left" })}
        >
          Top Left
        </Button>
      </Toaster>
      <Toaster position="top-center">
        <Button
          size="sm"
          variant="outlined"
          onClick={() => toast.show({ title: "Top Center" })}
        >
          Top Center
        </Button>
      </Toaster>
      <Toaster position="top-right">
        <Button
          size="sm"
          variant="outlined"
          onClick={() => toast.show({ title: "Top Right" })}
        >
          Top Right
        </Button>
      </Toaster>
      <Toaster position="bottom-left">
        <Button
          size="sm"
          variant="outlined"
          onClick={() => toast.show({ title: "Bottom Left" })}
        >
          Bottom Left
        </Button>
      </Toaster>
      <Toaster position="bottom-center">
        <Button
          size="sm"
          variant="outlined"
          onClick={() => toast.show({ title: "Bottom Center" })}
        >
          Bottom Center
        </Button>
      </Toaster>
      <Toaster position="bottom-right">
        <Button
          size="sm"
          variant="outlined"
          onClick={() => toast.show({ title: "Bottom Right" })}
        >
          Bottom Right
        </Button>
      </Toaster>
    </div>
  ),
};

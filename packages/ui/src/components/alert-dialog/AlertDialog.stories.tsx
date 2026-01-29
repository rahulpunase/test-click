import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../button/Button";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>
        <AlertDialog open={open} onClose={setOpen}>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Content>
            <p className="text-sm text-text-muted">
              Additional content can act as a body for the dialog if needed,
              separate from the description.
            </p>
          </AlertDialog.Content>
          <AlertDialog.Actions>
            <Button
              variant="outlined"
              color="tertiary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Continue
            </Button>
          </AlertDialog.Actions>
        </AlertDialog>
      </>
    );
  },
};

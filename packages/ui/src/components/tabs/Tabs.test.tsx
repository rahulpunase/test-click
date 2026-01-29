import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("renders correctly", () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("switches tabs on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));

    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Content 2")).toBeVisible();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("supports custom render prop for trigger", () => {
    render(
      <Tabs defaultValue="custom">
        <Tabs.List>
          <Tabs.Trigger
            value="custom"
            render={(props) => (
              <button {...props} data-testid="custom-trigger">
                Custom
              </button>
            )}
          />
        </Tabs.List>
        <Tabs.Content value="custom">Content</Tabs.Content>
      </Tabs>,
    );

    expect(screen.getByTestId("custom-trigger")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });
});

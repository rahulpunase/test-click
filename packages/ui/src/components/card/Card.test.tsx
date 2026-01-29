import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@/test-utils";
import { Card } from "./Card";
import { Settings } from "lucide-react";
import * as React from "react";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <Card.Content>Test content</Card.Content>
      </Card>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders header with title", () => {
    render(
      <Card>
        <Card.Header title="Test Title" />
        <Card.Content>Content</Card.Content>
      </Card>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders header with right icon", () => {
    render(
      <Card>
        <Card.Header
          title="Settings"
          icon={<Settings data-testid="settings-icon" />}
        />
        <Card.Content>Content</Card.Content>
      </Card>,
    );
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("renders footer with border", () => {
    render(
      <Card>
        <Card.Content>Content</Card.Content>
        <Card.Footer>
          <button>Action</button>
        </Card.Footer>
      </Card>,
    );
    expect(screen.getByText("Action")).toBeInTheDocument();
    const footer = screen.getByText("Action").parentElement;
    expect(footer).toHaveClass("border-t");
  });

  it("handles selectable behavior", () => {
    render(
      <Card selectable data-testid="selectable-card">
        <Card.Header title="Selectable" />
        <Card.Content>Click me</Card.Content>
      </Card>,
    );

    const card = screen.getByTestId("selectable-card");

    // Initially not selected - should have cursor-pointer but not ring
    expect(card).toHaveClass("cursor-pointer");
    expect(card).not.toHaveClass("ring-2");

    // Click to select
    fireEvent.click(card);

    // Should now have ring classes
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-primary");
    expect(card).toHaveClass("border-primary");

    // Click to deselect
    fireEvent.click(card);
    expect(card).not.toHaveClass("ring-2");
  });

  it("starts with defaultSelected state", () => {
    render(
      <Card selectable defaultSelected data-testid="selected-card">
        <Card.Content>Selected</Card.Content>
      </Card>,
    );

    const card = screen.getByTestId("selected-card");
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-primary");
  });

  it("shows collapse icon only when collapsible", () => {
    const { rerender } = render(
      <Card>
        <Card.Header title="Not Collapsible" />
        <Card.Content>Content</Card.Content>
      </Card>,
    );

    expect(screen.queryByLabelText("Collapse")).not.toBeInTheDocument();

    rerender(
      <Card collapsible>
        <Card.Header title="Collapsible" />
        <Card.Content>Content</Card.Content>
      </Card>,
    );

    expect(screen.getByLabelText("Collapse")).toBeInTheDocument();
  });

  it("handles collapsible behavior", () => {
    render(
      <Card collapsible>
        <Card.Header title="Collapsible Card" />
        <Card.Content data-testid="content">Hidden content</Card.Content>
      </Card>,
    );

    const content = screen.getByTestId("content");
    const collapseButton = screen.getByLabelText("Collapse");

    // Initially expanded
    expect(content).not.toHaveClass("hidden");
    expect(content).not.toHaveClass("h-0");

    // Click to collapse
    fireEvent.click(collapseButton);
    expect(content).toHaveClass("hidden");
    expect(content).toHaveClass("h-0");

    // Click to expand
    fireEvent.click(collapseButton);
    expect(content).not.toHaveClass("hidden");
  });

  it("starts with defaultCollapsed state", () => {
    render(
      <Card collapsible defaultCollapsed>
        <Card.Header title="Collapsed" />
        <Card.Content data-testid="content">Hidden</Card.Content>
      </Card>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("hidden");
    expect(content).toHaveClass("h-0");
  });

  it("calls onSelectedChange callback", () => {
    let selectedState = false;
    const handleSelectedChange = (selected: boolean) => {
      selectedState = selected;
    };

    render(
      <Card
        selectable
        onSelectedChange={handleSelectedChange}
        data-testid="card"
      >
        <Card.Content>Test</Card.Content>
      </Card>,
    );

    const card = screen.getByTestId("card");
    fireEvent.click(card);

    expect(selectedState).toBe(true);
  });

  it("accepts custom className", () => {
    render(
      <Card className="custom-class" data-testid="card">
        <Card.Content>Test</Card.Content>
      </Card>,
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("custom-class");
  });

  it("renders custom header children", () => {
    render(
      <Card collapsible>
        <Card.Header>
          <div data-testid="custom-header">Custom Header Content</div>
        </Card.Header>
        <Card.Content>Content</Card.Content>
      </Card>,
    );

    expect(screen.getByTestId("custom-header")).toBeInTheDocument();
    // Collapse button should still be present
    expect(screen.getByLabelText("Collapse")).toBeInTheDocument();
  });

  it("supports both selectable and collapsible features together", () => {
    render(
      <Card selectable collapsible data-testid="card">
        <Card.Header title="Both Features" />
        <Card.Content data-testid="content">Test</Card.Content>
      </Card>,
    );

    const card = screen.getByTestId("card");
    const content = screen.getByTestId("content");
    const collapseButton = screen.getByLabelText("Collapse");

    // Test selectable
    fireEvent.click(card);
    expect(card).toHaveClass("ring-2");

    // Test collapsible
    fireEvent.click(collapseButton);
    expect(content).toHaveClass("hidden");
  });

  it("stops propagation on collapse button click", () => {
    let cardClicked = false;
    const handleCardClick = () => {
      cardClicked = true;
    };

    render(
      <Card selectable collapsible onClick={handleCardClick}>
        <Card.Header title="Test" />
        <Card.Content>Content</Card.Content>
      </Card>,
    );

    const collapseButton = screen.getByLabelText("Collapse");
    fireEvent.click(collapseButton);

    // Clicking collapse button should not trigger card selection
    expect(cardClicked).toBe(false);
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Card ref={ref}>
        <Card.Content>Test</Card.Content>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

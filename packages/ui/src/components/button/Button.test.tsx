import { describe, it, expect } from "vitest";
import { render, screen } from "../../test-utils";
import { Button } from "./Button";
import { Plus } from "lucide-react";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<Button icon={Plus}>Add Item</Button>);
    expect(screen.getByText("Add Item")).toBeInTheDocument();
    // Icon should be rendered
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <Button variant="solid" color="primary">
        Test
      </Button>,
    );
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");

    rerender(
      <Button variant="outlined" color="secondary">
        Test
      </Button>,
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass("border-secondary");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("text-xs");

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("text-base");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("accepts custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Button ref={ref as any}>Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("handles onClick event", async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    button.click();

    expect(clicked).toBe(true);
  });

  it("supports all color variants", () => {
    const colors = [
      "primary",
      "secondary",
      "tertiary",
      "success",
      "error",
    ] as const;

    colors.forEach((color) => {
      const { unmount } = render(<Button color={color}>{color}</Button>);
      expect(screen.getByText(color)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders icon-only button with aria-label", () => {
    render(<Button icon={Plus} aria-label="Add item" />);
    const button = screen.getByRole("button", { name: "Add item" });
    expect(button).toBeInTheDocument();
  });

  it("applies square padding for icon-only buttons", () => {
    const { rerender } = render(
      <Button icon={Plus} size="sm" aria-label="Add" />,
    );
    let button = screen.getByRole("button");
    expect(button).toHaveClass("px-1");

    rerender(<Button icon={Plus} size="md" aria-label="Add" />);
    button = screen.getByRole("button");
    expect(button).toHaveClass("px-1.5");

    rerender(<Button icon={Plus} size="lg" aria-label="Add" />);
    button = screen.getByRole("button");
    expect(button).toHaveClass("px-2");
  });
});

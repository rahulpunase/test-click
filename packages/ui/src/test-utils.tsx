import { render, type RenderOptions } from "@testing-library/react";
import { type ReactElement } from "react";

// Re-export everything from testing library
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// Custom render function with providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { ...options });
}

export { customRender as render };

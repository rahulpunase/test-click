import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0a0a0a",
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      // Apply theme class to the body
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
      }

      return (
        <div className={theme} style={{ minHeight: "100vh" }}>
          <div
            className="flex items-center justify-center"
            style={{ minHeight: "100vh" }}
          >
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;

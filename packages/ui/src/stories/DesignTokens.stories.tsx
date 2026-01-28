import type { Meta, StoryObj } from "@storybook/react";

const DesignTokensComponent = () => <div />;

const meta: Meta<typeof DesignTokensComponent> = {
  title: "Design System/Design Tokens",
  component: DesignTokensComponent,
};

export default meta;
type Story = StoryObj<typeof DesignTokensComponent>;

// Colors Story
export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Color Palette</h2>

      {/* Primary Colors */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Primary (Brand Blue)</h3>
        <div className="grid grid-cols-11 gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            (shade) => (
              <div key={shade} className="text-center">
                <div
                  className={`h-20 rounded-lg mb-2 bg-primary-${shade}`}
                  style={{
                    backgroundColor: `rgb(var(--primary-${shade}) / 1)`,
                  }}
                />
                <p className="text-xs font-medium">{shade}</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Secondary Colors */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Secondary (Purple)</h3>
        <div className="grid grid-cols-11 gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            (shade) => (
              <div key={shade} className="text-center">
                <div
                  className={`h-20 rounded-lg mb-2 bg-secondary-${shade}`}
                  style={{
                    backgroundColor: `rgb(var(--secondary-${shade}) / 1)`,
                  }}
                />
                <p className="text-xs font-medium">{shade}</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Neutral Colors */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Neutral (Gray)</h3>
        <div className="grid grid-cols-11 gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            (shade) => (
              <div key={shade} className="text-center">
                <div className={`h-20 rounded-lg mb-2 bg-neutral-${shade}`} />
                <p className="text-xs font-medium">{shade}</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="grid grid-cols-4 gap-6">
        {["success", "warning", "error", "info"].map((semantic) => (
          <div key={semantic}>
            <h3 className="text-xl font-semibold mb-3 capitalize">
              {semantic}
            </h3>
            <div className="space-y-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="flex items-center gap-2">
                    <div
                      className={`h-10 w-10 rounded bg-${semantic}-${shade} flex-shrink-0`}
                    />
                    <span className="text-sm">{shade}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Typography Story
export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Typography</h2>

      {/* Font Families */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Font Families</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-600 mb-1">Sans (Inter)</p>
            <p className="font-sans text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">Mono (Fira Code)</p>
            <p className="font-mono text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </div>

      {/* Font Sizes */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Font Sizes</h3>
        <div className="space-y-2">
          {[
            { size: "xs", label: "Extra Small (12px)" },
            { size: "sm", label: "Small (14px)" },
            { size: "base", label: "Base (16px)" },
            { size: "lg", label: "Large (18px)" },
            { size: "xl", label: "Extra Large (20px)" },
            { size: "2xl", label: "2XL (24px)" },
            { size: "3xl", label: "3XL (30px)" },
            { size: "4xl", label: "4XL (36px)" },
            { size: "5xl", label: "5XL (48px)" },
            { size: "6xl", label: "6XL (60px)" },
          ].map(({ size, label }) => (
            <div key={size}>
              <p className="text-sm text-neutral-600">{label}</p>
              <p className={`text-${size}`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Font Weights</h3>
        <div className="space-y-2">
          {[
            { weight: "light", label: "Light (300)" },
            { weight: "normal", label: "Normal (400)" },
            { weight: "medium", label: "Medium (500)" },
            { weight: "semibold", label: "Semibold (600)" },
            { weight: "bold", label: "Bold (700)" },
            { weight: "extrabold", label: "Extra Bold (800)" },
            { weight: "black", label: "Black (900)" },
          ].map(({ weight, label }) => (
            <div key={weight}>
              <p className="text-sm text-neutral-600">{label}</p>
              <p className={`font-${weight} text-xl`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Spacing Story
export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Spacing Scale</h2>
      <p className="text-neutral-600 mb-6">Following a 4px grid system</p>

      <div className="space-y-4">
        {[
          { space: "0.5", px: "2px" },
          { space: "1", px: "4px" },
          { space: "2", px: "8px" },
          { space: "3", px: "12px" },
          { space: "4", px: "16px" },
          { space: "5", px: "20px" },
          { space: "6", px: "24px" },
          { space: "8", px: "32px" },
          { space: "10", px: "40px" },
          { space: "12", px: "48px" },
          { space: "16", px: "64px" },
          { space: "20", px: "80px" },
          { space: "24", px: "96px" },
        ].map(({ space, px }) => (
          <div key={space} className="flex items-center gap-4">
            <div className="w-20 text-sm text-neutral-600">
              {space} ({px})
            </div>
            <div
              className={`h-8 bg-primary-500 rounded`}
              style={{ width: px }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

// Border Radius Story
export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Border Radius</h2>

      <div className="grid grid-cols-3 gap-6">
        {[
          { radius: "sm", label: "Small (2px)" },
          { radius: "DEFAULT", label: "Default (4px)", class: "rounded" },
          { radius: "md", label: "Medium (6px)" },
          { radius: "lg", label: "Large (8px)" },
          { radius: "xl", label: "Extra Large (12px)" },
          { radius: "2xl", label: "2XL (16px)" },
          { radius: "3xl", label: "3XL (24px)" },
          { radius: "full", label: "Full (9999px)" },
        ].map(({ radius, label, class: className }) => (
          <div key={radius} className="text-center">
            <div
              className={`h-24 bg-primary-500 mb-2 ${className || `rounded-${radius}`}`}
            />
            <p className="text-sm font-medium">{label}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Shadows Story
export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Shadows (Elevation)</h2>

      <div className="grid grid-cols-3 gap-6">
        {[
          { shadow: "sm", label: "Small" },
          { shadow: "DEFAULT", label: "Default", class: "shadow" },
          { shadow: "md", label: "Medium" },
          { shadow: "lg", label: "Large" },
          { shadow: "xl", label: "Extra Large" },
          { shadow: "2xl", label: "2XL" },
          { shadow: "inner", label: "Inner" },
        ].map(({ shadow, label, class: className }) => (
          <div key={shadow} className="text-center">
            <div
              className={`h-24 bg-white rounded-lg mb-2 flex items-center justify-center ${
                className || `shadow-${shadow}`
              }`}
            >
              <span className="text-sm text-neutral-600">{label}</span>
            </div>
            <p className="text-sm font-medium">{label} Shadow</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Breakpoints Story
export const Breakpoints: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Responsive Breakpoints</h2>

      <div className="space-y-4">
        {[
          { breakpoint: "sm", width: "640px", label: "Small" },
          { breakpoint: "md", width: "768px", label: "Medium" },
          { breakpoint: "lg", width: "1024px", label: "Large" },
          { breakpoint: "xl", width: "1280px", label: "Extra Large" },
          { breakpoint: "2xl", width: "1536px", label: "2XL" },
        ].map(({ breakpoint, width, label }) => (
          <div
            key={breakpoint}
            className="p-4 border border-neutral-300 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{label}</h3>
              <code className="text-sm bg-neutral-100 px-2 py-1 rounded">
                {breakpoint}:
              </code>
            </div>
            <p className="text-neutral-600">Minimum width: {width}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <p className="text-sm">
          <strong>Usage:</strong> Use these breakpoints with Tailwind's
          responsive modifiers (e.g.,{" "}
          <code className="bg-white px-2 py-0.5 rounded">md:text-lg</code>)
        </p>
      </div>
    </div>
  ),
};

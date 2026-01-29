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
  render: () => {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold mb-4">Color Palette</h2>

        {/* Primary Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Primary (Custom Brand Blue)
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "primary", label: "Primary" },
              { name: "primary-hover", label: "Hover" },
              { name: "primary-active", label: "Active" },
              { name: "primary-disabled", label: "Disabled" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Secondary (Coral/Orange)
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "secondary", label: "Secondary" },
              { name: "secondary-hover", label: "Hover" },
              { name: "secondary-active", label: "Active" },
              { name: "secondary-disabled", label: "Disabled" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tertiary Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Tertiary (Slate/Blue-Gray)
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "tertiary", label: "Tertiary" },
              { name: "tertiary-hover", label: "Hover" },
              { name: "tertiary-active", label: "Active" },
              { name: "tertiary-disabled", label: "Disabled" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Text Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Text Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "text-primary", label: "Primary Text" },
              { name: "text-muted", label: "Muted Text" },
            ].map(({ name, label }) => (
              <div
                key={name}
                className="flex items-center gap-4 p-4 border rounded"
              >
                <div
                  className="h-10 w-10 rounded-full border"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <div>
                  <p
                    className="font-medium"
                    style={{ color: `var(--color-${name})` }}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    var(--color-{name})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Background Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "background", label: "Background" },
              { name: "background-muted", label: "Muted Background" },
            ].map(({ name, label }) => (
              <div
                key={name}
                className="p-4 border rounded"
                style={{ backgroundColor: `var(--color-${name})` }}
              >
                <p className="font-medium">{label}</p>
                <p className="text-xs opacity-70 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Global UI Colors</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "border", label: "Border" },
              { name: "muted", label: "Muted" },
              { name: "muted-foreground", label: "Muted Foreground" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-16 w-full rounded mb-2 border"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Success (Emerald)</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "success", label: "Success" },
              { name: "success-hover", label: "Hover" },
              { name: "success-active", label: "Active" },
              { name: "success-disabled", label: "Disabled" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Error Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Error (Rose)</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "error", label: "Error" },
              { name: "error-hover", label: "Hover" },
              { name: "error-active", label: "Active" },
              { name: "error-disabled", label: "Disabled" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Colors */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Warning (Amber)</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "warning", label: "Warning" },
              { name: "warning-hover", label: "Hover" },
              { name: "warning-active", label: "Active" },
              { name: "warning-disabled", label: "Disabled" },
            ].map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <div
                  className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-gray-500 font-mono">
                  var(--color-{name})
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// Typography Story
export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Typography</h2>

      {/* Font Families */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Font Families</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-1">Sans (Inter)</p>
            <p className="font-sans text-2xl border p-4 rounded bg-background">
              The quick brown fox jumps over the lazy dog
            </p>
            <code className="text-xs text-muted-foreground block mt-1">
              var(--font-sans)
            </code>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-1">Mono (Fira Code)</p>
            <p className="font-mono text-xl border p-4 rounded bg-background">
              The quick brown fox jumps over the lazy dog
            </p>
            <code className="text-xs text-muted-foreground block mt-1">
              var(--font-mono)
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
};

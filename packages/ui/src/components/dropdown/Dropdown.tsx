import * as React from "react";
import * as Menu from "@base-ui/react/Menu";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { dropdownVariants, type DropdownVariants } from "./Dropdown.variants";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends DropdownVariants {
  /**
   * Options to display in the dropdown
   */
  options: DropdownOption[];
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * Current selected value
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes for the trigger
   */
  className?: string;
}

/**
 * Dropdown component for selecting a value from a list of options.
 * Built with @base-ui/react Menu for accessibility.
 *
 * @example
 * ```tsx
 * import { Dropdown } from '@repo/ui/components/dropdown'
 *
 * const options = [
 *   { value: '1', label: 'Option 1' },
 *   { value: '2', label: 'Option 2' },
 * ]
 *
 * <Dropdown
 *   options={options}
 *   placeholder="Select an option"
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      options,
      placeholder = "Select...",
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      variant = "bordered",
      size = "md",
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(
      defaultValue ?? null,
    );

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : selectedValue;

    const handleItemClick = React.useCallback(
      (optionValue: string) => {
        if (value === undefined) {
          setSelectedValue(optionValue);
        }
        onValueChange?.(optionValue);
        setIsOpen(false);
      },
      [value, onValueChange],
    );

    const selectedOption = options.find((opt) => opt.value === currentValue);

    const {
      trigger,
      listbox,
      option,
      optionIndicator,
      valueDisplay,
      icon,
      placeholder: placeholderClass,
    } = dropdownVariants({
      variant,
      size,
      isOpen,
    });

    return (
      <Menu.Root open={isOpen} onOpenChange={setIsOpen}>
        <Menu.Trigger
          ref={ref}
          className={cn(trigger(), className)}
          disabled={disabled}
        >
          <span
            className={cn(
              valueDisplay(),
              !selectedOption && placeholderClass(),
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={icon()} />
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner sideOffset={5}>
            <Menu.Popup className={listbox()}>
              {options.map((opt) => (
                <Menu.Item
                  key={opt.value}
                  disabled={opt.disabled}
                  className={option()}
                  onClick={() => handleItemClick(opt.value)}
                >
                  <span className="flex-1">{opt.label}</span>
                  {currentValue === opt.value && (
                    <span className={optionIndicator()}>
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  },
);

Dropdown.displayName = "Dropdown";

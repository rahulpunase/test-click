import * as React from "react";
import * as Select from "@base-ui/react/Select";
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
  onValueChange?: (value: string | null) => void;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes for the trigger
   */
  className?: string;
  /**
   * Name attribute for forms
   */
  name?: string;
  /**
   * Required attribute for forms
   */
  required?: boolean;
}

/**
 * Dropdown component for selecting a value from a list of options.
 * Built with @base-ui/react Select for accessibility.
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
      name,
      required,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(
      defaultValue ?? null,
    );

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : selectedValue;

    const handleValueChange = React.useCallback(
      (newValue: string | null) => {
        if (value === undefined) {
          setSelectedValue(newValue);
        }
        onValueChange?.(newValue);
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
      <Select.Root
        value={currentValue}
        onValueChange={handleValueChange}
        onOpenChange={setIsOpen}
        disabled={disabled}
        name={name}
        required={required}
      >
        <Select.Trigger ref={ref} className={cn(trigger(), className)}>
          <span
            className={cn(
              valueDisplay(),
              !selectedOption && placeholderClass(),
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={icon()} />
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner sideOffset={5}>
            <Select.Popup className={listbox()}>
              {options.map((opt) => (
                <Select.Option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={option()}
                >
                  <Select.OptionText>{opt.label}</Select.OptionText>
                  <Select.OptionIndicator className={optionIndicator()}>
                    <Check className="h-4 w-4" />
                  </Select.OptionIndicator>
                </Select.Option>
              ))}
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    );
  },
);

Dropdown.displayName = "Dropdown";

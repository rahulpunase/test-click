import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { checkboxVariants, type CheckboxVariants } from "./Checkbox.variants";

export interface CheckboxProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, "className">,
    Omit<CheckboxVariants, "error"> {
  error?: boolean;
  className?: string;
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, error, label, description, id, ...props }, ref) => {
    const styles = checkboxVariants({
      error: !!error,
      disabled: !!props.disabled,
    });
    const generatedId = React.useId();
    const uniqueId = id || generatedId;

    const checkboxContent = (
      <BaseCheckbox.Root
        ref={ref}
        id={uniqueId}
        className={styles.control({ className })}
        {...props}
      >
        <BaseCheckbox.Indicator className={styles.indicator()}>
          <Check className={styles.check()} strokeWidth={3} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    if (label || description) {
      return (
        <label htmlFor={uniqueId} className={styles.wrapper()}>
          {checkboxContent}
          <div className="grid gap-1.5 leading-none">
            {label && <span className={styles.label()}>{label}</span>}
            {description && (
              <p className={styles.description()}>{description}</p>
            )}
          </div>
        </label>
      );
    }

    return checkboxContent;
  },
);
Checkbox.displayName = "Checkbox";

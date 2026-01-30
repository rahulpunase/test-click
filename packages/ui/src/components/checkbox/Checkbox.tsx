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
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, error, label, description, id, ...props }, ref) => {
    const styles = checkboxVariants({ error: !!error });
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
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    if (label || description) {
      return (
        <div className={styles.wrapper()}>
          {checkboxContent}
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label htmlFor={uniqueId} className={styles.label()}>
                {label}
              </label>
            )}
            {description && (
              <p className={styles.description()}>{description}</p>
            )}
          </div>
        </div>
      );
    }

    return checkboxContent;
  },
);
Checkbox.displayName = "Checkbox";

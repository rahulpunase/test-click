import { forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { inputVariants, type InputVariants } from "./Input.variants";

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "key">,
    Omit<InputVariants, "error" | "hasIcon"> {
  /**
   * Error state for the input
   */
  error?: boolean;
  /**
   * Icon component from lucide-react to display on the left
   */
  icon?: LucideIcon;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, variant, icon: Icon, className, ...props }, ref) => {
    const styles = inputVariants({
      variant,
      hasIcon: !!Icon,
    });

    if (Icon) {
      return (
        <div className={styles.controlWrapper()}>
          <Icon className={styles.icon()} />
          <input
            ref={ref}
            className={styles.input({ className })}
            aria-invalid={error}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={styles.input({ className })}
        aria-invalid={error}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

import { forwardRef } from "react";
import { textareaVariants, type TextAreaVariants } from "./TextArea.variants";

export interface TextAreaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "key">,
    Omit<TextAreaVariants, "error"> {
  /**
   * Error state for the textarea
   */
  error?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, variant, className, ...props }, ref) => {
    const styles = textareaVariants({
      variant,
    });

    return (
      <textarea
        ref={ref}
        className={styles.input({ className })}
        aria-invalid={error}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

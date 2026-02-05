import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { switchVariants, type SwitchVariants } from "./Switch.variants";

export interface SwitchProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
      "className" | "onChange"
    >,
    Omit<SwitchVariants, "disabled"> {
  label?: React.ReactNode;
  description?: string;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { className, size, label, description, id, onCheckedChange, ...props },
    ref,
  ) => {
    const styles = switchVariants({
      size,
      disabled: !!props.disabled,
    });

    const generatedId = React.useId();
    const uniqueId = id || generatedId;

    const switchContent = (
      <BaseSwitch.Root
        ref={ref}
        id={uniqueId}
        className={styles.control({ className })}
        onCheckedChange={onCheckedChange}
        {...props}
      >
        <BaseSwitch.Thumb className={styles.thumb()} />
      </BaseSwitch.Root>
    );

    if (label || description) {
      return (
        <div className={styles.wrapper()}>
          {switchContent}
          <label htmlFor={uniqueId} className={styles.root()}>
            {label && <span className={styles.label()}>{label}</span>}
            {description && (
              <p className={styles.description()}>{description}</p>
            )}
          </label>
        </div>
      );
    }

    return switchContent;
  },
);

Switch.displayName = "Switch";

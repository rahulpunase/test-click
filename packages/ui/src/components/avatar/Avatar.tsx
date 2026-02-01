import { forwardRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
  type AvatarVariants,
} from "./Avatar.variants";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>, AvatarVariants {
  /**
   * The source URL of the image.
   */
  src?: string;
  /**
   * Accessible alternative text for the image.
   */
  alt?: string;
  /**
   * The fallback text to display when the image fails to load or provided src is empty.
   */
  fallback: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size, className, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || fallback}
            className={avatarImageVariants()}
            onError={() => setHasError(true)}
          />
        ) : (
          <span className={cn(avatarFallbackVariants({ size }))}>
            {fallback}
          </span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

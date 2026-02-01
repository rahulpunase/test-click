import { tv } from "tailwind-variants";
import styles from "./Skeleton.module.css";

export const skeletonVariants = tv({
  base: styles.skeleton,
  variants: {
    circle: {
      true: "rounded-full",
    },
  },
});

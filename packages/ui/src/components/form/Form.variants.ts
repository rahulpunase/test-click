import { tv, type VariantProps } from "tailwind-variants";

export const formVariants = tv({
  base: "w-full space-y-4",
});

export const formItemVariants = tv({
  base: "flex flex-col gap-1",
});

export const formLabelVariants = tv({
  base: "text-sm mb-1 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  variants: {
    error: {
      true: "text-error",
    },
  },
});

export const formMessageVariants = tv({
  base: "text-[0.8rem] font-normal text-error",
});

export type FormVariants = VariantProps<typeof formVariants>;

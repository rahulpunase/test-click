import { tv, type VariantProps } from "tailwind-variants";

export const alertDialogVariants = tv({
  slots: {
    // Base UI uses data-state instead of data-closed/open often, or different attributes.
    // Checking Base UI docs: usually data-[state=open] and data-[state=closed].
    // Headless UI used data-[closed].
    // Updated selectors to support both or standard Base UI data attributes.
    // Base UI Dialog.Popup has data-state="open" or "closed".
    overlay:
      "fixed inset-0 z-50 bg-background/80 transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
    content:
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-2 bg-background p-4 shadow-lg transition-all duration-200 data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 sm:rounded-lg",
    header: "flex flex-col space-y-2 text-center sm:text-left",
    title:
      "text-base font-semibold leading-none pb-2 tracking-tight text-text-primary",
    description: "text-sm text-text-muted",
    actions: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  },
});

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;

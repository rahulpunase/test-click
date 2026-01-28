import { tv, type VariantProps } from "tailwind-variants";

export const alertDialogVariants = tv({
  slots: {
    // Base UI uses data-state instead of data-closed/open often, or different attributes.
    // Checking Base UI docs: usually data-[state=open] and data-[state=closed].
    // Headless UI used data-[closed].
    // Updated selectors to support both or standard Base UI data attributes.
    // Base UI Dialog.Popup has data-state="open" or "closed".
    overlay:
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
    content:
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 bg-white p-6 shadow-lg transition-all duration-200 data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 sm:rounded-lg",
    header: "flex flex-col space-y-2 text-center sm:text-left",
    title: "text-lg font-semibold leading-none tracking-tight text-neutral-900",
    description: "text-sm text-neutral-500",
    actions: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  },
});

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;

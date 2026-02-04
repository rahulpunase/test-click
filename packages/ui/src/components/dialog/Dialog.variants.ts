import { tv } from "tailwind-variants";

export const dialogVariants = tv({
  slots: {
    overlay:
      "fixed inset-0 z-50 bg-background/80 transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
    content:
      "fixed left-[50%] top-[50%] z-50 flex flex-col translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-2 bg-background p-4 shadow-lg transition-all duration-200 data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 sm:rounded-lg max-h-[90vh] overflow-y-auto",
    header: "flex flex-col space-y-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title:
      "text-base font-medium leading-none tracking-tight text-text-primary",
    description: "text-sm text-text-muted font-normal",
    close:
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
  },
  variants: {
    orientation: {
      vertical: {},
      horizontal: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  compoundVariants: [
    // Vertical - Height focused
    {
      orientation: "vertical",
      size: "sm",
      class: {
        content: "w-full max-w-[320px] h-[500px]",
      },
    },
    {
      orientation: "vertical",
      size: "md",
      class: {
        content: "w-full max-w-[400px] h-[700px]",
      },
    },
    {
      orientation: "vertical",
      size: "lg",
      class: {
        content: "w-full max-w-[500px] h-[85vh]",
      },
    },
    // Horizontal - Width focused
    {
      orientation: "horizontal",
      size: "sm",
      class: {
        content: "w-full max-w-lg h-auto min-h-[200px]",
      },
    },
    {
      orientation: "horizontal",
      size: "md",
      class: {
        content: "w-full max-w-3xl h-auto min-h-[300px]",
      },
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: {
        content: "w-full max-w-[90vw] h-auto min-h-[400px]",
      },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

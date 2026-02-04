import { useState, useCallback } from "react";

export function useDialogStore(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const onOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  return {
    open,
    onOpenChange,
    setOpen,
    props: {
      open,
      onOpenChange,
    },
  };
}

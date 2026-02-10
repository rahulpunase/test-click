"use client";

import * as React from "react";
import { Toast } from "@base-ui/react/toast";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
  Bell,
} from "lucide-react";
import { toasterVariants } from "./Toaster.variants";

// Types
export type ToastType = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastData {
  type?: ToastType;
}

// Create global toast manager
const toastManager = Toast.createToastManager();

// Export global toast function for use outside React components
export const toast = {
  show: (options: {
    title: string;
    description?: string;
    type?: ToastType;
    timeout?: number;
    actionProps?: React.ComponentPropsWithRef<"button">;
  }) => {
    return toastManager.add({
      title: options.title,
      description: options.description,
      timeout: options.timeout ?? 5000,
      actionProps: options.actionProps,
      data: { type: options.type ?? "default" },
    });
  },
  success: (title: string, description?: string) => {
    return toastManager.add({
      title,
      description,
      timeout: 5000,
      data: { type: "success" },
    });
  },
  error: (title: string, description?: string) => {
    return toastManager.add({
      title,
      description,
      timeout: 5000,
      data: { type: "error" },
    });
  },
  warning: (title: string, description?: string) => {
    return toastManager.add({
      title,
      description,
      timeout: 5000,
      data: { type: "warning" },
    });
  },
  info: (title: string, description?: string) => {
    return toastManager.add({
      title,
      description,
      timeout: 5000,
      data: { type: "info" },
    });
  },
  close: (toastId: string) => toastManager.close(toastId),
  promise: toastManager.promise.bind(toastManager),
};

// Hook to use toast within React components
export function useToast() {
  const manager = Toast.useToastManager();

  return {
    ...manager,
    show: (options: {
      title: string;
      description?: string;
      type?: ToastType;
      timeout?: number;
      actionProps?: React.ComponentPropsWithRef<"button">;
    }) => {
      return manager.add({
        title: options.title,
        description: options.description,
        timeout: options.timeout ?? 5000,
        actionProps: options.actionProps,
        data: { type: options.type ?? "default" },
      });
    },
    success: (title: string, description?: string) => {
      return manager.add({
        title,
        description,
        timeout: 5000,
        data: { type: "success" },
      });
    },
    error: (title: string, description?: string) => {
      return manager.add({
        title,
        description,
        timeout: 5000,
        data: { type: "error" },
      });
    },
    warning: (title: string, description?: string) => {
      return manager.add({
        title,
        description,
        timeout: 5000,
        data: { type: "warning" },
      });
    },
    info: (title: string, description?: string) => {
      return manager.add({
        title,
        description,
        timeout: 5000,
        data: { type: "info" },
      });
    },
  };
}

// Icon mapping for toast types
const ToastIcon = ({ type }: { type: ToastType }) => {
  const icons: Record<ToastType, React.ReactNode> = {
    default: <Bell />,
    success: <CheckCircle />,
    error: <XCircle />,
    warning: <AlertTriangle />,
    info: <Info />,
  };
  return <>{icons[type]}</>;
};

// Props
export interface ToasterProps {
  position?: ToastPosition;
  children?: React.ReactNode;
}

// Main Toaster component
export function Toaster({ position = "bottom-right", children }: ToasterProps) {
  const variants = toasterVariants({ position });

  return (
    <Toast.Provider toastManager={toastManager}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className={variants.viewport()}>
          <ToastList position={position} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

// Internal toast list component
function ToastList({ position }: { position: ToastPosition }) {
  const { toasts } = Toast.useToastManager();

  return (
    <>
      {toasts.map((toastItem) => (
        <ToastItem key={toastItem.id} toast={toastItem} position={position} />
      ))}
    </>
  );
}

// Internal toast item component
function ToastItem({
  toast: toastItem,
  position,
}: {
  toast: Toast.Root.ToastObject;
  position: ToastPosition;
}) {
  const type = (toastItem.data as ToastData)?.type ?? "default";
  const variants = toasterVariants({ type, position });

  return (
    <Toast.Root toast={toastItem} className={variants.toast()}>
      <div className={variants.icon()}>
        <ToastIcon type={type} />
      </div>
      <Toast.Content className={variants.content()}>
        <Toast.Title className={variants.title()} />
        <Toast.Description className={variants.description()} />
        {toastItem.actionProps && (
          <Toast.Action className={variants.action()} />
        )}
      </Toast.Content>
      <Toast.Close className={variants.close()} aria-label="Close">
        <X className="w-4 h-4" />
      </Toast.Close>
    </Toast.Root>
  );
}

// Attach displayName
Toaster.displayName = "Toaster";

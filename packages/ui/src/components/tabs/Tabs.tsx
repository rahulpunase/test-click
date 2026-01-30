import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { TabsTabProps } from "@base-ui/react/tabs";
import { tabsVariants } from "./Tabs.variants";
import { cn } from "../../lib/utils";

const {
  root,
  list,
  trigger,
  content,
  triggerBody,
  triggerIcon,
  triggerLabel,
  triggerSubLabel,
} = tabsVariants();

// Tabs Root
export interface TabsProps extends React.ComponentProps<typeof BaseTabs.Root> {
  className?: string;
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTabs.Root ref={ref} className={cn(root(), className)} {...props} />
    );
  },
);

TabsRoot.displayName = "Tabs";

// Tabs List
export interface TabsListProps extends React.ComponentProps<
  typeof BaseTabs.List
> {
  className?: string;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTabs.List ref={ref} className={cn(list(), className)} {...props} />
    );
  },
);

TabsList.displayName = "Tabs.List";

// Tabs Trigger
export interface TabsTriggerProps extends TabsTabProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, render, children, icon, label, subLabel, ...props }, ref) => {
    const classes = render ? className : cn(trigger(), className);

    // If render prop is present, let it handle everything
    if (render) {
      return (
        <BaseTabs.Tab
          ref={ref}
          render={render}
          className={classes}
          {...props}
        />
      );
    }

    return (
      <BaseTabs.Tab ref={ref} className={classes} {...props}>
        {icon && <span className={triggerIcon()}>{icon}</span>}
        <div className={triggerBody()}>
          {label && <span className={triggerLabel()}>{label}</span>}
          {subLabel && <span className={triggerSubLabel()}>{subLabel}</span>}
          {!label && !subLabel && children}
        </div>
      </BaseTabs.Tab>
    );
  },
);

TabsTrigger.displayName = "Tabs.Trigger";

// Tabs Content
export interface TabsContentProps extends React.ComponentProps<
  typeof BaseTabs.Panel
> {
  className?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTabs.Panel
        ref={ref}
        className={cn(content(), className)}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "Tabs.Content";

// Attach subcomponents
const TabsWithSubcomponents = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { TabsWithSubcomponents as Tabs };

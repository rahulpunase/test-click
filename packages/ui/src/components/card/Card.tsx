import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cardVariants } from "./Card.variants";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Tabs } from "../tabs";

// Context for Card state management
interface CardContextValue {
  isCollapsed: boolean;
  isSelected: boolean;
  collapsible: boolean;
  selectable: boolean;
  onToggleCollapse: () => void;
  onToggleSelected: () => void;
}

const CardContext = React.createContext<CardContextValue | undefined>(
  undefined,
);

const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error("Card subcomponents must be used within a Card component");
  }
  return context;
};

// Card Root Component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable card selection on click */
  selectable?: boolean;
  /** Enable collapse/expand functionality */
  collapsible?: boolean;
  /** Default collapsed state (uncontrolled) */
  defaultCollapsed?: boolean;
  /** Default selected state (uncontrolled) */
  defaultSelected?: boolean;
  /** Callback when selected state changes */
  onSelectedChange?: (selected: boolean) => void;
  /** Children components */
  children: React.ReactNode;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      selectable = false,
      collapsible = false,
      defaultCollapsed = false,
      defaultSelected = false,
      onSelectedChange,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [isSelected, setIsSelected] = React.useState(defaultSelected);

    const handleToggleCollapse = React.useCallback(() => {
      setIsCollapsed((prev) => !prev);
    }, []);

    const handleToggleSelected = React.useCallback(() => {
      setIsSelected((prev) => {
        const newValue = !prev;
        onSelectedChange?.(newValue);
        return newValue;
      });
    }, [onSelectedChange]);

    const handleCardClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (selectable) {
          handleToggleSelected();
        }
        onClick?.(e);
      },
      [selectable, handleToggleSelected, onClick],
    );

    const contextValue = React.useMemo(
      () => ({
        isCollapsed,
        isSelected,
        collapsible,
        selectable,
        onToggleCollapse: handleToggleCollapse,
        onToggleSelected: handleToggleSelected,
      }),
      [
        isCollapsed,
        isSelected,
        collapsible,
        selectable,
        handleToggleCollapse,
        handleToggleSelected,
      ],
    );

    // Get the variant classes based on current state
    const { card } = cardVariants({
      selectable,
      selected: isSelected,
    });

    return (
      <CardContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(card(), className)}
          onClick={handleCardClick}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = "Card";

// Card Header Component
export interface CardHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Title to display in header */
  title?: React.ReactNode;
  /** Icon to display before the title */
  icon?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, icon, className, children, ...props }, ref) => {
    const { collapsible, isCollapsed, onToggleCollapse } = useCardContext();

    // Get the variant classes based on current collapsed state
    const {
      header,
      headerTop,
      headerBottom,
      title: titleClass,
      collapseIcon,
    } = cardVariants({
      collapsed: isCollapsed,
      hasTabList: !!children,
    });

    const collapseButton = (
      <Button
        variant="ghost"
        color="tertiary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onToggleCollapse();
        }}
        className="ml-2"
        aria-label={isCollapsed ? "Expand" : "Collapse"}
      >
        <ChevronDown className={collapseIcon()} />
      </Button>
    );

    return (
      <div ref={ref} className={cn(header(), className)} {...props}>
        <div className={headerTop()}>
          <div className="flex items-center gap-2 flex-1">
            {icon && <span className="shrink-0">{icon}</span>}
            {title && <div className={titleClass()}>{title}</div>}
          </div>
          {collapsible && collapseButton}
        </div>
        {children && <div className={headerBottom()}>{children}</div>}
      </div>
    );
  },
);

CardHeader.displayName = "Card.Header";

// Card Content Component
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed } = useCardContext();

    // Get the variant classes based on current collapsed state
    const { content } = cardVariants({ collapsed: isCollapsed });

    return (
      <div ref={ref} className={cn(content(), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "Card.Content";

// Card Footer Component
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    const { footer } = cardVariants();

    return (
      <div ref={ref} className={cn(footer(), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "Card.Footer";

// Card Tabs - Wrapper around Tabs component to provide tab context
export type CardTabsProps = React.ComponentProps<typeof Tabs>;

const CardTabsRoot = React.forwardRef<HTMLDivElement, CardTabsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Tabs ref={ref} className={className} {...props}>
        {children}
      </Tabs>
    );
  },
);

CardTabsRoot.displayName = "Card.Tabs";

// Card Tabs List - Styled for card header usage
export type CardTabsListProps = React.ComponentProps<typeof Tabs.List>;

const CardTabsList = React.forwardRef<HTMLDivElement, CardTabsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Tabs.List ref={ref} className={className} {...props}>
        {children}
      </Tabs.List>
    );
  },
);

CardTabsList.displayName = "Card.Tabs.List";

// Card Tabs Trigger - Pass through to Tabs.Trigger
export type CardTabsTriggerProps = React.ComponentProps<typeof Tabs.Trigger>;

const CardTabsTrigger = React.forwardRef<
  HTMLButtonElement,
  CardTabsTriggerProps
>(({ ...props }, ref) => {
  return <Tabs.Trigger ref={ref} {...props} />;
});

CardTabsTrigger.displayName = "Card.Tabs.Trigger";

// Card Tabs Content - Pass through to Tabs.Content
export type CardTabsContentProps = React.ComponentProps<typeof Tabs.Content>;

const CardTabsContent = React.forwardRef<HTMLDivElement, CardTabsContentProps>(
  ({ className, ...props }, ref) => {
    return <Tabs.Content ref={ref} className={className} {...props} />;
  },
);

CardTabsContent.displayName = "Card.Tabs.Content";

// Attach Tabs subcomponents
const CardTabsWithSubcomponents = Object.assign(CardTabsRoot, {
  List: CardTabsList,
  Trigger: CardTabsTrigger,
  Content: CardTabsContent,
});

// Attach subcomponents with dot notation
const CardWithSubcomponents = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Tabs: CardTabsWithSubcomponents,
});

export { CardWithSubcomponents as Card };

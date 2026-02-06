import { Popover, Button, Input, Separator } from "@repo/ui";
import { icons } from "lucide-react";
import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";

interface IconSelectorProps {
  defaultIcon?: string;
  value: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

export const IconSelector = ({
  value,
  onChange,
  children,
}: IconSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    const searchLower = search.toLowerCase();
    return Object.keys(icons).filter((iconName) =>
      iconName.toLowerCase().includes(searchLower),
    );
  }, [search]);

  const SelectedIcon = (icons as any)[value] || (icons as any)["HelpCircle"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outlined" className="w-full justify-between">
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        )}
      </Popover.Trigger>
      <Popover.Content className="w-[300px] p-0" align="start">
        <div className="flex items-center px-3 pb-2 pt-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            variant="normal"
            placeholder="Search icons..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </div>
        <Separator />
        <div className="grid grid-cols-6 gap-1 p-2 max-h-[300px] overflow-y-auto">
          {filteredIcons.map((iconName) => {
            const Icon = (icons as any)[iconName];
            return (
              <div
                role="button"
                key={iconName}
                onClick={() => {
                  onChange(iconName);
                  setOpen(false);
                }}
                className={`flex items-center justify-center p-2 rounded-md hover:bg-background-muted cursor-pointer transition-colors ${
                  value === iconName ? "bg-muted" : ""
                }`}
                title={iconName}
              >
                <Icon className="h-5 w-5" />
              </div>
            );
          })}
          {filteredIcons.length === 0 && (
            <div className="col-span-5 py-4 text-center text-sm text-muted-foreground">
              No icons found.
            </div>
          )}
        </div>
        <Popover.Arrow />
      </Popover.Content>
    </Popover>
  );
};

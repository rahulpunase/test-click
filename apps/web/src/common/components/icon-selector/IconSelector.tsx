import { Popover, Button, Input } from "@repo/ui";
import { icons } from "lucide-react";
import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  trigger?: React.ReactNode;
}

export const IconSelector = ({ value, onChange }: IconSelectorProps) => {
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
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button variant="outlined" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <SelectedIcon className="h-4 w-4" />
              {value}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-[300px] p-0" align="start">
          <div className="flex items-center border-b px-3 pb-2 pt-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search icons..."
              className="flex h-7 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none shadow-none focus-visible:ring-0 px-0"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-5 gap-2 p-2 max-h-[300px] overflow-y-auto">
            {filteredIcons.map((iconName) => {
              const Icon = (icons as any)[iconName];
              return (
                <div
                  key={iconName}
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-center p-2 rounded-md hover:bg-muted cursor-pointer transition-colors ${
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
    </div>
  );
};

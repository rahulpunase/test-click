import { Dialog, Tabs } from "@repo/ui";
import { Settings, Home, Layout } from "lucide-react";

import { useSidebarStore } from "../hooks/useSidebarStore";
import { NavigationTabSection } from "./NavigationTabSection";

export function NavConfigDialog() {
  const { isNavConfigDialogOpen, setNavConfigDialogOpen } = useSidebarStore();

  return (
    <Dialog open={isNavConfigDialogOpen} onOpenChange={setNavConfigDialogOpen}>
      <Dialog.Content size="md" orientation="vertical">
        <Dialog.Header>
          <Dialog.Title>Configure Sidebar</Dialog.Title>
          <Dialog.Description>
            Customize your navigation, home screen, and sections.
          </Dialog.Description>
        </Dialog.Header>
        <Tabs defaultValue="navigation">
          <Tabs.List>
            <Tabs.Trigger
              value="navigation"
              icon={<Settings className="w-4 h-4" />}
              label="Navigation"
            />
            <Tabs.Trigger
              value="home"
              icon={<Home className="w-4 h-4" />}
              label="Home"
            />
            <Tabs.Trigger
              value="sections"
              icon={<Layout className="w-4 h-4" />}
              label="Sections"
            />
          </Tabs.List>

          <Tabs.Content value="navigation">
            <NavigationTabSection />
          </Tabs.Content>

          <Tabs.Content value="home">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Home Settings
              </h3>
              <p className="text-text-muted text-sm">
                Customize your home dashboard view.
              </p>
              {/* Placeholder content */}
              <div className="h-32 border border-dashed border-border-2 rounded-md flex items-center justify-center text-text-muted">
                Home configuration content will go here.
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="sections">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Section Settings
              </h3>
              <p className="text-text-muted text-sm">
                Manage your sidebar sections and grouping.
              </p>
              {/* Placeholder content */}
              <div className="h-32 border border-dashed border-border-2 rounded-md flex items-center justify-center text-text-muted">
                Sections configuration content will go here.
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </Dialog.Content>
    </Dialog>
  );
}

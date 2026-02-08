import { Dialog, Tabs } from "@repo/ui";
import { Settings, Home, Layout } from "lucide-react";

import { useSidebarStore } from "../hooks/useSidebarStore";
import { NavigationTabSection } from "./NavigationTabSection";
import { HomeTabSection } from "./HomeTabSection";
import { SectionsTabSection } from "./SectionsTabSection";

export function NavConfigDialog() {
  const { isNavConfigDialogOpen, setNavConfigDialogOpen, defaultTab } =
    useSidebarStore();

  return (
    <Dialog open={isNavConfigDialogOpen} onOpenChange={setNavConfigDialogOpen}>
      <Dialog.Content size="md" orientation="vertical">
        <Dialog.Header>
          <Dialog.Title>Configure Sidebar</Dialog.Title>
          <Dialog.Description>
            Customize your navigation, home screen, and sections.
          </Dialog.Description>
        </Dialog.Header>
        <Tabs defaultValue={defaultTab}>
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
            <HomeTabSection />
          </Tabs.Content>

          <Tabs.Content value="sections">
            <SectionsTabSection />
          </Tabs.Content>
        </Tabs>
      </Dialog.Content>
    </Dialog>
  );
}

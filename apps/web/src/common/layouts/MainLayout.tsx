import { BaseShell } from "./BaseShell";
import { AppSidebar } from "../components/sidebar/AppSidebar";
import { NavConfigDialog } from "../components/sidebar/nav-config-dialog/NavConfigDialog";
import { CreateSpaceDialog } from "../components/spaces/CreateSpaceDialog";
import { CreateProjectDialog } from "../components/projects/CreateProjectDialog";
import { CreateFolderDialog } from "../components/folders/CreateFolderDialog";

export const MainLayout = () => {
  return (
    <>
      <BaseShell sidebar={<AppSidebar />} />
      {/* Dialogs */}
      <NavConfigDialog />
      <CreateSpaceDialog />
      <CreateProjectDialog />
      <CreateFolderDialog />
    </>
  );
};

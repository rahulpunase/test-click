import { BaseShell } from "./BaseShell";
import { SettingsSidebar } from "@/common/components/sidebar/SettingsSidebar";

export const SettingsLayout = () => {
  return <BaseShell sidebar={<SettingsSidebar />} />;
};

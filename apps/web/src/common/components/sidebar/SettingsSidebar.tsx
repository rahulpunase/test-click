import { List } from "@repo/ui";
import {
  ArrowLeft,
  User,
  Building2,
  Users,
  Bell,
  Palette,
  Shield,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

export const SettingsSidebar = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const handleBackClick = () => {
    navigate(`/${workspaceId}`);
  };

  return (
    <div className="flex flex-col border-r border-border-2 bg-background w-full h-full">
      <div className="px-2 py-2">
        <List.Item label="Back" onClick={handleBackClick}>
          <List.Item.Icon icon={ArrowLeft} size="sm" />
        </List.Item>
      </div>

      <div className="flex-1 px-2 overflow-y-auto">
        <List.Group label="Account">
          <List.Item
            label="Profile"
            onClick={() => navigate(`/${workspaceId}/settings/profile`)}
          >
            <List.Item.Icon icon={User} size="sm" />
          </List.Item>
          <List.Item label="Notifications">
            <List.Item.Icon icon={Bell} size="sm" />
          </List.Item>
        </List.Group>

        <List.Group label="Workspace">
          <List.Item label="General">
            <List.Item.Icon icon={Building2} size="sm" />
          </List.Item>
          <List.Item
            label="People"
            onClick={() => navigate(`/${workspaceId}/settings/people`)}
          >
            <List.Item.Icon icon={Users} size="sm" />
          </List.Item>
          <List.Item label="Appearance">
            <List.Item.Icon icon={Palette} size="sm" />
          </List.Item>
          <List.Item label="Security">
            <List.Item.Icon icon={Shield} size="sm" />
          </List.Item>
        </List.Group>
      </div>
    </div>
  );
};

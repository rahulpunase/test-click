"use client";

import {
  Inbox,
  MessageSquareReply,
  CheckSquare,
  ListTodo,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { List } from "@repo/ui";
import { useState } from "react";
import { cn } from "@repo/ui/utils";
import { Link } from "react-router";

export const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r border-border-2 bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 h-14 border-b border-border-1">
        {!isCollapsed && (
          <span className="font-semibold text-text-primary truncate">App</span>
        )}
        <button
          onClick={toggleCollapse}
          className={cn(
            "text-text-muted hover:text-text-primary transition-colors",
            isCollapsed && "mx-auto",
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <div className="flex-1 py-2 overflow-y-auto">
        <List>
          <Link to="/inbox">
            <List.Item
              icon={<Inbox size={20} />}
              title={isCollapsed ? null : "Inbox"}
              onClick={() => {}}
            />
          </Link>
          <List.Item
            icon={<MessageSquareReply size={20} />}
            title={isCollapsed ? null : "Replies"}
            onClick={() => {}}
          />
          <List.Item
            icon={<CheckSquare size={20} />}
            title={isCollapsed ? null : "My tasks"}
            onClick={() => {}}
          />
          <List.Item
            icon={<ListTodo size={20} />}
            title={isCollapsed ? null : "All tasks"}
            onClick={() => {}}
          />
          <List.Item
            icon={<MoreHorizontal size={20} />}
            title={isCollapsed ? null : "More"}
            onClick={() => {}}
          />
        </List>
      </div>
    </div>
  );
};

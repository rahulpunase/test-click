type Navigation = {
  id: string;
  title: string;
  icon: string;
  isPinned: boolean;
  description?: string;
};

type Home = {
  id: string;
  title: string;
  icon: string;
  isPinned: boolean;
  description?: string;
};

export const Navigations: Navigation[] = [
  {
    id: "home",
    title: "Home",
    icon: "home",
    isPinned: true,
    description: "Home is where you'll find everything",
  },
  {
    id: "spaces",
    title: "Spaces",
    isPinned: true,
    icon: "spaces",
  },
  {
    id: "chat",
    title: "Chat",
    isPinned: true,
    icon: "chat",
  },
  {
    id: "planner",
    title: "Planner",
    isPinned: true,
    icon: "planner",
  },
  {
    id: "ai",
    title: "AI",
    isPinned: true,
    icon: "ai",
  },
  // teams
  {
    id: "teams",
    title: "Teams",
    isPinned: true,
    icon: "teams",
  },
  //docs
  {
    id: "docs",
    title: "Docs",
    isPinned: true,
    icon: "docs",
  },
  // dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    isPinned: true,
    icon: "dashboard",
  },
  // whiteboard
  {
    id: "whiteboard",
    title: "Whiteboard",
    isPinned: true,
    icon: "whiteboard",
  },
  // forms
  {
    id: "forms",
    title: "Forms",
    isPinned: true,
    icon: "forms",
  },
  // goals
  {
    id: "goals",
    title: "Goals",
    isPinned: true,
    icon: "goals",
  },
  // time sheets
  {
    id: "time-sheets",
    title: "Time Sheets",
    isPinned: true,
    icon: "time-sheets",
  },
];

export const Home: Home[] = [
  {
    id: "inbox",
    title: "Inbox",
    icon: "inbox",
    isPinned: true,
  },
  // replies
  {
    id: "replies",
    title: "Replies",
    icon: "replies",
    isPinned: true,
  },
  // assigned comments
  {
    id: "assigned-comments",
    title: "Assigned Comments",
    icon: "assigned-comments",
    isPinned: true,
  },
  // my tasks
  {
    id: "my-tasks",
    title: "My Tasks",
    icon: "my-tasks",
    isPinned: true,
  },
  // chat activity
  {
    id: "chat-activity",
    title: "Chat Activity",
    icon: "chat-activity",
    isPinned: true,
  },
  // drafts
  {
    id: "drafts",
    title: "Drafts",
    icon: "drafts",
    isPinned: true,
  },
  // posts
  {
    id: "posts",
    title: "Posts",
    icon: "posts",
    isPinned: true,
  },
  // all channels
  {
    id: "all-channels",
    title: "All Channels",
    icon: "all-channels",
    isPinned: true,
  },
  // all spaces
  {
    id: "all-spaces",
    title: "All Spaces",
    icon: "all-spaces",
    isPinned: true,
  },
  // all tasks
  {
    id: "all-tasks",
    title: "All Tasks",
    icon: "all-tasks",
    isPinned: true,
  },
];

const DefaultItemsInMemberSidebar = Home.filter((item) =>
  [
    "home",
    "spaces",
    "chat",
    "planner",
    "ai",
    "teams",
    "docs",
    "dashboard",
    "whiteboard",
    "forms",
    "goals",
    "time-sheets",
  ].includes(item.id),
);

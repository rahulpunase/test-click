import { MutationCtx, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { Home, Navigations } from "../data/navigations";

export const getSidebar = async (
  ctx: QueryCtx | MutationCtx,
  memberId: Id<"members">,
) => {
  return await ctx.db
    .query("sidebar")
    .withIndex("by_memberId", (q) => q.eq("memberId", memberId))
    .unique();
};

type SidebarConfiguration = {
  navigation: typeof Navigations;
  home: typeof Home;
  sections: {
    id: string;
    title: string;
    icon: string;
    isSelected?: boolean;
    description?: string;
    isUserCreated?: boolean;
  }[];
};

export const createSidebar = async (
  ctx: MutationCtx,
  memberId: Id<"members">,
  overrides?: Partial<SidebarConfiguration>,
) => {
  const defaultConfiguration = {
    navigation: Navigations,
    home: Home,
    sections: [],
  };

  const configuration = {
    ...defaultConfiguration,
    ...overrides,
  };

  return await ctx.db.insert("sidebar", {
    memberId,
    configuration,
  });
};

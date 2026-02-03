import type {
  useGetConstants,
  useGetUserSidebarConfiguration,
} from "@repo/backend/sidebar/queries";

export type Navitems = NonNullable<ReturnType<typeof useGetConstants>["data"]>;

export type UserSidebarConfiguration = NonNullable<
  ReturnType<typeof useGetUserSidebarConfiguration>["data"]
>;

export type UserSelectedNavItems = UserSidebarConfiguration["navigation"];

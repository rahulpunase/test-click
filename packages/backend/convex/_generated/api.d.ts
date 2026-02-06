/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as data_navigations from "../data/navigations.js";
import type * as errors_constants from "../errors/constants.js";
import type * as errors_service from "../errors/service.js";
import type * as errors_util from "../errors/util.js";
import type * as folders_table from "../folders/table.js";
import type * as http from "../http.js";
import type * as members_mutations from "../members/mutations.js";
import type * as members_queries from "../members/queries.js";
import type * as members_service from "../members/service.js";
import type * as members_table from "../members/table.js";
import type * as presence from "../presence.js";
import type * as projects_mutations from "../projects/mutations.js";
import type * as projects_queries from "../projects/queries.js";
import type * as projects_table from "../projects/table.js";
import type * as sample_mutations from "../sample/mutations.js";
import type * as sample_queries from "../sample/queries.js";
import type * as sample_service from "../sample/service.js";
import type * as sample_table from "../sample/table.js";
import type * as sidebar_mutation from "../sidebar/mutation.js";
import type * as sidebar_queries from "../sidebar/queries.js";
import type * as sidebar_service from "../sidebar/service.js";
import type * as sidebar_table from "../sidebar/table.js";
import type * as spaces_mutations from "../spaces/mutations.js";
import type * as spaces_queries from "../spaces/queries.js";
import type * as spaces_table from "../spaces/table.js";
import type * as user_queries from "../user/queries.js";
import type * as user_service from "../user/service.js";
import type * as workspaces_mutations from "../workspaces/mutations.js";
import type * as workspaces_queries from "../workspaces/queries.js";
import type * as workspaces_service from "../workspaces/service.js";
import type * as workspaces_table from "../workspaces/table.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "data/navigations": typeof data_navigations;
  "errors/constants": typeof errors_constants;
  "errors/service": typeof errors_service;
  "errors/util": typeof errors_util;
  "folders/table": typeof folders_table;
  http: typeof http;
  "members/mutations": typeof members_mutations;
  "members/queries": typeof members_queries;
  "members/service": typeof members_service;
  "members/table": typeof members_table;
  presence: typeof presence;
  "projects/mutations": typeof projects_mutations;
  "projects/queries": typeof projects_queries;
  "projects/table": typeof projects_table;
  "sample/mutations": typeof sample_mutations;
  "sample/queries": typeof sample_queries;
  "sample/service": typeof sample_service;
  "sample/table": typeof sample_table;
  "sidebar/mutation": typeof sidebar_mutation;
  "sidebar/queries": typeof sidebar_queries;
  "sidebar/service": typeof sidebar_service;
  "sidebar/table": typeof sidebar_table;
  "spaces/mutations": typeof spaces_mutations;
  "spaces/queries": typeof spaces_queries;
  "spaces/table": typeof spaces_table;
  "user/queries": typeof user_queries;
  "user/service": typeof user_service;
  "workspaces/mutations": typeof workspaces_mutations;
  "workspaces/queries": typeof workspaces_queries;
  "workspaces/service": typeof workspaces_service;
  "workspaces/table": typeof workspaces_table;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  presence: {
    public: {
      disconnect: FunctionReference<
        "mutation",
        "internal",
        { sessionToken: string },
        null
      >;
      heartbeat: FunctionReference<
        "mutation",
        "internal",
        {
          interval?: number;
          roomId: string;
          sessionId: string;
          userId: string;
        },
        { roomToken: string; sessionToken: string }
      >;
      list: FunctionReference<
        "query",
        "internal",
        { limit?: number; roomToken: string },
        Array<{
          data?: any;
          lastDisconnected: number;
          online: boolean;
          userId: string;
        }>
      >;
      listRoom: FunctionReference<
        "query",
        "internal",
        { limit?: number; onlineOnly?: boolean; roomId: string },
        Array<{ lastDisconnected: number; online: boolean; userId: string }>
      >;
      listUser: FunctionReference<
        "query",
        "internal",
        { limit?: number; onlineOnly?: boolean; userId: string },
        Array<{ lastDisconnected: number; online: boolean; roomId: string }>
      >;
      removeRoom: FunctionReference<
        "mutation",
        "internal",
        { roomId: string },
        null
      >;
      removeRoomUser: FunctionReference<
        "mutation",
        "internal",
        { roomId: string; userId: string },
        null
      >;
      updateRoomUser: FunctionReference<
        "mutation",
        "internal",
        { data?: any; roomId: string; userId: string },
        null
      >;
    };
  };
};

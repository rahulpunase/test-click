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
import type * as http from "../http.js";
import type * as organizations_queries from "../organizations/queries.js";
import type * as organizations_service from "../organizations/service.js";
import type * as sample_mutations from "../sample/mutations.js";
import type * as sample_queries from "../sample/queries.js";
import type * as sample_service from "../sample/service.js";
import type * as user_queries from "../user/queries.js";
import type * as user_service from "../user/service.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  http: typeof http;
  "organizations/queries": typeof organizations_queries;
  "organizations/service": typeof organizations_service;
  "sample/mutations": typeof sample_mutations;
  "sample/queries": typeof sample_queries;
  "sample/service": typeof sample_service;
  "user/queries": typeof user_queries;
  "user/service": typeof user_service;
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

export declare const components: {};

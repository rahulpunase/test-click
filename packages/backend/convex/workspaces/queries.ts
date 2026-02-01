import { query } from "../_generated/server";
import { fetchUserMemberships as fetchUserMembershipsService } from "./service";

export const fetchUserMemberships = query({
  args: {},
  handler: async (ctx) => {
    return await fetchUserMembershipsService(ctx);
  },
});

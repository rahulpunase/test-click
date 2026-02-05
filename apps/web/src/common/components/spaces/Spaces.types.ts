import type { useGetSpaces } from "@repo/backend/spaces/queries";

export type SpacesData = ReturnType<typeof useGetSpaces>["data"];

export type Spaces = NonNullable<SpacesData>;

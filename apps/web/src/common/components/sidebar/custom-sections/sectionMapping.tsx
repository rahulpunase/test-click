import { SpacesSection } from "../../spaces/SpacesSection";
import { FavouritesSection } from "../../favorites/FavouritesSection";
import { RecentsSection } from "../../recents/RecentsSection";
import { ChannelsSection } from "../../channels/ChannelsSection";
import { DirectMessagesSection } from "../../direct-messages/DirectMessagesSection";

export const sectionMapping = {
  spaces: SpacesSection,
  favorites: FavouritesSection,
  recents: RecentsSection,
  channels: ChannelsSection,
  "direct-messages": DirectMessagesSection,
};

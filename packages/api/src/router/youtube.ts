import { env } from "@designali/auth/env";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const youtubeRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?id=UCZYm9jYmDesAGzbyFacUSfA&part=statistics&key=${env.YOUTUBE_API_KEY}`,
    );
    const data = await res.json();

    const channel = data.items[0];
    const statistics = channel.statistics;

    return {
      subscribers: Number(statistics.subscriberCount),
      views: Number(statistics.viewCount),
    };
  }),
});

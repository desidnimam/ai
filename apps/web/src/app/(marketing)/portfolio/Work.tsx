import { ScrollArea, ScrollBar } from "@designali/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@designali/ui/tabs";

import SMFestive from "./creatives//festive";
import Modals from "./creatives/3d";
import Campaigns from "./creatives/campaigns";
import SMCreative from "./creatives/creative";
import Logos from "./creatives/logos";
import Music from "./creatives/music";
import Others from "./creatives/others";
import Packaging from "./creatives/packaging";
import Reels from "./creatives/reels";
import UIUX from "./creatives/uiux";
import Videos from "./creatives/videos";

export function Work() {
  return (
    <Tabs
      defaultValue="1"
      className="mb-40 items-center justify-center text-center"
    >
      <TabsList className="sticky top-24 z-20 w-full items-center justify-center text-center shadow-xl lg:w-auto">
        <ScrollArea className="whitespace-nowrap">
          <div className="space-x-2">
            <TabsTrigger value="1" className="px-6">
              SM Creative
            </TabsTrigger>
            <TabsTrigger value="11" className="px-6">
              SM Festive
            </TabsTrigger>
            <TabsTrigger value="2" className="px-6">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="3" className="px-6">
              3D
            </TabsTrigger>
            <TabsTrigger value="12" className="px-6">
              Packaging
            </TabsTrigger>
            <TabsTrigger value="4" className="px-6">
              UI/UX
            </TabsTrigger>
            <TabsTrigger value="5" className="px-6">
              Logos
            </TabsTrigger>
            <TabsTrigger value="6" className="px-6">
              Music
            </TabsTrigger>
            <TabsTrigger value="7" className="px-6">
              Videos
            </TabsTrigger>
            <TabsTrigger value="8" className="px-6">
              Reels
            </TabsTrigger>
            <TabsTrigger value="9" className="px-6">
              Other
            </TabsTrigger>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TabsList>

      <TabsContent value="1">
        <SMCreative />
      </TabsContent>
      <TabsContent value="11">
        <SMFestive />
      </TabsContent>
      <TabsContent value="2">
        <Campaigns />
      </TabsContent>
      <TabsContent value="3">
        <Modals />
      </TabsContent>
      <TabsContent value="4">
        <UIUX />
      </TabsContent>
      <TabsContent value="5">
        <Logos />
      </TabsContent>
      <TabsContent value="6">
        <Music />
      </TabsContent>
      <TabsContent value="7">
        <Videos />
      </TabsContent>
      <TabsContent value="8">
        <Reels />
      </TabsContent>
      <TabsContent value="9">
        <Others />
      </TabsContent>
      <TabsContent value="10">
        <Others />
      </TabsContent>
      <TabsContent value="11">
        <Others />
      </TabsContent>
      <TabsContent value="12">
        <Packaging />
      </TabsContent>
    </Tabs>
  );
}

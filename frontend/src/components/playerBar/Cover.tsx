
import { usePlayerStore } from "@/store/playerStore";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"


export function Cover() {
  const { isPlaying, currentCover, currentSong } = usePlayerStore();
  console.log(isPlaying)


  return (
    <div className="flex items-center min-w-0 text-white overflow-hidden">
      <ItemGroup className="gap-4">


        <Item variant="default" asChild role="listitem">
          <a href="#" className="flex items-center gap-3 w-70 min-w-0 overflow-hidden">
            <ItemMedia variant="image">

{currentCover && (
  <img
    src={currentCover}
    alt={currentSong?.Title ?? ""}
    className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded"
  />
)}
            </ItemMedia>

            <ItemContent className="min-w-0">
              <ItemTitle className="truncate">
                {currentSong?.Title}
              </ItemTitle>
              <ItemDescription className="truncate">
                {currentSong?.Artist}
              </ItemDescription>
            </ItemContent>
          </a>
        </Item>
      </ItemGroup>
    </div>
  );
}


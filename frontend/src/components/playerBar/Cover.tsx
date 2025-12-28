
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
<<<<<<< HEAD
  const {  currentCover, currentSong } = usePlayerStore();
=======
  const { isPlaying, currentCover, currentSong } = usePlayerStore();
  console.log(isPlaying)
>>>>>>> a44f2d32bde70822c9fcf1ffab91e2121ad40f63


  return (
    <div className="flex items-center min-w-0 text-white overflow-hidden">
      <ItemGroup className="gap-4">


<<<<<<< HEAD
<Item variant="default" asChild role="listitem">
  <div className="flex items-center gap-3 w-70 min-w-0 overflow-hidden">
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
  </div>
</Item>
=======
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
>>>>>>> a44f2d32bde70822c9fcf1ffab91e2121ad40f63
      </ItemGroup>
    </div>
  );
}


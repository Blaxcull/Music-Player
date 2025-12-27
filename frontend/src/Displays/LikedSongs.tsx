import  Layout  from "@/layout"
import { Buffer } from "buffer";
import DisplayAllSongs from "@/components/songDisplay/DisplayAllSongs";

import PlayerBar  from "@/components/playerBar/PlayerBar";

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

function LikedSongs() {
    return (
        <>
      <PlayerBar />
        <Layout>
        <div>Liked Songs</div>
    </Layout>
    </>
    )
}

export default LikedSongs

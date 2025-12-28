import  Layout  from "@/layout"
import { Buffer } from "buffer";

import DisplayLikedSongs from "@/components/songDisplay/DisplayLikedSongs";

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
        <DisplayLikedSongs />
    </Layout>
    </>
    )
}

export default LikedSongs

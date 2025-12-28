import  Layout  from "@/layout"
import { Buffer } from "buffer";
<<<<<<< HEAD

import DisplayLikedSongs from "@/components/songDisplay/DisplayLikedSongs";
=======
import DisplayAllSongs from "@/components/songDisplay/DisplayAllSongs";
>>>>>>> a44f2d32bde70822c9fcf1ffab91e2121ad40f63

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
<<<<<<< HEAD
        <DisplayLikedSongs />
=======
        <div>Liked Songs</div>
>>>>>>> a44f2d32bde70822c9fcf1ffab91e2121ad40f63
    </Layout>
    </>
    )
}

export default LikedSongs

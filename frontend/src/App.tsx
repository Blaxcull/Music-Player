import  Layout  from "@/layout"
import { Buffer } from "buffer";
import DisplayAllSongs from "./components/songDisplay/DisplayAllSongs";

import PlayerBar  from "./components/playerBar/PlayerBar";

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

function App() {
    return (
        <>
      <PlayerBar />
        <Layout>
        <DisplayAllSongs />
    </Layout>
    </>
    )
}

export default App

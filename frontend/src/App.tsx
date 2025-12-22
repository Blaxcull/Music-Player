import  Layout  from "@/layout"
import  TopBar  from "@/components/TopBar"
import { Buffer } from "buffer";
import DisplayAllSongs from "./components/songDisplay/DisplayAllSongs";

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer;

function App() {
    return (
        <Layout>
        <DisplayAllSongs />
    </Layout>
    )
}

export default App

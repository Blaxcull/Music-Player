import { create } from "zustand";

type Song = {
  _id: string;
  Title: string;
  Artist: string;
  Duration: number;
  SignedSongURL: string;
  SignedCoverURL: string;
  Liked: boolean
};

type LoopMode = "none" | "one" | "all";

type PlayerStore = {
  audio: HTMLAudioElement | null;

  queue: Song[];

playOrder: number[];   
  orderIndex: number;

  currentSong: Song | null;


  currentIndex: number;
  isPlaying: boolean;

  loopMode: LoopMode;

  playAt: (index: number, queue?: Song[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;

  setQueue: (songs: Song[]) => void;
  setLoopMode: (mode: LoopMode) => void;
  seek: (percent: number) => void;
  setVolume: (volume: number) => void;
  volume: number;
  setShuffle: () => void;
  shuffle: boolean;

  currentCover:string | null;
  setCurrentCover: () => void;



};

export const usePlayerStore = create<PlayerStore>((set, get) => {
  const audio = typeof window !== "undefined" ? new Audio() : null;



  if (audio) {
    audio.addEventListener("ended", () => {
      const { loopMode, currentIndex, queue } = get();

      if (queue.length === 0) return;

      // 🔁 LOOP ONE → handled by audio.loop
      if (loopMode === "one") return;

      // 🔁 LOOP ALL
      if (loopMode === "all") {
        const nextIndex = (currentIndex + 1) % queue.length;
        get().playAt(nextIndex);
        return;
      }

      // ❌ NO LOOP
      if (currentIndex + 1 < queue.length) {
        get().playAt(currentIndex + 1);
      } else {
        set({ isPlaying: false });
      }
    });
  }

  return {
    audio,
  currentCover:null, 
  currentSong: null,

  setCurrentCover: () => {

      const cover = get().queue[get().currentIndex].SignedCoverURL;

        if (!cover) return;

    set({ currentCover: cover.split("?")[0] });
  },


    queue: [],
    currentIndex: -1,
    isPlaying: false,
    loopMode: "none",

    playOrder: [],      
  orderIndex: 0,
    setLoopMode: (mode) => {
      if (!audio) return;

      audio.loop = mode === "one";
      set({ loopMode: mode });
    },

    seek: (percent) => {
      if (!audio) return;
      audio.currentTime = percent * audio.duration;
    },

setQueue: (songs) => {
  const indices = songs.map((_, i) => i);

  set({
    queue: songs,
    playOrder: indices,
    orderIndex: 0,
  });
},

   playAt: (index) => {



  const { queue } = get();
  const song = queue[index];
  if (!song || !audio) return;

  audio.src = song.SignedSongURL.split("?")[0];
  audio.play();

  set({
    currentIndex: index,
    isPlaying: true,
  });

  set({ currentSong: song });


  get().setCurrentCover();
},

    toggle: () => {
      if (!audio) return;

      if (audio.paused) {
        audio.play();
        set({ isPlaying: true });
      } else {
        audio.pause();
        set({ isPlaying: false });
      }
    },

    next: () => {
  const {  playOrder, orderIndex, loopMode } = get();


  if (get().loopMode === "one"){


      set({ loopMode: "none" });

  }

  if (orderIndex + 1 < playOrder.length) {
    const nextIndex = playOrder[orderIndex + 1];
    set({ orderIndex: orderIndex + 1 });
    get().playAt(nextIndex);
  } else if (loopMode === "all") {
    set({ orderIndex: 0 });
    get().playAt(playOrder[0]);
  }
},

prev: () => {
  const { playOrder, orderIndex } = get();

  if (orderIndex > 0) {
    const prevIndex = playOrder[orderIndex - 1];
    set({ orderIndex: orderIndex - 1 });
    get().playAt(prevIndex);
  }
},


      volume: 1,
    setVolume: (volume: number) => {
      if (!audio) return;
      audio.volume = volume;
      set({ volume });
    },

    shuffle: false,

setShuffle: () => {
  const { queue, currentIndex, shuffle } = get();

  if (queue.length === 0) return;

  // TURN SHUFFLE ON
  if (!shuffle) {
    const rest = queue
      .map((_, i) => i)
      .filter((i) => i !== currentIndex);

    // Fisher–Yates shuffle
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }


   let newPlayOrder;
   newPlayOrder =  [...rest];

  const x = newPlayOrder.filter((i:number) => i !== -1);
  if (currentIndex === -1){

      const y = x.filter((i:number) => i !== 0);

    newPlayOrder = [0, ...y];
  }
  else{

    newPlayOrder = [currentIndex, ...x];
  }


set({
  shuffle: true,
  playOrder: newPlayOrder,
  orderIndex: 0,
});
  }

  // TURN SHUFFLE OFF
  else {
    const playOrder = queue.map((_, i) => i);

    set({
      shuffle: false,
      playOrder,
      orderIndex: currentIndex,
    });
  }
},


  };
});


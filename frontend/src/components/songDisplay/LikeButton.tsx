
import { useState, useEffect} from "react"
import { Button } from "@/components/ui/button";
import api from "@/lib/api";



interface LikeButtonProps{
  isLiked: boolean;
  songId: string;
}
const LikeButton = ({ isLiked, songId }: LikeButtonProps) => {
    const [localLike, setLocalLike] = useState<boolean | null>(null)


        const showIsLiked = (localLike !== null ? localLike : isLiked)

    const onClick = () => {
        setLocalLike(prev => !(prev ?? isLiked))
        console.log(showIsLiked)
    }




    useEffect(() => {
        (async () => {

            console.log(songId)
    const res = await api.post("/api/songs/isLikedClicked", {
        songID: songId,
        liked: isLiked,
    });
    console.log(res.data);
        })()
         },[isLiked, songId])






    return (
        <span className="w-8 flex-shrink-0 relative">
        <Button
        //className="opacity-0 group-hover:opacity-100 transition"
        onClick={onClick}
        >
        {showIsLiked ? "o" : "n"}
        </Button>
        </span>
    )
}

export default LikeButton


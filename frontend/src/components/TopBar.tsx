import {ProfileDropdown} from "@/components/ProfileDropdown"

import {
  SearchIcon,
} from "lucide-react"


import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { usePlayerStore } from "@/store/playerStore"




const TopBar = () => {

    const setSearchedSong = usePlayerStore((state) => state.setSearchedSong);

    
    


  return (
 <div className="relative flex items-center w-full h-16 bg-black px-6 py-2 ">
  <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md">
    <InputGroup

    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchedSong(e.target.value);
    }}

    className="text-white bg-transparent border-none rounded-full focus:ring-0 px-0">
      <InputGroupInput placeholder="Search..." className="text-white" />
      <InputGroupAddon className="text-white">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  </div>

  <div className="ml-auto">
    <ProfileDropdown />
  </div>
</div>
  )
}

export default TopBar

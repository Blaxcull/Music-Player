
import {ProfileDropdown} from "@/components/ProfileDropdown"
const TopBar = () => {



  return (
  <div className="flex items-center w-full h-16 bg-gray-800 px-6 py-2 shadow-md">
  <div className="w-full text-white">
  Search...
  </div>


  <ProfileDropdown />

</div>
  )
}

export default TopBar

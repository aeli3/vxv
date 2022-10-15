import Body from "../components/Body";
import SideBar from "../components/SideBar";
import Profile from "../components/Profile"
import Sentiment from "../components/Sentiment";
import Insider from "../components/Insider";
import Earnings from "../components/Earnings";
import Summary from "../components/Summary";


export default function Home() {
  return (
      <>
      <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 bg-gray-300 p-4 bg-gradient-to-t from-[#040404] to-[#656565]">
            <SideBar />
          </div>
          <div className="w-full md:w-5/12 p-12 space-y-6">
            <Profile />
            <Sentiment />
            <Body />
          </div>
          <div className="w-full md:w-5/12 p-12 space-y-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full col-span-2 lg:col-span-1">
                <Insider />
              </div>
              <div className="w-full col-span-2 lg:col-span-1">
                <Earnings />
              </div>
            </div> 
            <Summary />
          </div>
      </div>
      </>
  )
}

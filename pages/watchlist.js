import SideBar from "../components/SideBar";
import Portfolio from "../components/watchlist/Portfolio";
import Trends from "../components/watchlist/Trends";

export default function Watchlist() {
    return (  
        <div className="flex flex-col md:flex-row">
            <div className="w-full h-screen md:w-64 bg-gray-300 p-4 bg-gradient-to-t from-[#040404] to-[#656565]">
                <SideBar />
            </div>
            <div className="flex flex-col space-y-4  w-full py-12 px-40">                    
                <Portfolio />
            </div>
        </div>
    );
}
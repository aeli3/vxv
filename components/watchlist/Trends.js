import { useRef } from "react";
import { useState } from "react";

export default function Trends(props) {
    const [trends, setTrends] =  useState(["Covid", "Climate Change", "Supply Chain", 
    "Ukraine War", "Iran", "China", "Taiwan", "Inflation", "FOMC"])
    const trendInput = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        setTrends([...trends, trendInput.current.value])
        trendInput.current.value = ""
    }

    return (
        <>  
            <div className="w-full text-3xl font-bold mb-2">Trends </div>
            <form onSubmit={e => handleSubmit(e)}>
                <input ref={trendInput} type="text" placeholder="Add Trend" className="border border-2 w-1/2 px-2"/>
            </form>
            <div className="flex flex-wrap space-x-2">
                {trends.map((trend, index) => (
                    <button key={index} onClick={() => props.selectTrend()} className="group mt-2 hover:bg-gray-600 rounded-3xl text-center bg-slate-900 px-4 py-2 focus:bg-blue-200 focus:border-2 border-blue-500" value={trend}>
                        <div className="flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hidden group-focus:block mr-2 stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <h1 className="text-md text-white font-medium">{trend}</h1>
                        </div>
                    </button>
                ))}
            </div>
        </>

    );
}

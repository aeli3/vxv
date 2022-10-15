import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { fetchBasket } from "../api/api"
import { SearchContext } from "../contexts/SearchContext"

export default function Summary() {
    const {state, dispatch} = useContext(SearchContext)
    const [alert, setAlert] = useState(false)
    const [basket, setBasket] = useState({
        long: ["ASML", "HOOD", "MSTR", "TWTR", "AAPL", "NFLX","AMZN", "BAC", "GOOGL"]
    })
    const textColor = (state) => {
        return !state ? 'text-[rgb(255,0,0)]': 'text-[rgb(0,255,0)]'
    } 
    
    function handleClick(ticker) {
        dispatch({ type: "SUCCESS", payload: ticker})
    }

    const handleWatchlist = (items)  => {
        setAlert(true)
        if (typeof window !== "undefined") {
            const watchlist = JSON.parse(window.localStorage.getItem('watchlist'))
            if (watchlist) {
                let new_list = [...new Set([...watchlist, ...items])]
                window.localStorage.setItem('watchlist', JSON.stringify(new_list));
            } else {
                window.localStorage.setItem('watchlist', JSON.stringify([...items]));
            }
            
            setTimeout(() => {
                setAlert(false)
            }, 3000)
        }
    }  

    return(
        <>
            <div className="flex p-4 mb-4 text-sm border border-gray-200 shadow-md hover:bg-gray-100 rounded-lg" role="alert">
                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Exploratory summary:</span>
                    <ul className="mt-1.5 ml-4 list-disc list-inside">
                    {  Object.entries(state.summary).map((item, index) => {
                        return <li key={index} className={textColor(item[1].value)}>
                            <span className="text-md font-medium">
                             { item[1].message }
                            </span>
                        </li>
                    })
                    }
                    </ul>
                </div>
            </div>
            <p className="text-lg font-bold">Related Stocks</p>
            <div className="flex flex-row space-x-4">
                {basket.long.map((ticker, index) => (
                    <div onClick={e => handleClick(e.target.id)} 
                    id={ticker}
                    key={index}
                    className="rounded-lg shadow-lg p-2 w-16 bg-gray-800 text-white text-center hover:bg-gray-500">
                    {ticker}
                    </div>))
                }          
            </div>
            <div className="flex flex-row space-x-2">
                <button onClick={() => handleWatchlist([state.ticker])} className="bg-gray-800 text-white rounded-md hover:bg-gray-400 w-full w-1/2 py-2 mt-12 px-2">Add {state.ticker} to watchlist</button>
                <button onClick={() => handleWatchlist(basket.long)} className="bg-gray-800 text-white rounded-md hover:bg-gray-400 w-full w-1/2 py-2 mt-12 px-2">Add Basket to watchlist</button>
            </div>
            {alert && 
            <div className="absolute top-0 left-1/2 bg-gray-200 border-t-4 border-gray-800 rounded-b text-gray-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-gray-800 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                    <p className="font-bold">Stock(s) added to watchlist!</p>
                    </div>
                </div>
            </div>
            }
        </>
    )
}
import { useState, useEffect, useContext } from "react";
import { fetchTickers } from "../api/api";
import { SearchContext } from "../contexts/SearchContext";
import Link from "next/link";
import Image from "next/image";


export default function SideBar() {
    const { state, dispatch } = useContext(SearchContext)
    const [data, setData] = useState({
        tickers: [],
        search: [],
        input: '',
    })

    function handleInput(inp) {
        let filtered = data.tickers.filter(ticker => ticker.includes(inp.toUpperCase()))
        setData(data => ({
            ...data,
            search: [...filtered.slice(0,5)],
            input: inp,
        }))
    }

    function handleSubmit(inp) {
        setData(data => ({
            ...data,
            input: inp,
            search: [],
        }))
        dispatch({ type: "SUCCESS", payload: data.input})
    }
    
    useEffect(() => {
        let tickerArray = []
        const abortController = new AbortController()
        fetchTickers(abortController.signal)
        .then(tickers => {
            tickers.forEach( ticker => tickerArray.push(ticker.symbol))
            setData(data => ({
                ...data,
                ...{tickers: [...tickerArray]},
            }))
        })
        return () => abortController.abort()

    }, [])

    return (
        <div className="flex flex-col space-y-4">
            <Link href="/">
                <Image src="vsb_logo.png" alt="" />
            </Link>
            <form 
            onSubmit={e => {e.preventDefault(); handleSubmit(e.target[0].value)}}
            className="flex flex-col space-y-4"
            >
                <input type="text" 
                name="stock-picker" 
                placeholder=" Stock Ticker" 
                onChange={e => handleInput(e.target.value)} 
                value={data.input}
                required
                />
                <div className="flex flex-row flex-wrap space-x-1 space-y-1">
                    {
                        data.search.map((item,index) => {
                            return(
                                <button key={index} onClick={ e => setData(data => ({...data, ...{input:e.target.innerHTML}})) } 
                                className="text-start border-2 pr-2 rounded-full bg-white border-b-gray-100 pl-3 hover:bg-blue-700 text-gray-300"
                                type="button"
                                >
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
                <button type="submit" className="bg-gray-500 text-white hover:bg-white hover:text-black">Analyze</button>
                <Link href="/watchlist" className="bg-gray-500 text-white hover:bg-white hover:text-black text-center">Watchlist</Link>
            </form>
        </div>
    )
}
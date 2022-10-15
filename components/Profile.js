import { useContext, useEffect, useState } from "react"
import { fetchIndicators, fetchProfile } from "../api/api"
import { SearchContext } from "../contexts/SearchContext"
import Graph from "./Graph"

export default function Profile() {
    const { state, dispatch } = useContext(SearchContext)
    const [profile, setProfile] = useState({})
    const [indicators, setIndicators] = useState({})
    var lineColor = indicators.c?.slice(0)[0] > indicators.c?.slice(-1)[0] ? 'rgb(255,0,0)': 'rgb(0,255,0)'

    useEffect(() => {
        const abortController = new AbortController();
        fetchProfile(abortController.signal, state.ticker)
            .then(resp => setProfile(data => ({
                ...data,
                ...resp
            })))
            .catch(e => console.log(e))

        fetchIndicators(abortController.signal, state.ticker)
            .then(resp => setIndicators(data => ({
                ...data,
                ...resp
            })))
            .catch(e => console.log(e))


        return () => abortController.abort()
    }, [state.ticker])

    return (
        <div className="flex flex-row flex-wrap border border-gray-200 shadow-md hover:bg-gray-100 rounded-lg p-4 space-y-2 justify-between">
            <div className="flex-col space-y-1 p-2">
                <div className="flex flex-row space-x-2 items-center">
                    <img alt="" src={profile?.logo} className="w-12" />
                    <span className="font-bold text-3xl">{profile?.name}</span>
                </div>
                <p>
                    <span className="font-bold">Shares: </span>
                    <span>{profile?.shareOutstanding} Million</span>
                </p>
                <p className="mt-auto">
                    <span className="font-bold">Price: </span>
                    <span className={`text-[${lineColor}]`}>${ indicators.c?.slice(-1)[0] }</span>
                </p>
            </div>
            <div className="w-42 self-end">
                <Graph indicators={indicators}/>
            </div>
        </div>
    )
}
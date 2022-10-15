import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import Trends from "./Trends";

const Portfolio = () => {
    const [watchlist, setWatchlist] = useState([])
    const [score, setScore] = useState([])
    const ReactSpeedometer = dynamic(() => import('react-d3-speedometer'), {
        ssr: false
      });

    const customLabels = [
        {
            text: "Very Bad",
            position: "INSIDE",
            color: "#555",
        },
        {
            text: "Bad",
            position: "INSIDE",
            color: "#555",
        },
        {
            text: "Ok",
            position: "INSIDE",
            color: "#555",
            fontSize: "19px",
        },
        {
            text: "Good",
            position: "INSIDE",
            color: "#555",
        },
        {
            text: "Very Good",
            position: "INSIDE",
            color: "#555",
        },
        ]

    function handleTrend() {
        let tickers = JSON.parse(localStorage.getItem("watchlist"))
        setWatchlist(tickers)
        setScore(getRandomInt(0, 10))
    }

    function getRandomInt(min, max) {
        let dist = [10,9,8,7,6,5,4,4,3,3,4,2,2,1]
        return Array(10).fill().map(() => dist[Math.floor(Math.random() * dist.length)]).sort((a, b) => b-a)
    }


    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
      };

    function removeTicker(payload) {
        let [ticker, index] = payload
        score.remove(index)
        setWatchlist(watchlist.filter(e => e !== ticker))
        setScore(score)
    }

    useEffect(() => {
        let tickers = JSON.parse(localStorage.getItem("watchlist"))
        setWatchlist(tickers)
        setScore(getRandomInt(2, 10))
    }, [])

    return ( 
        <>
            <Trends selectTrend={handleTrend}/>
            <div className="flex flex-col md:flex-row space-x-10">
                <table className="table-auto w-2/3 max-w-2/3">
                    <thead className="border-b font-medium p-4 pt-0 pb-3 text-left">
                        <tr>
                        <th>Song</th>
                        <th>Correlations Score</th>
                        <th>Sentiment</th>
                        </tr>
                    </thead>
                    <tbody>
        
                        {watchlist
                        ?
                            watchlist.map((ticker, index) => (
                                <tr key={index} className="first:bg-red-200">
                                    <td>{ ticker }</td>
                                    <td>{score[index]}</td>
                                    <td>Negative</td>
                                    <td>
                                        <button onClick={e => removeTicker([ticker, index])} className="bg-red-200 px-2 font-bold hover:bg-slate-200">X</button>
                                    </td>
                                </tr>
                            ))
                        : null
                        }
                    </tbody>
                </table>
                <div className="grid w-1/3 max-w-1/3">
                    <div className="col-span-1 ">
                        <ReactSpeedometer 
                        maxValue={10}
                        value={10 - (score.reduce((a, b) => a + b, 0) / score.length)}
                        height={160}
                        currentValueText={""}
                        labelFontSize={10}
                        customSegmentLabels={customLabels}
                        />
                        <div className=" px-6">
                            <p className="w-3/5">
                                The speedometer above shows the safety score of your whole portfolio.
                                Remove the worst ranked stocks to improve ur portfolio (Indicated in {<span className="text-red-600">Red</span>})
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Portfolio;
import { useEffect } from "react"
import { useContext } from "react";
import { useState } from "react"
import { fetchSentiment } from "../api/api";
import { SearchContext } from "../contexts/SearchContext";
import { m_sentiment } from "../models/Models";
import Image from "next/image";

export default function Sentiment() {
    const {state, dispatch} = useContext(SearchContext)
    const [sentiment, setSentiment] = useState({
        reddit: {
            positiveMention: 7,
            negativeMention: 86,
            score: -0.85,
        },
        twitter: {
            positiveMention: 832,
            negativeMention: 1467,
            score: -0.34,
        },
    })

    useEffect(() => {
        const abortController = new AbortController();
        var sent = m_sentiment
            
    dispatch({ type: "SUMMARY", payload: {
        sentiment: {
            value: (sentiment.reddit.score + sentiment.twitter.score / 2) < 0 ? false : true,
            message: (sentiment.reddit.score + sentiment.twitter.score / 2) < 0 
            ? `Sentiment of Reddit and Twitter combined is negative` 
            : `Sentiment of Reddit and Twitter combined is positive`,
        }
    }})

        fetchSentiment(abortController.signal, state.ticker)
            .then(resp => {
                const len_r = resp.reddit.length
                const len_t = resp.twitter.length

                resp.reddit.map(item => {
                    sent.reddit.positiveMention = sent.reddit.positiveMention += item.positiveMention
                    sent.reddit.negativeMention = sent.reddit.negativeMention += item.negativeMention
                    sent.reddit.score = sent.reddit.score += (item.score / len_r)
                })

                resp.twitter.map(item => {
                    sent.twitter.positiveMention = sent.twitter.positiveMention += item.positiveMention
                    sent.twitter.negativeMention = sent.twitter.negativeMention += item.negativeMention
                    sent.twitter.score = sent.twitter.score += (item.score / len_t)
                })

                setSentiment(data => ({
                    ...data,
                    ...sent
                }))
            })
            .catch(e => console.log(e))

        return () => abortController.abort()
    }, [state.ticker])
    
    return(
        <div className="flex flex-col md:flex-row space-x-4">
            <div className="flex-col p-4 w-full border border-gray-200 shadow-md hover:bg-gray-100 rounded-lg">
                <div className="flex flex-row space-x-2 items-center">
                    <Image className="w-8" src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png" alt="" />
                    <span className="text-xl font-bold">Reddit</span>
                </div>
                <p>
                    <span className="font-bold text-md">Positive Mentions: </span>
                    { sentiment.reddit?.positiveMention } 
                </p>
                <p>
                    <span className="font-bold text-md">Negative Mentions: </span>
                    { sentiment.reddit?.negativeMention } 
                </p>
                <p>
                    <span className="font-bold text-md">Sentiment score: </span>
                    { sentiment.reddit?.score.toFixed(2) }
                </p>
            </div>
            <div className="flex-col p-4 w-full border border-gray-200 shadow-md hover:bg-gray-100 rounded-lg">
                <div className="flex flex-row space-x-2 items-center">
                    <Image className="w-8" src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg" alt="" />
                    <span className="text-lg font-bold">Twitter</span>
                </div>
                <p>
                    <span className="font-bold text-md">Positive Mentions: </span>
                    { sentiment.twitter?.positiveMention } 
                </p>
                <p>
                    <span className="font-bold text-md">Negative Mentions: </span>
                    { sentiment.twitter?.negativeMention } 
                </p>
                <p>
                    <span className="font-bold text-md">Sentiment score: </span>
                    { sentiment.twitter?.score.toFixed(2) }
                </p>
            </div>
        </div>
    )
}
import { useContext, useEffect, useState} from "react"
import { fetchNews } from "../api/api";
import { SearchContext } from "../contexts/SearchContext"
import examples from './example.JSON'
import Image from "next/image";

export default function Body() {
    const { state, dispatch } = useContext(SearchContext)
    const [articles, setArticles] = useState(examples.articles)

    useEffect(() => {
        const abortController = new AbortController();
        fetchNews(abortController.signal, state.ticker)
        .then(data => setArticles(data))
        .catch(err => console.log(err))

        return () => abortController.abort()
    }, [state.ticker])

    return (
        <section className="grid place-items-center">
            <div className="grid max-w-4xl gap-4 grid-cols-2 md:grid-cols-3">
                <a href={articles[12]?.url} target="#blank" className="row-start-1 col-start-1 col-end-3 col-span-2 md:row-start-1 md:col-start-1 md:row-span-3">
                    <Image alt="" src={articles[12]?.image} className="w-full h-full object-cover md:aspect-video" />
                </a>
                <div className="row-start-1 col-start-1 col-end-3 md:row-start-1 md:col-start-1 md:col-end-3 md:row-end-4 self-end bg-gradient-to-b from-transparent to-zinc-700 p-4">
                    <p className="text-white md:font-extrabold md:text-2xl">{articles[12]?.headline}</p>
                </div>

                <a href={articles[8]?.url} target="#blank" className="row-start-2 col-start-1 col-span-2 md:row-start-1 md:col-start-3 md:col-span-1">
                    <Image alt="" src={articles[8]?.image} className="w-full md:max-h-36 object-cover hover:brightness-110 ease-in duration-200 md:aspect-square"/>
                </a>
                <div className="row-start-2 col-start-1 col-end-3 md:col-start-3 md:row-start-1 self-end bg-gradient-to-b from-transparent to-zinc-700 p-2">
                    <p className="text-white md:font-extrabold md:text-sm">{articles[8]?.headline}</p>
                </div>

                <a href={articles[3]?.url} target="#blank" className="row-start-3 col-start-1 col-span-2 md:row-start-2 md:col-start-3 md:col-span-1">
                    <Image alt="" src={articles[3]?.image} className="w-full md:max-h-36 object-cover hover:brightness-110 ease-in duration-200 md:aspect-square"/>
                </a>
                <div className="row-start-3 col-start-1 col-end-3 md:col-start-3 md:row-start-2 self-end bg-gradient-to-b from-transparent to-zinc-700 p-2">
                    <p className="text-white md:font-extrabold md:text-sm">{articles[3]?.headline}</p>
                </div>

                <a href={articles[9]?.url} target="#blank"className="row-start-4 col-start-1 col-span-2 md:row-start-3 md:col-start-3 md:col-span-1">
                    <Image alt="" src={articles[9]?.image} className="w-full md:max-h-36 object-cover hover:brightness-110 ease-in duration-200 md:aspect-square"/>
                </a>
                <div className="row-start-4 col-start-1 col-end-3 md:col-start-3 md:row-start-3 self-end bg-gradient-to-b from-transparent to-zinc-700 p-2">
                    <p className="text-white md:font-extrabold md:text-sm">{articles[9]?.headline}</p>
                </div>
            </div>
        </section>
    )
}
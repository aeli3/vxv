import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { fetchInsiders } from "../api/api"
import { SearchContext } from "../contexts/SearchContext"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Insider() {
    const [filing, setFiling] = useState({})
    const {state, dispatch} = useContext(SearchContext)
    var totalChange = filing.data?.map(item => item.change).reduce((a,c) => a + c, 0)
    const texStyling = totalChange < 0 ? "text-lg font-bold text-[#eb0f29]" : "text-lg font-bold text-[rgb(0,255,0)]"

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
        },
      };

    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const data = {
    labels,
    datasets: [
        {
        label: 'Shares traded by insiders',
        data: filing.data?.map(item => item.change),
        backgroundColor: filing.data?.map(item => {
          return item.change > 0 ? 'rgb(0,255,0)' : 'rgb(255,0,0)'
        })
        },
    ],
    };

    useEffect(() => {
        const abortController = new AbortController();
        dispatch({ type: "SUMMARY", payload: {
            insiders: {
                value: totalChange < 0 ? false : true,
                message: totalChange < 0 ? `More than ${totalChange} shares were sold by insiders` : `more than ${totalChange} shares were bought by insiders`,
            }
        }})

        fetchInsiders(abortController.signal, state.ticker)
        .then(resp => setFiling(data => ({
            ...data,
            ...resp
        })))
        .catch(e => console.log(e))

    return () => abortController.abort()
    }, [state.ticker])

    return (
        <Bar options={options} data={data}/>
    ) 

}
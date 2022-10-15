import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { fetchEarnings } from "../api/api"
import { SearchContext } from "../contexts/SearchContext"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

export default function Earnings() {
    const [earnings, setEarnings] = useState([])
    const {state, dispatch} = useContext(SearchContext)
    const earningsMessage = {
      earnings: {
          value: earnings[earnings.length - 1]?.surprisePercent < 0 ? false : true,
          message: earnings[earnings.length - 1]?.surprisePercent < 0 
          ? `Last earnings missed` 
          : `Last earning beat`,
      }
    }

    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            type: "category",
            grid: {
              display: false,
              borderWidth: 0
            }
          }
        },
      };

    
    const labels = earnings.slice(0, 5).map(item => item.surprise < 0 ? `Missed ${item.surprisePercent}%` : `Beat ${item.surprisePercent}%`);
    const data = {
    labels,
    datasets: [
        {
            label: 'Actual',
            data: earnings.map(item => item.actual),
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
        {
            label: 'Expected',
            data: earnings.map(item => item.estimate),
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
    ],
    };
    
    useEffect(() => {
      dispatch({ type: "SUMMARY", payload: earningsMessage})
      const abortController = new AbortController();

      fetchEarnings(abortController.signal, state.ticker)
      .then(resp => {
        setEarnings(() => ([
          ...resp].reverse()))})  
      .catch(e => console.log(e))        

    return () => abortController.abort()
    }, [state.ticker])

    return (
      <Scatter options={options} data={data} />
    ) 

} 
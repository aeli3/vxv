import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
        LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function Graph(props) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
          title: {
            display: true,
          },
        },

        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                }
            },
            y: {
                grid: {
                    display: false,
                    borderWidth: 0,
                }
            },

          },
    }

    var lineColor = props.indicators.c?.slice(0)[0] > props.indicators.c?.slice(-1)[0]? 'rgb(255,0,0)': 'rgb(0,255,0)'
    const data = {
    labels: Array(props.indicators.c?.length).join(".").split("."),
    datasets: [
        {
            id: 1,
            label: 'Price',
            data: props.indicators?.c,
            borderColor: lineColor,
            pointBackgroundColor: 'rgb(255, 255, 255)'
        },
        ],
    }

  return (
    <Line options={options} data={data} />
  )
}
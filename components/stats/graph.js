// ./components/LineChart.js

import React, {useEffect} from 'react';
import Chart from "chart.js/auto";
import {Line} from "react-chartjs-2";
import {listOrders} from "@lib/orders/orders";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Graph = ({orders}) => {

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const {ctx} = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'lightGreen';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    const options = {

        layout: {
            margin: 200
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 40
                },
                max: 60
            },
            x: {
                position : 'top',
                ticks: {
                    padding: 40
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                align: 'top',
                offset: 45,
                borderWidth: 2,
                padding: 8,
                borderColor: 'rgb(237,237,237)',
                borderRadius: 10,
                clamp: true,
                font: {
                    size: 25,
                    weight: 'bold'
                },
                color: 'rgb(0, 67, 53)',
                labels: {
                    title: {
                    }
                }
            }
        }
    }


    const ordersMap = new Map();
    let startingDate = new Date(2022, 4, 21, 18, 0);

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        initializeGraph()
    }, [orders.length]);

    const initializeGraph = () => {
        orders.map(order => addToMap(order));
        for (let counter = 0; counter < 22 ; counter++){
            if (ordersMap.get(counter) === undefined){
              //  console.log("counter added: " , counter);
                ordersMap.set(counter, 0);
            }
        }
        //console.log("data:", ordersMap);
        //On trie celon le nombre de ordersMap
        const orderdedCommandes = new Map([...ordersMap.entries()].sort((a, b) => a[0] - b[0]));

        const labels = Array.from(orderdedCommandes.keys()).map(x => addMinutes(startingDate, 30 * x))
            .map(x => new Date(x).getHours() +  ": " + (new Date(x).getMinutes() > 9 ?  new Date(x).getMinutes() :  "0" + new Date(x).getMinutes()));

        // console.log("ordersMap:", Array.from(orderdedCommandes.values()));
        setData({
            labels: labels,
            datasets: [
                {
                    label: "Consommations",
                    backgroundColor:
                    // ['rgb(0, 67, 53)',
                    // 'rgb(238, 164, 200)',
                        'rgb(255,255,255)',
                    // ["rgb(230,94,68)"],
                    borderWidth: 3,
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    borderColor: "rgb(230,94,68)",
                    data: Array.from(orderdedCommandes.values()),
                },
            ],

        });

    }

    function addMinutes(date, minutes) {
    //    console.log(new Date(new Date(date).getTime() + minutes*60000));
        return new Date(new Date(date).getTime() + minutes*60000);
    }

    const addToMap = (order) => {
            var minutes = dateDiffInHours(new Date(order.date), new Date(startingDate));
            //half hour
            var key = Math.round(minutes / 30);
            ordersMap.set(key, (ordersMap.has(key) ? ordersMap.get(key) : 0) + order.items.length);
    }

    function dateDiffInHours(a, b) {
        const MS = 1000 * 60;

     //   console.log("Dates", new Date(a), " " , new Date(b), ", diff, ", new Date(a) - new Date(b));;
        // Discard the time and time-zone information.
        let diffMs = new Date(a)  - new Date(b);
       // console.log("diffMs: ", diffMs);
        return Math.round(diffMs / MS);
    }

     // setTimeout(() => window.open("/stats", "_self"), 5000);


    Chart.register(ChartDataLabels);
    return (
        <div>
            <h1>Bières commandées</h1>
        <div>
            {Object.keys(data).length > 0 ?
                <Line options={options} data={data} plugins={plugin} />
                : null}

        </div>
        </div>
    );


};

export default Graph;
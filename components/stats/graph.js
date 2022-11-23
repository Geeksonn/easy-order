import React from 'react';

import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import css from '@styles/stats.module.css';

const Graph = ({ orders }) => {
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'lightGreen';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        },
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 40,
                },
                suggestedMax: 15
            },
            x: {
                position: 'top',
                ticks: {
                    padding: 40,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                align: 'top',
                offset: 45,
                borderWidth: 2,
                padding: 8,
                borderColor: 'rgb(237,237,237)',
                backgroundColor: 'rgb(255,255,255)',
                borderRadius: 10,
                clamp: true,
                font: {
                    size: 25,
                    weight: 'bold',
                },
                color: 'rgb(0, 67, 53)',
                labels: {
                    title: {},
                },
            },
        },
    };

    const ordersMap = new Map();
    let startingDate = new Date(2022, 4, 21, 18, 0);

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        initializeGraph();
    }, [orders.length]);

    function extractValues(orderdedCommandes) {
        return Array.from(orderdedCommandes.values());
    }

    function extractLabels(orderdedCommandes) {
        function extractTimeLabel(x) {
            return new Date(x).getHours() +
                ': ' +
                (new Date(x).getMinutes() > 9 ? new Date(x).getMinutes() : '0' + new Date(x).getMinutes())
        }

        return Array.from(orderdedCommandes.keys())
            .map((x) => addMinutes(startingDate, 30 * x))
            .map(
                (x) => {
                    if (new Date(x).getMinutes() !== 30) {
                        return extractTimeLabel(x);
                    } else {
                        return '';
                    }
                }
            );
    }

    const initializeGraph = () => {
        orders.map((order) => addToMap(order));
        let max = Array.from(ordersMap.keys()).reduce((a, b) => Math.max(a, b), -Infinity);
        for (let i = 0; i < max; i++){
            if (ordersMap.get(i) === undefined) {
                ordersMap.set(i, 0);
            }
        }
        //console.log("data:", ordersMap);
        //On trie celon le nombre de ordersMap
        const sortedOrders = new Map([...ordersMap.entries()].sort((a, b) => a[0] - b[0]));
        const labels = extractLabels(sortedOrders);
        let values = extractValues(sortedOrders);

        setData({
            labels: labels,
            datasets: [
                {
                    label: 'Consommations',
                    backgroundColor:
                        // ['rgb(0, 67, 53)',
                        // 'rgb(238, 164, 200)',
                        'rgb(255,255,255)',
                    // ["rgb(230,94,68)"],
                    borderWidth: 3,
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    borderColor: 'rgb(230,94,68)',
                    data: Array.from(values),
                },
            ],
        });
    };

    function addMinutes(date, minutes) {
        //    console.log(new Date(new Date(date).getTime() + minutes*60000));
        return new Date(new Date(date).getTime() + minutes * 60000);
    }

    const addToMap = (order) => {
         //if (new Date(order.date) < new Date (2022, 4, 21, 18 , 50, 0)) {
        var minutes = dateDiffInMinutes(new Date(order.date), new Date(startingDate));
        //half hour
        var key = Math.floor(minutes / 30);
        ordersMap.set(key, (ordersMap.has(key) ? ordersMap.get(key) : 0) + order.items.length);
     //       }
    };

    function dateDiffInMinutes(a, b) {
        const MS = 1000 * 60;
        let diffMs = new Date(a) - new Date(b);
        // console.log("diffMs: ", diffMs);
        return Math.round(diffMs / MS);
    }

    // setTimeout(() => window.open("/stats", "_self"), 5000);

    Chart.register(ChartDataLabels);
    return (
        <div className={css.graph}>
            <div>
                <h1 className={css.graphTitle}>Bières commandées</h1>
                <div>
                    {Object.keys(data).length > 0 ? <Line options={options} data={data} plugins={plugin} /> : null}
                </div>
            </div>
        </div>
    );
};

export default Graph;

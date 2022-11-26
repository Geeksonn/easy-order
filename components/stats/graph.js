import React from 'react';

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
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
                suggestedMax: 15,
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

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        initializeGraph();
    }, [orders.length]);

    const initializeGraph = () => {

        orders.forEach((order) => {
            const orderDate = new Date(order.date);
            const orderMinutes = orderDate.getMinutes < 30 ? 0 : 30;
            const key = orderDate.getHours() + ':' + orderMinutes;

            ordersMap.set(key, (ordersMap.has(key) ? ordersMap.get(key) : 0) + order.items.length);
        });
        
        setData({
            labels: Array.from(ordersMap.keys()),
            datasets: [
                {
                    label: 'Consommations',
                    backgroundColor: 'rgb(255,255,255)',
                    borderWidth: 3,
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    borderColor: 'rgb(230,94,68)',
                    data: Array.from(ordersMap.values()),
                },
            ],
        });
    };

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

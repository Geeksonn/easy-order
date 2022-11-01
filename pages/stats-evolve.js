// ./components/LineChart.js

import React, {useEffect} from 'react';
import Chart from "chart.js/auto";
import {Line, Bar} from "react-chartjs-2";
import {listOrders} from "@lib/orders/orders";


const StatsEvolution = () => {

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

    const commandes = new Map();
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        initializeGraph()
    }, [JSON.stringify(data)]);


    const initializeGraph = async () => {
        const orders = await listOrders();
        console.log("orders completed:", orders);
        orders.map(order => order.items.forEach(item => addToMap(item.name)));
        const labels = Array.from(commandes.keys());
        console.log("orders:", orders.length);

        //On trie celon le nombre de commandes
        const orderdedCommandes = new Map([...commandes.entries()].sort((a, b) => b[1] - a[1]));
        console.log("commandes:", Array.from(orderdedCommandes.values()));
        setData({
            labels: labels,
            datasets: [
                {
                    label: "Consommations",
                    backgroundColor:
                    // ['rgb(0, 67, 53)',
                    // 'rgb(238, 164, 200)',
                        'rgb(246, 160, 0)',
                    // ["rgb(230,94,68)"],
                    borderWidth: 3,
                    borderColor: "rgb(0,67,53)",
                    data: Array.from(orderdedCommandes.values()),
                },
            ],
        });
    }

    const addToMap = (name) => {
        commandes.set(name, (commandes.has(name) ? commandes.get(name) : 0) + 1);
    }


     // setTimeout(() => window.open("/stats", "_self"), 5000);

    return (
        <div>
            Page stats evolve
            {Object.keys(data).length > 0 ?
                <Line data={data} plugins={plugin}/>
                : null}

        </div>
    );


};

export default StatsEvolution;
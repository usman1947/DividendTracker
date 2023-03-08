import React from 'react';
import { useGetAllHoldingsQuery } from 'services/api'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { generateUniqueRandomColors } from 'util/Utility';

ChartJS.register(ArcElement, Tooltip, Legend);

const DiversificationChart = () => {
    const holdings = useGetAllHoldingsQuery()?.data
    const sectors = holdings?.reduce((acc, { sector }) => {
        acc[sector] = (acc[sector] || 0) + 1;
        return acc;
    }, {});

    const uniqueColors = generateUniqueRandomColors(holdings?.length);

    return (
        sectors &&
        <Pie
        options={{
            plugins: {
                legend: {
                  display: false
                }
            },
        }}
        data={{
            labels: Object.keys(sectors),
            datasets: [{
              data: Object.values(sectors),
              borderWidth: 1,
              backgroundColor: uniqueColors
            }],
        }}
        />
    )
}




export default DiversificationChart
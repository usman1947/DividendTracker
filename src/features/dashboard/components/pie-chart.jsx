import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { generateUniqueRandomColors, isNullOrEmpty } from 'util/utility'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ labels, values, legendConfig }) => {
    const uniqueColors = generateUniqueRandomColors(values?.length)
    return (
        !isNullOrEmpty(values) && (
            <Pie
                options={{
                    plugins: {
                        legend: legendConfig,
                    },
                }}
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: values,
                            borderWidth: 1,
                            backgroundColor: uniqueColors,
                        },
                    ],
                }}
            />
        )
    )
}

export default PieChart

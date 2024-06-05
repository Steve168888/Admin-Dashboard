"use client"
import { useRef, useEffect } from "react"
import { Chart } from "chart.js/auto"
import styles from '@/app/ui/dashboard/summary/chart2/chart2.module.css'

const Chart2 = () => {

    const chartRef = useRef()

    useEffect(() => {
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }
            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "doughnut",
                data: {
                    labels: ["John", "Jane", "Doe", "res", "halo"],
                    datasets: [
                        {
                            label: "Info",
                            data: [34,64,23, 45, 88],
                            backgroundColor: [
                                "rgb(255, 99, 132, 0.4)",
                                "rgb(255, 159, 64, 0.4)",
                                "rgb(255, 205, 86, 0.4)",
                                "rgb(75, 192, 192, 0.4)",
                                "rgb(54, 162, 235, 0.4)",
                                "rgb(153, 102, 255, 0.4)",
                                "rgb(201, 203, 207, 0.4)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                    options: {
                        //responsive: true
                        scales: {
                            x: {
                                type: "category"
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
            });

            chartRef.current.chart = newChart
        }
    }, [])
    return(
        <div>
            <div className={styles.chartCanvas}>
                <canvas ref={chartRef}/>
            </div>
        </div>
    )
}

export default Chart2
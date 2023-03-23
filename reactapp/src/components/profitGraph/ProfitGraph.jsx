import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './profitGraph.css';

function ProfitGraph() {
  const chartRef = useRef(null);

  const data = {
    labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01'],
    datasets: [
      {
        label: 'Profit',
        data: [200, 300, 250, 350, 500],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Profit ($)',
        },
      },
    },
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
    return () => {
      chart.destroy();
    };
  }, [data, options]);

  return (
    <div className="profit-graph">
      <canvas ref={chartRef} />
    </div>
  );
}

export default ProfitGraph;

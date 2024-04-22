import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [eventData, setEventData] = useState({
    labels: [],
    datasets: []
  });

  const [timeData, setTimeData] = useState([]);
  const [maxTimePage, setMaxTimePage] = useState('');
  const [maxTime, setMaxTime] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/api/events-data')
      .then(response => response.json())
      .then(data => {
        const events = data.map(event => event.page);
        const counts = events.reduce((acc, e) => ({ ...acc, [e]: (acc[e] || 0) + 1 }), {});
        setEventData({
          labels: Object.keys(counts),
          datasets: [{
            label: 'Page Clicks',
            data: Object.values(counts),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }]
        });
      });

    fetch('http://localhost:3001/api/time-data')
      .then(response => response.json())
      .then(data => {
        const totalTimeByPage = data.reduce((acc, item) => {
          acc[item.page] = (acc[item.page] || 0) + item.duration;
          return acc;
        }, {});

        setTimeData(Object.entries(totalTimeByPage).map(([page, duration]) => ({ page, duration })));

        const maxPage = Object.keys(totalTimeByPage).reduce((a, b) => totalTimeByPage[a] > totalTimeByPage[b] ? a : b, '');
        setMaxTimePage(maxPage);
        setMaxTime(totalTimeByPage[maxPage]);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Bar data={eventData} options={{ responsive: true }} />
      <h3>Time Spent on Pages</h3>
      {timeData.length > 0 ? (
        <ul>
          {timeData.map(({ page, duration }) => (
            <li key={page}>{page}: {duration} ms {page === maxTimePage ? `(Maximum: ${maxTime} ms)` : ""}</li>
          ))}
        </ul>
      ) : (
        <p>No time data available.</p>
      )}
    </div>
  );
}

export default Dashboard;

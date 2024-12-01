import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const Growth = () => {
  const [overview, setOverview] = useState({
    totalProduct: 0,
    todaySell: 0,
    yesterdaySell: 0,
    totalSell: 0,
    productReserved: 0,
    stockIssues: 0,
  });
  const [pieData, setPieData] = useState([0, 0, 0, 0]);
  const [radarData, setRadarData] = useState([
    { name: 'Sales', data: [0, 0, 0, 0, 0, 0] },
    { name: 'Marketing', data: [0, 0, 0, 0, 0, 0] }
  ]);

  // Fetch overview data
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/inventory/overview.php');
        const data = response.data;

        // Check if data is valid
        if (data) {
          setOverview(data);

          // Update pie and radar chart data with fetched data
          setPieData([
            data.totalProduct || 0,
            data.todaySell || 0,
            data.yesterdaySell || 0,
            data.totalSell || 0
          ]);

          setRadarData([
            { name: 'Sales', data: [
              data.totalSell || 0,
              data.todaySell || 0,
              data.yesterdaySell || 0,
              data.productReserved || 0,
              data.stockIssues || 0
            ]},
            { name: 'Marketing', data: [
              (data.totalSell || 0) * 0.8,
              (data.todaySell || 0) * 0.8,
              (data.yesterdaySell || 0) * 0.8,
              (data.productReserved || 0) * 0.8,
              (data.stockIssues || 0) * 0.8
            ]}
          ]);
        }
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchOverview();
  }, []);

  // Chart configurations
  const pieOptions = {
    chart: { type: 'pie' },
    labels: ['Total Product', 'Today Sell', 'Yesterday Sell', 'Total Sell'],
    colors: ['#FF4560', '#00E396', '#008FFB', '#FF9800'],
    legend: { position: 'bottom' },
    title: { text: 'Sales Distribution', style: { fontSize: '16px', fontWeight: 'bold' } },
    tooltip: { enabled: true }
  };

  const radarOptions = {
    chart: { type: 'radar' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yaxis: { tickAmount: 5, labels: { formatter: (val) => `${val}%` } },
    colors: ['#FF4560', '#00E396'],
    title: { text: 'Performance Metrics', style: { fontSize: '16px', fontWeight: 'bold' } },
    markers: { size: 4 },
    tooltip: { enabled: true }
  };

  const revenueCards = [
    {
      isMoney: false,
      number: overview.totalProduct,
      percentage: (overview.totalProduct * 0.11).toFixed(2),
      upOrDown: "down",
      color: "red",
      title: "Orders Per Month",
      subTitle: "vs prev month",
    },
    {
      isMoney: false,
      number: overview.todaySell,
      percentage: (overview.todaySell * 0.07).toFixed(2),
      upOrDown: "up",
      color: "green",
      title: "Completed Orders",
      subTitle: "vs prev month",
    },
    {
      isMoney: true,
      number: `${overview.totalSell.toLocaleString()}`,
      percentage: (overview.totalSell * 0.20).toFixed(2),
      upOrDown: "up",
      color: "green",
      title: "Total Revenue",
      subTitle: "vs prev month",
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', height: '100vh', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        {revenueCards.map((card, index) => (
          <div key={index} style={{
            flex: '1 1 30%',
            minWidth: '280px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: card.color || 'black'
                }}>
                  {card.number}
                </div>
                <div>{card.subTitle}</div>
              </div>
              <div style={{
                fontSize: '2rem',
                color: card.upOrDown === 'up' ? 'green' : 'red'
              }}>
                {card.percentage}%
              </div>
            </div>
            <div>{card.title}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <ApexCharts options={pieOptions} series={pieData} type="pie" width="100%" height="320" />
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <ApexCharts options={radarOptions} series={radarData} type="radar" width="100%" height="320" />
        </div>
        {/* Additional charts can be added here */}
      </div>
    </div>
  );
};

export default Growth;

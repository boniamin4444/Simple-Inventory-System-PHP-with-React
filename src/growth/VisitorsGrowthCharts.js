import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const VisitorGrowthCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/growth/fetch_visitor_growth.php');
        setData(response.data.visitors || []);
      } catch (error) {
        console.error('Error fetching visitor growth data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      id: "visitor-growth",
      type: "line",
      toolbar: {
        show: true,
      },
    },
    colors: ["#8A2BE2", "#00CED1"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: '14px',
      },
    },
    xaxis: {
      categories: data.map(d => d.date || ""),
      labels: {
        style: {
          colors: '#fff',
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
        style: {
          color: '#fff',
        },
      },
    },
    title: {
      text: "Visitor Growth",
      style: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#666', borderRadius: '10px', height: '400px' }}>
      <ApexCharts 
        options={options} 
        series={[{ name: "Visitors", data: data.map(d => d.visitor_count || 0) }]} 
        type="line" 
        width="100%" 
        height="100%" 
      />
    </div>
  );
};

export default VisitorGrowthCharts;

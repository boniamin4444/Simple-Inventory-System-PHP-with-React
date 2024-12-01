import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const SalesGrowthCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/growth/fetch_sales_growth.php');
        setData(response.data.sales || []);
      } catch (error) {
        console.error('Error fetching sales growth data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      id: "sales-growth",
      type: "line",
      toolbar: {
        show: true,
      },
    },
    colors: ["#FF4500", "#7FFF00"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: '14px',
      },
    },
    xaxis: {
      categories: data.map(d => d.month || ""),
      labels: {
        style: {
          colors: '#fff',
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Total Sales',
        style: {
          color: '#fff',
        },
      },
    },
    title: {
      text: "Sales Growth",
      style: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#555', borderRadius: '10px', height: '400px' }}>
      <ApexCharts 
        options={options} 
        series={[{ name: "Sales", data: data.map(d => d.total_sales || 0) }]} 
        type="line" 
        width="100%" 
        height="100%" 
      />
    </div>
  );
};

export default SalesGrowthCharts;

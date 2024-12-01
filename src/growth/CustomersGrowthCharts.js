import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const CustomersGrowthCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/growth/fetch_customer_growth.php');
        setData(response.data.customers || []);
      } catch (error) {
        console.error('Error fetching customer growth data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      id: "customer-growth",
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    colors: ["#FF6347", "#FFD700"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
      },
    },
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
        text: 'Number of Customers',
        style: {
          color: '#fff',
        },
      },
    },
    title: {
      text: "Customer Growth",
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
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#333', borderRadius: '10px', height: '400px' }}>
      <ApexCharts 
        options={options} 
        series={[{ name: "Customers", data: data.map(d => d.customer_count || 0) }]} 
        type="bar" 
        width="100%" 
        height="100%" 
      />
    </div>
  );
};

export default CustomersGrowthCharts;

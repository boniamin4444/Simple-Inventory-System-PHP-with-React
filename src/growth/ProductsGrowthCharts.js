import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const ProductsGrowthCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/growth/fetch_product_growth.php');
        setData(response.data.products || []);
      } catch (error) {
        console.error('Error fetching product growth data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      id: "product-growth",
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    colors: ["#1E90FF", "#32CD32"],
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
        text: 'Number of Products',
        style: {
          color: '#fff',
        },
      },
    },
    title: {
      text: "Product Growth",
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
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#444', borderRadius: '10px', height: '400px' }}>
      <ApexCharts 
        options={options} 
        series={[{ name: "Products", data: data.map(d => d.product_count || 0) }]} 
        type="bar" 
        width="100%" 
        height="100%" 
      />
    </div>
  );
};

export default ProductsGrowthCharts;

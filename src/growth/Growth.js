import React from "react";
import CustomersGrowthCharts from "./CustomersGrowthCharts";
import ProductsGrowthCharts from "./ProductsGrowthCharts";
import SalesGrowthCharts from "./SalesGrowthCharts";
import VisitorsGrowthCharts from "./VisitorsGrowthCharts";
import './Growth.css'; // Import your custom CSS file

export default function Growth() {
  return (
    <div className="growth-container">
      <div className="chart-item">
        <CustomersGrowthCharts />
      </div>
      <div className="chart-item">
        <ProductsGrowthCharts />
      </div>
      <div className="chart-item">
        <SalesGrowthCharts />
      </div>
      <div className="chart-item">
        <VisitorsGrowthCharts />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Series,
  Label,
  Connector,
  Tooltip,
} from 'devextreme-react/pie-chart';

const RevenueChart = ({ chartTransactionData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const revenueData = chartTransactionData.filter((transaction) => transaction.transaction_type === 'Revenue');
    const revenueChartData = revenueData.map((transaction) => ({
      amount: transaction.amount,
      category: transaction.category,
    }));
    setChartData(revenueChartData);
  }, [chartTransactionData]);
  console.log('Revenue chartData', chartData);

  return (
    <PieChart
      title="Revenue"
      dataSource={chartData}
      type="doughnut"
      innerRadius={0.5}
      size={{ width: 500 }}
    >
      <Series
        argumentField="category"
        valueField="amount"
      >
        <Label
          visible
          position="columns"
          customizeText={(point) => `${point.argumentText}: $${point.valueText}`}
        >
          <Connector visible />
        </Label>
      </Series>
      <Tooltip
        enabled
        contentTemplate={(point) => `${point.argumentText}: $${point.valueText}`}
      />
    </PieChart>
  );
};

RevenueChart.propTypes = {
  chartTransactionData: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    category: PropTypes.string,
  })).isRequired,
};

export default RevenueChart;

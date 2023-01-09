import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Series,
  Label,
  Connector,
  Tooltip,
} from 'devextreme-react/pie-chart';

const ExpenseChartDashboard = ({ chartTransactionData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const expenseData = chartTransactionData.filter((transaction) => transaction.transaction_type === 'Expense');
    const expenseChartData = expenseData.map((transaction) => ({
      amount: transaction.amount,
      category: transaction.category,
    }));
    setChartData(expenseChartData);
  }, [chartTransactionData]);
  console.log('Expense chartData', chartData);

  return (
    <PieChart
      title="Expense"
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

ExpenseChartDashboard.propTypes = {
  chartTransactionData: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    category: PropTypes.string,
  })).isRequired,
};

export default ExpenseChartDashboard;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Series,
  Label,
  Connector,
  Tooltip,
} from 'devextreme-react/pie-chart';

const ExpenseChart = ({ chartTransactionData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const expenseData = [...chartTransactionData]
      .filter((transaction) => transaction.transaction_type === 'Expense');
    // Function groupBy from https:
    // https://learnwithparam.com/blog/how-to-group-by-array-of-objects-using-a-key/
    /* eslint-disable-next-line */
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue,
        );
        return result;
      }, {}); // empty object is the initial value for result object
    };

    const expenseGroupByCategory = groupBy(expenseData, 'expense_category_name');

    const expenseGroupByCategorySum = Object.keys(expenseGroupByCategory).map((key) => {
      const sum = expenseGroupByCategory[key].reduce((a, b) => a + b.amount, 0);
      return { category: key, amount: sum };
    });

    setChartData(expenseGroupByCategorySum);
  }, [chartTransactionData]);
  // console.log('Expense chartData', chartData);

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

ExpenseChart.propTypes = {
  chartTransactionData: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    expense_category_name: PropTypes.string,
  })).isRequired,
};

export default ExpenseChart;

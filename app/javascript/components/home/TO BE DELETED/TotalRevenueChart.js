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
    // Sorting by category that works:
    // const revenueData = [...chartTransactionData]
    //   .filter((transaction) => transaction.transaction_type === 'Revenue')
    //   .sort((a, b) => (a.category > b.category ? 1 : -1));

    const revenueData = [...chartTransactionData]
      .filter((transaction) => transaction.transaction_type === 'Revenue');
    // Function groupBy from https:
    // https://learnwithparam.com/blog/how-to-group-by-array-of-objects-using-a-key/
    /* eslint-disable-next-line */
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array.
        // Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue,
        );
        // Return the current iteration `result` value,
        // this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
    };

    const revenueGroupByCategory = groupBy(revenueData, 'category');

    // console.log('Revenue data Group by Category', revenueGroupByCategory);

    const revenueGroupByCategorySum = Object.keys(revenueGroupByCategory).map((key) => {
      const sum = revenueGroupByCategory[key].reduce((a, b) => a + b.amount, 0);
      return { category: key, amount: sum };
    });
    // console.log('Revenue data Group by Category Sum', revenueGroupByCategorySum);

    // const revenueChartData = revenueData.map((transaction) => ({
    //   amount: transaction.amount,
    //   category: transaction.category,
    // }));

    setChartData(revenueGroupByCategorySum);
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
  Tooltip,
} from 'devextreme-react/chart';

const ProfitLossBarChartMonthly = ({ revenueList, expenseList }) => {
  const [chartData, setChartData] = useState([]);

  function subtractMonths(date, months) {
    date.setMonth(date.getMonth() + 1 - months);
    return date;
  }

  // The chart doesn't like this formatter, so I'm commenting it out for now.
  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   // These options are needed to round to whole numbers if that's what you want.
  //   // minimumFractionDigits: 0, // (this suffices for whole numbers,
  //   // but will print 2500.10 as $2,500.1)
  //   // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  // });

  useEffect(() => {
    if (revenueList.length === 0 || expenseList.length === 0) {
      return;
    }

    const charts = [];
    charts.length = 0;
    for (let i = 6; i > 0; i -= 1) {
      const date = new Date();
      const thisMonth = subtractMonths(date, i);
      const thisMonthName = thisMonth.toLocaleString('en-US', { month: 'long' });
      const thisYear = thisMonth.getFullYear();

      const revenueTotal = revenueList.reduce((acc, curr) => {
        if (curr.invoice_date === null) {
          return acc;
        }
        const invDateStr = curr.invoice_date;
        const [year, month, day] = invDateStr.split('-');
        const invDate = new Date(+year, month - 1, +day);
        if (invDate.getMonth() + 1 === thisMonth.getMonth() + 1
          && invDate.getFullYear() === thisYear) {
          return acc + curr.amount;
        }
        return acc;
      }, 0);

      const expenseTotal = expenseList.reduce((acc, curr) => {
        if (curr.invoice_date === null) {
          return acc;
        }
        const invDateStr = curr.invoice_date;
        const [year, month, day] = invDateStr.split('-');
        const invDate = new Date(+year, month - 1, +day);
        if (invDate.getMonth() + 1 === thisMonth.getMonth() + 1
          && invDate.getFullYear() === thisYear) {
          return acc + curr.amount;
        }
        return acc;
      }, 0);

      const profitLoss = revenueTotal - expenseTotal;
      charts.push({
        title: `${thisMonthName} ${thisYear}`,
        revenues: revenueTotal,
        expenses: expenseTotal,
        profitLoss,
      });
    }
    setChartData(charts);
  }, [revenueList, expenseList]);

  return (
    <Chart
      id="chart"
      title="Revenues, Expenses & Profit/Loss Past 6 Months"
      dataSource={chartData}
      // onPointClick={onPointClick}
    >
      <Tooltip enabled />
      <CommonSeriesSettings
        argumentField="title"
        type="bar"
        hoverMode="allArgumentPoints"
        selectionMode="allArgumentPoints"
      >
        <Label visible>
          {/* <Format type="currency" precision={0} /> */}
          <Format type="currency" precision={2} />
        </Label>
      </CommonSeriesSettings>
      <Series
        argumentField="title"
        valueField="revenues"
        name="Revenues"
        // barWidth={20}
      />
      <Series
        valueField="expenses"
        name="Expenses"
        // barWidth={20}
      />
      <Series
        valueField="profitLoss"
        name="Profit/Loss"
        // barWidth={20}
      />
      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      <Export enabled printingEnabled={false} />
    </Chart>
  );
};

ProfitLossBarChartMonthly.propTypes = {
  revenueList: PropTypes.arrayOf(
    PropTypes.shape({
      invoice_date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  expenseList: PropTypes.arrayOf(
    PropTypes.shape({
      invoice_date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ProfitLossBarChartMonthly;

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

const ProfitLossBarChart = ({ revenueTotal, expenseTotal }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const profitLoss = revenueTotal - expenseTotal;
    setChartData([
      {
        total: '',
        revenues: revenueTotal,
        expenses: expenseTotal,
        profitLoss,
      },
    ]);
  }, [revenueTotal, expenseTotal]);

  // const onPointClick = (e) => {
  //   e.target.select();
  // };

  return (
    <Chart
      id="chart"
      title="Revenues, Expenses & Profit/Loss Over Time"
      dataSource={chartData}
      // onPointClick={onPointClick}
    >
      <Tooltip enabled />
      <CommonSeriesSettings
        argumentField="total"
        type="bar"
        hoverMode="allArgumentPoints"
        selectionMode="allArgumentPoints"
      >
        <Label visible>
          {/* <Format type="fixedPoint" precision={0} /> */}
          <Format type="currency" precision={2} />
        </Label>
      </CommonSeriesSettings>
      <Series
        argumentField="total"
        valueField="revenues"
        name="Revenues"
        barWidth={60}
      />
      <Series
        valueField="expenses"
        name="Expenses"
        barWidth={60}
      />
      <Series
        valueField="profitLoss"
        name="Profit/Loss"
        barWidth={60}
      />
      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      <Export enabled printingEnabled={false} />
    </Chart>
  );
};

ProfitLossBarChart.propTypes = {
  revenueTotal: PropTypes.number.isRequired,
  expenseTotal: PropTypes.number.isRequired,
};

export default ProfitLossBarChart;

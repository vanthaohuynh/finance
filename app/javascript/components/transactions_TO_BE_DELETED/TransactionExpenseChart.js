import React, { useSate } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const apiExpenseEndpoint = '/api/v1/expenses';

const data = [
  { region: 'Asia', val: 4119626293 },
  { region: 'Africa', val: 1012956064 },
  { region: 'Northern America', val: 344124520 },
  { region: 'Latin America and the Caribbean', val: 590946440 },
  { region: 'Europe', val: 727082222 },
  { region: 'Oceania', val: 35104756 },
];

const TransactionExpenseChart = () => {
  const [chartData, setChartData] = React.useState(data);

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     data,
  //   };
  // }

  // render() {
  //   const { data: chartData } = this.state;

  return (
    <Paper>
      <Chart
        data={chartData}
        height={250}
      >
        <PieSeries
          valueField="val"
          argumentField="region"
          innerRadius={0.6}
        />
        <Title
          text="Expense"
        />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default TransactionExpenseChart;
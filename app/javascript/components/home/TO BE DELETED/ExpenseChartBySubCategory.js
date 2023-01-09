import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Series,
  Label,
  Connector,
  Tooltip,
  Export,
} from 'devextreme-react/pie-chart';
// import Typography from '@mui/material/Typography';
import { info } from '../../helpers/notifications';

const ExpenseChartBySubCategory = ({ selectedExpenseList }) => {
  const [chartData, setChartData] = useState([]);
  const [expenseCategoryName, setExpenseCategoryName] = useState([]);
  console.log('expense_category_name:', expenseCategoryName);
  console.log('ExpenseChartBySubCategory selectedExpenseList', selectedExpenseList);

  useEffect(() => {
    if (selectedExpenseList.length === 0) {
      setChartData([]);
      setExpenseCategoryName('');
      return;
    }
    setExpenseCategoryName(selectedExpenseList[0].expense_category_name);
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

    const expenseGroupByCategory = groupBy(selectedExpenseList, 'expense_sub_category_name');

    const expenseGroupByCategorySum = Object.keys(expenseGroupByCategory).map((key) => {
      const sum = expenseGroupByCategory[key].reduce((a, b) => a + b.amount, 0);
      return { expense_sub_category_name: key, amount: sum };
    });

    setChartData(expenseGroupByCategorySum);
  }, [selectedExpenseList]);

  console.log('Expense chartData', chartData);

  return (
    <div>
      <PieChart
        // title={`Expense by Category for ${thisMonthName} ${thisYear}`}
        title={`Sub Category for ${expenseCategoryName}`}
        // title="Expense by Sub Category"
        dataSource={chartData}
        type="doughnut"
        innerRadius={0.5}
        size={{ width: 600 }}
      >
        <Series
          argumentField="expense_sub_category_name"
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
        <Export enabled />
      </PieChart>
    </div>
  );
};

ExpenseChartBySubCategory.propTypes = {
  selectedExpenseList: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    expense_category_name: PropTypes.string,
    expense_sub_category_name: PropTypes.string,
    expense_category_id: PropTypes.number,
  })).isRequired,
};

export default ExpenseChartBySubCategory;

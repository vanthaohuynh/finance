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
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { info } from '../../helpers/notifications';

const ExpenseChartByCategory = ({ expenseList, getExpenseListForSelectedMonth }) => {
  const [chartData, setChartData] = useState([]);
  const [thisMonth, setThisMonth] = useState(new Date().getMonth() + 1);
  const [thisYear, setThisYear] = useState(new Date().getFullYear());
  const [thisMonthName, setThisMonthName] = useState('');

  useEffect(() => {
    setThisMonthName(new Date(thisYear, thisMonth, 0).toLocaleString('default', { month: 'long' }));
    const expenseData = [...expenseList]
      .filter((expense) => expense.invoice_date !== null)
      .filter((expense) => {
        const expenseDate = new Date(expense.invoice_date.replace(/-/g, '/'));
        return expenseDate.getMonth() + 1 === thisMonth && expenseDate.getFullYear() === thisYear;
      });
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

    // console.log('ExpenseData', expenseData);
    const expenseGroupByCategory = groupBy(expenseData, 'expense_category_name');
    // console.log('ExpenseGroupByCategory', expenseGroupByCategory);

    const expenseGroupByCategorySum = Object.keys(expenseGroupByCategory).map((key) => {
      const sum = expenseGroupByCategory[key].reduce((a, b) => a + b.amount, 0);
      return {
        expense_category_name: key,
        amount: sum,
        expense_category_id: expenseGroupByCategory[key][0].expense_category_id,
      };
    });
    // console.log('ExpenseGroupByCategorySum', expenseGroupByCategorySum);

    const expenseGroupByCategorySumSorted = expenseGroupByCategorySum
      .sort((a, b) => b.amount - a.amount);
    // console.log('ExpenseGroupByCategorySumSorted', expenseGroupByCategorySumSorted);
    setChartData(expenseGroupByCategorySum);
  }, [expenseList, thisMonth]);

  // console.log('Expense chartData', chartData);

  // const onPointClick = (e) => {
  //   const point = e.target;
  //   if (point.isSelected()) {
  //     point.clearSelection();
  //     getExpenseListById(null);
  //   } else {
  //     point.select();
  //     const expenseCategoryID = e.target.data.expense_category_id;
  //     getExpenseListById(expenseCategoryID, thisMonth, thisYear);
  //   }
  // };

  const getPreviousMonth = () => {
    if (thisMonth === 1) {
      setThisMonth(12);
      setThisYear(thisYear - 1);
      getExpenseListForSelectedMonth(expenseList, 12, thisYear - 1);
    } else {
      setThisMonth(thisMonth - 1);
      getExpenseListForSelectedMonth(expenseList, thisMonth - 1, thisYear);
    }
  };

  const getNextMonth = () => {
    if (thisMonth === 12) {
      setThisMonth(1);
      setThisYear(thisYear + 1);
      getExpenseListForSelectedMonth(expenseList, 1, thisYear + 1);
    } else {
      setThisMonth(thisMonth + 1);
      getExpenseListForSelectedMonth(expenseList, thisMonth + 1, thisYear);
    }
  };

  return (
    <div>
      <Button variant="text" onClick={getPreviousMonth}>
        Previous Month
      </Button>
      <Button variant="text" onClick={getNextMonth}>
        Next Month
      </Button>
      <PieChart
        title={`Expense by Category for ${thisMonthName} ${thisYear}`}
        dataSource={chartData}
        type="doughnut"
        innerRadius={0.5}
        size={{ width: 600 }}
        // onPointClick={onPointClick}
      >
        <Series
          argumentField="expense_category_name"
          valueField="amount"
        >
          <Label
            visible
            position="columns"
            // customizeText={(point) => `${point.argumentText}: $${point.valueText}`}
            // customizeText={(point) => `${point.argumentText}:
            // ${Number(point.valueText).toLocaleString('en-US', {
            //   style: 'currency', currency: 'USD', minimumFractionDigits: 0,
            // maximumFractionDigits: 0,
            // })}`}
            customizeText={(point) => `${point.argumentText}: ${Number(point.valueText).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
          >
            <Connector visible />
          </Label>
        </Series>
        <Tooltip
          enabled
          // contentTemplate={(point) => `${point.argumentText}: $${point.valueText}`}
          // contentTemplate={(point) => `${point.argumentText}:
          // ${Number(point.valueText).toLocaleString('en-US', {
          //   style: 'currency', currency: 'USD',
          // minimumFractionDigits: 0, maximumFractionDigits: 0,
          // })}`}
          contentTemplate={(point) => `${point.argumentText}: ${Number(point.valueText).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
        />
        <Export enabled printingEnabled={false} />
      </PieChart>
    </div>
  );
};

ExpenseChartByCategory.propTypes = {
  expenseList: PropTypes.arrayOf(PropTypes.shape({
    account_num: PropTypes.string,
    amount: PropTypes.number,
    invoice_date: PropTypes.string,
    expense_category_name: PropTypes.string,
    expense_sub_category_name: PropTypes.string,
    expense_category_id: PropTypes.number,
  })).isRequired,
  getExpenseListForSelectedMonth: PropTypes.func.isRequired,
};

export default ExpenseChartByCategory;

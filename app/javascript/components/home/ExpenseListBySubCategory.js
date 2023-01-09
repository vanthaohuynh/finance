import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
// import nestedGroupby from 'nested-groupby';

const ExpenseListBySubCategory = ({ expenseListForSelectedMonth }) => {
  // console.log('*********************  expenseListForSelectedMonth: ', expenseListForSelectedMonth);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (expenseListForSelectedMonth.length === 0) {
      setListData([]);
      return;
    }
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

    const expenseGroupByCategory = groupBy(expenseListForSelectedMonth, 'expense_category_name');

    // console.log('expenseGroupByCategory: ', expenseGroupByCategory);
    // Return an array of object by Category based on the above expenseGroupByCategory,
    // for each category, groupyby the sub category and sum the amount.
    const expenseGroupByCategoryAndSub = Object.keys(expenseGroupByCategory).map((key) => {
      const sumCategory = expenseGroupByCategory[key].reduce((a, b) => a + b.amount, 0);
      const expenseGroupBySubCategory = groupBy(expenseGroupByCategory[key], 'expense_sub_category_name');
      const expenseGroupBySubCategorySum = Object.keys(expenseGroupBySubCategory).map((subKey) => {
        const sum = expenseGroupBySubCategory[subKey].reduce((a, b) => a + b.amount, 0);
        return {
          expense_sub_category_id: expenseGroupBySubCategory[subKey][0].expense_sub_category_id,
          expense_sub_category_name: subKey,
          expense_sub_category_code: expenseGroupBySubCategory[subKey][0].expense_sub_category_code,
          total_sub_category_amount: sum,
        };
      });
      return {
        expense_category_name: key,
        total_category_amount: sumCategory,
        expense_sub_category: expenseGroupBySubCategorySum,
        expense_category_id: expenseGroupByCategory[key][0].expense_category_id,
      };
    });

    // sort the array by total_category_amount
    expenseGroupByCategoryAndSub.sort((a, b) => b.total_category_amount - a.total_category_amount);

    // console.log('expenseGroupByCategoryAndSub: ', expenseGroupByCategoryAndSub);

    setListData(expenseGroupByCategoryAndSub);
  }, [expenseListForSelectedMonth]);

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 'regular',
          fontSize: '1.2rem',
          paddingBottom: 0,
          paddingTop: 2,
        }}
      >
        Expense Sub Categories
      </Typography>
      <div>
        {listData.map((expenseCategory) => {
          // const labelId = `nested-list-subheader-${expenseCategory.expense_category_name}`;
          const expenseCatId = expenseCategory.expense_category_id;
          return (
            <List
              className="list-horizontal-display"
              sx={{
                width: '100%',
                maxWidth: 300,
                bgcolor: 'background.paper',
                fontStyle: 'bold',
              }}
              dense
              // paddingBottom={0}
            >
              {`
              ${expenseCategory.expense_category_name}:
              ${expenseCategory.total_category_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              `}
              {expenseCategory.expense_sub_category.map((item) => {
                const labelId2 = `nested-list-subheader-${item.expense_sub_category_name}`;
                return (
                  <ListItem
                    id={labelId2}
                    key={`${expenseCatId}-${item.expense_sub_category_id}`}
                    sx={{
                      paddingLeft: 4,
                      fontSize: '0.8rem',
                      fontStyle: 'bold',
                    }}
                    // fontWeight="bold"
                    dense
                    // divider
                  >
                    <ListItemText
                      id={labelId2}
                      sx={{
                        fontSize: '0.5rem',
                        margin: 0,
                      }}
                      primary={
                        `
                        ${item.expense_sub_category_name}:
                        ${item.total_sub_category_amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        `
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          );
        })}
      </div>
    </>
  );
};

ExpenseListBySubCategory.propTypes = {
  expenseListForSelectedMonth: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    expense_category_name: PropTypes.string,
    expense_sub_category_name: PropTypes.string,
    expense_category_id: PropTypes.number,
  })).isRequired,
};

export default ExpenseListBySubCategory;

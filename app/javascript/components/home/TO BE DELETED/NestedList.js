import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const NestedList = () => {
  const expenseCategoryList = [
    {
      key: 'Materials & Supplies: Lab',
      items: [
        { name: 'Chemicals', amount: 10000 },
        { name: 'Drug Supplies', amount: 20000 },
        { name: 'Dry Ice', amount: 30000 },
      ],
    }, {
      key: 'Travel & Convention',
      items: [
        { name: 'Registration Fees', amount: 10000 },
        { name: 'Airfare, Hotel, Transport (Non Local)', amount: 20000 },
        { name: 'Local Travel/ Parking/Taxis', amount: 30000 },
        { name: 'Local Travel/ Parking/Taxis 2', amount: 30000 },
      ],
    },
    {
      key: 'Materials & Supplies: Lab',
      items: [
        { name: 'Chemicals', amount: 10000 },
        { name: 'Drug Supplies', amount: 20000 },
        { name: 'Dry Ice', amount: 30000 },
      ],
    }, {
      key: 'Travel & Convention',
      items: [
        { name: 'Registration Fees', amount: 10000 },
        { name: 'Airfare, Hotel, Transport (Non Local)', amount: 20000 },
        { name: 'Local Travel/ Parking/Taxis', amount: 30000 },
      ],
    },
  ];

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
        {expenseCategoryList.map((expenseCategory) => {
          const labelId = `nested-list-subheader-${expenseCategory.key}`;
          return (
            <List
              className="list-horizontal-display"
              sx={{
                width: '100%',
                maxWidth: 300,
                bgcolor: 'background.paper',
              }}
              dense
              paddingBottom={0}
            >
              {expenseCategory.key}
              {expenseCategory.items.map((item) => {
                const labelId2 = `nested-list-subheader-${item.name}`;
                return (
                  <ListItem
                    id={labelId}
                    key={`section-${expenseCategory.key}`}
                    sx={{
                      paddingLeft: 4,
                      fontSize: '0.8rem',
                    }}
                    fontWeight="bold"
                    dense
                    divider
                    alignItemsFlexStart
                  >
                    <ListItemText
                      id={labelId2}
                      sx={{
                        fontSize: '0.5rem',
                        margin: 0,
                      }}
                      primary={`${item.name}: $${item.amount}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          );
        })}
      </div>
      {/* This is not using UL LI, not working */}
      {/* <List
        // className="list-horizontal-display"
        sx={{
          width: '100%',
          maxWidth: 300,
          bgcolor: 'background.paper',
        }}
        dense
      >
        {expenseCategoryList.map((expenseCategory) => {
          const labelId = `nested-list-subheader-${expenseCategory.key}`;
          return (
            <ListItem
              id={labelId}
              key={`section-${expenseCategory.key}`}
              sx={{
                paddingLeft: 2,
                fontSize: '0.8rem',
              }}
              fontWeight="bold"
              dense
              divider
            >
              {expenseCategory.key}
              {expenseCategory.items.map((item) => {
                const labelId2 = `nested-list-subheader-${item.name}`;
                return (
                  <ListItemText
                    id={labelId2}
                    sx={{
                      fontSize: '0.5rem',
                      margin: 0,
                    }}
                    primary={`${item.name}: $${item.amount}`}
                  />
                );
              })}
            </ListItem>
          );
        })}
      </List> */}
      {/* This is using UL and LI workiing fine */}
      {/* <List
        className="list-horizontal-display"
        sx={{
          width: '100%',
          maxWidth: 300,
          bgcolor: 'background.paper',
        }}
        dense
      >
        {expenseCategoryList.map((expenseCategory) => (
          <li key={`section-${expenseCategory.key}`}>
            <ul>
              {expenseCategory.key}
              {expenseCategory.items.map((item) => (
                <ListItem
                  sx={{
                    paddingLeft: 2,
                    fontSize: '0.8rem',
                  }}
                  key={`item-${item.name}`}
                  fontWeight="bold"
                  dense
                  divider
                  // gutters
                >
                  <ListItemText
                    sx={{
                      fontSize: '0.5rem',
                      margin: 0,
                    }}
                    primary={`${item.name}: $${item.amount}`}
                  />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List> */}
    </>
  );
};

export default NestedList;

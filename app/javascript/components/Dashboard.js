import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
// import {
//   Card,
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   InputLabel,
//   Select,
// } from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Billable from './home/Billable';
// import Billable2 from './home/Billable2';
import Receivable from './home/Receivable';
import RevenuePastThreeYears from './home/RevenuePastThreeYears';
import RevenueCurrentYear from './home/RevenueCurrentYear';
import RevenueCurrentRiYear from './home/RevenueCurrentRiYear';
import ExpenseTransactions from './home/ExpenseTransactions';
import ExpenseCurrentYear from './home/ExpenseCurrentYear';
// import TotalExpenseChart from './home/TotalExpenseChart';
// import TotalRevenueChart from './home/TotalRevenueChart';
import ProfitLossBarChart from './home/ProfitLossBarChart';
import { handleAjaxError } from '../helpers/helpers';
import ProfitLossBarChartMonthly from './home/ProfitLossBarChartMonthly';
import ExpenseChartByCategory from './home/ExpenseChartByCategory';
// import ExpenseChartBySubCategory from './home/ExpenseChartBySubCategory';
// import ExpenseListByCategory from './home/ExpenseListByCategory';
import ExpenseListBySubCategory from './home/ExpenseListBySubCategory';

// import ExpenseChartDashboard from './home/ExpenseChartDashboard';
// import RevenueChartDashboard from './home/RevenueChartDashboard';

const urlValidation = '/validate_token';
const apiBillable = '/api/v1/billable';
const apiReceivable = '/api/v1/receivable';
const apiRevenueTransactions = '/api/v1/revenue_transactions';
const apiRevenuePast3years = '/api/v1/revenue_past3years';
const apiRevenueCurrentYear = '/api/v1/revenue_currentyear';
const apiRevenueCurrentRiYear = '/api/v1/revenue_current_ri_year';
const apiExpenseTransactions = '/api/v1/expense_transactions';
const apiExpenseCurrentYear = '/api/v1/expense_currentyear';
const apiRevenueList = '/api/v1/revenue_list';
const apiExpenseList = '/api/v1/expense_list';
// const apiExpenseSubCategories = '/api/v1/expense_sub_categories';

// Not using these yet
// const apiRevenuePastYear = '/api/v1/revenue_pastyear';
// const apiRevenuePastRiYear = '/api/v1/revenue_past_ri_year';

const Dashboard = ({ token, handleSelectedIndex, handleLogout }) => {
  // const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  // const [user, setUser] = useState({});
  const dataFetchedRef = useRef(false);
  const [billable, setBillable] = useState([]);
  const [receivable, setReceivable] = useState([]);
  const [revenueTransactions, setRevenueTransactions] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [revenuePast3years, setRevenuePast3years] = useState([]);
  const [revenueCurrentYear, setRevenueCurrentYear] = useState([]);
  const [revenueCurrentRiYear, setRevenueCurrentRiYear] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [expenseCurrentYear, setExpenseCurrentYear] = useState([]);
  const [revenueList, setRevenueList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  // const [selectedExpenseList, setSelectedExpenseList] = useState('');
  const [thisMonth, setThisMonth] = useState(new Date().getMonth() + 1);
  const [thisYear, setThisYear] = useState(new Date().getFullYear());
  // const [thisMonthName, setThisMonthName] = useState('');
  const [expenseListForSelectedMonth, setExpenseListForSelectedMonth] = useState([]);
  const navigate = useNavigate();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchBillable = async () => {
    try {
      const response = await axios.get(apiBillable);
      // console.log('Dashboard fetchBillable: ', response);
      if (response.status === 200) {
        setBillable(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchReceivable = async () => {
    try {
      const response = await axios.get(apiReceivable);
      // console.log('Dashboard fetchReceivable: ', response);
      if (response.status === 200) {
        setReceivable(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenueTransactions = async () => {
    try {
      const response = await axios.get(apiRevenueTransactions);
      // console.log('Dashboard RevenueTransactions: ', response);
      if (response.status === 200) {
        setRevenueTransactions(response.data);
        const total = response.data.reduce((acc, cur) => acc + cur.revenue_total, 0);
        // console.log('Dashboard RevenueTransactions total: ', total);
        setRevenueTotal(total);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenuePast3Years = async () => {
    try {
      const response = await axios.get(apiRevenuePast3years);
      // console.log('Dashboard fetchRevenuePast3Years: ', response);
      if (response.status === 200) {
        setRevenuePast3years(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenueCurrentYear = async () => {
    try {
      const response = await axios.get(apiRevenueCurrentYear);
      // console.log('Dashboard apiRevenueCurrentYear: ', response);
      if (response.status === 200) {
        setRevenueCurrentYear(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenueCurrentRiYear = async () => {
    try {
      const response = await axios.get(apiRevenueCurrentRiYear);
      // console.log('Dashboard apiRevenueCurrentRiYear: ', response);
      if (response.status === 200) {
        setRevenueCurrentRiYear(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseTransactions = async () => {
    try {
      const response = await axios.get(apiExpenseTransactions);
      // console.log('Dashboard ExpenseTransactions: ', response);
      if (response.status === 200) {
        setExpenseTransactions(response.data);
        const total = response.data.reduce((acc, cur) => acc + cur.expense_total, 0);
        // console.log('Dashboard ExpenseTransactions total: ', total);
        setExpenseTotal(total);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchExpenseCurrentYear = async () => {
    try {
      const response = await axios.get(apiExpenseCurrentYear);
      // console.log('Dashboard apiExpenseCurrentYear: ', response);
      if (response.status === 200) {
        setExpenseCurrentYear(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const fetchRevenueList = async () => {
    try {
      const response = await axios.get(apiRevenueList);
      // console.log('Dashboard RevenueList: ', response);
      if (response.status === 200) {
        setRevenueList(response.data);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  const getExpenseListForSelectedMonth = (selectedExpenseList, selectedMonth, selectedYear) => {
    // console.log('Dashboard getExpenseListForSelectedMonth: ', selectedExpenseList, selectedMonth, selectedYear);
    const thisExpenseList = selectedExpenseList
      .filter((expense) => expense.invoice_date !== null)
      .filter((expense) => {
        const expenseDate = new Date(expense.invoice_date.replace(/-/g, '/'));
        return expenseDate.getMonth() + 1 === selectedMonth
          && expenseDate.getFullYear() === selectedYear;
      });
    // console.log('Dashboard getExpenseListForSelectedMonth thisExpenseList: ', thisExpenseList);
    setExpenseListForSelectedMonth(thisExpenseList);
  };

  const fetchExpenseList = async () => {
    try {
      const response = await axios.get(apiExpenseList);
      // console.log('Dashboard ExpenseList: ', response);
      if (response.status === 200) {
        setExpenseList(response.data);
        getExpenseListForSelectedMonth(response.data, thisMonth, thisYear);
      }
    } catch (err) {
      handleAjaxError(err);
    }
  };

  // const fetchExpenseSubCategories = async () => {
  //   try {
  //     const response = await axios.get(apiExpenseSubCategories);
  //     console.log('Dashboard ExpenseSub: ', response);
  //     if (response.status === 200) {
  //       setExpenseSubCategories(response.data);
  //     }
  //   } catch (err) {
  //     handleAjaxError(err);
  //   }
  // };

  // const getExpenseListById = (id, thisMonth, thisYear) => {
  //   if (id === null) {
  //     setSelectedExpenseList([]);
  //   } else {
  //     const thisExpenseList = expenseList
  //       .filter((expense) => expense.expense_category_id === id)
  //       .filter((expense) => expense.invoice_date !== null)
  //       .filter((expense) => {
  //         const expenseDate = new Date(expense.invoice_date.replace(/-/g, '/'));
  //         return expenseDate.getMonth() + 1 === thisMonth && expenseDate.getFullYear() === thisYear;
  //       });
  //     setSelectedExpenseList(thisExpenseList);
  //   }
  // };

  const validateToken = async () => {
    try {
      const response = await axios.get(urlValidation);
      if (response.status === 200) {
        fetchBillable();
        fetchReceivable();
        fetchRevenueTransactions();
        fetchRevenuePast3Years();
        fetchRevenueCurrentYear();
        fetchRevenueCurrentRiYear();
        fetchExpenseTransactions();
        fetchExpenseCurrentYear();
        fetchRevenueList();
        fetchExpenseList();
        // fetchExpenseSubCategories();
      }
    } catch (err) {
      handleAjaxError(err);
      // console.log('Dashboard validateToken: ', err);
      handleLogout();
    }
  };

  useEffect(() => {
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true;
      validateToken();
      handleSelectedIndex(-1);
    }
  }, []);

  return (
    <section>
      <div className="gridItem">
        <div className="gridDashboardBarCharts">
          <div className="profitLostOverTime">
            <Paper elevation={3}>
              <ProfitLossBarChart revenueTotal={revenueTotal} expenseTotal={expenseTotal} />
            </Paper>
          </div>
          <div className="profitLost6Months">
            <Paper elevation={3}>
              <ProfitLossBarChartMonthly
                revenueList={revenueList}
                expenseList={expenseList}
              />
            </Paper>
          </div>
        </div>
        {/* <div className="gridDashboardCharts">
          <TotalRevenueChart revenueTransactions={revenueTransactions} />
          <TotalExpenseChart expenseTransactions={expenseTransactions} />
        </div> */}
        <div className="gridDashboardExpenseByCategoryPieCharts">
          <Paper elevation={3}>
            <div className="gridColumn1">
              <ExpenseChartByCategory
                expenseList={expenseList}
                getExpenseListForSelectedMonth={getExpenseListForSelectedMonth}
                // this was for use with <ExpenseChartBySubCategory />
                // showing only subcategories for selected category
                // getExpenseListById={getExpenseListById}
              />
            </div>
          </Paper>
          <Paper elevation={3}>
            <div className="gridColumn2">
              <ExpenseListBySubCategory
                expenseListForSelectedMonth={expenseListForSelectedMonth}
                // selectedExpenseList={selectedExpenseList}
              />
            </div>
          </Paper>
        </div>
        <div className="gridDashboard">
          {/* <Paper elevation={3}>
            <Billable2 billable={billable} />
          </Paper> */}
          <Paper elevation={3}>
            <Billable billable={billable} />
          </Paper>
          <Paper elevation={3}>
            <Receivable receivable={receivable} />
          </Paper>
          <Paper elevation={3}>
            <RevenuePastThreeYears revenuePast3years={revenuePast3years} />
          </Paper>
          <Paper elevation={3}>
            <RevenueCurrentYear revenueCurrentYear={revenueCurrentYear} />
          </Paper>
          <Paper elevation={3}>
            <RevenueCurrentRiYear revenueCurrentRiYear={revenueCurrentRiYear} />
          </Paper>
        </div>
        <div className="gridDashboard">
          <Paper elevation={3}>
            <ExpenseTransactions expenseTransactions={expenseTransactions} />
          </Paper>
          <Paper elevation={3}>
            <ExpenseCurrentYear expenseCurrentYear={expenseCurrentYear} />
          </Paper>
        </div>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Dashboard;

import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const handleAjaxError = (err) => {
  console.log('handleAjaxError: err: ', err);
  switch (err.response.status) {
    case 401:
      error('You are not authorized to perform this action.');
      break;
    default:
      error(`${err.response.statusText}`);
      break;
  }
};

// const isValidDate = (dateObj) => !Number.isNaN(Date.parse(dateObj));

export const validateAccount = (account) => {
  const errors = {};

  if (account.account_num === '') {
    errors.account_num = 'Account Number is required';
  }

  // Cannot validate CTA data here because it is not a required field
  // if (!isValidDate(account.cta_date)) {
  //   errors.cta_date = 'CTA Date is invalid';
  // }

  return errors;
};

export const validateAmendment = (amendment) => {
  const errors = {};

  if (amendment.budget_version === '') {
    errors.budget_version = 'Budget Version is required';
  }

  if (amendment.number_of_patients === 0) {
    errors.number_of_patients = 'Number of Patients is required';
  }

  if (amendment.cta_date === '' || amendment.cta_date === null) {
    errors.cta_date = 'CTA Date is invalid';
  }

  return errors;
};


export const validateExpense = (expense) => {
  const errors = {};

  if (expense.invoice_date === '' || expense.invoice_date === null) {
    errors.invoice_date = 'Invoice Date is required';
  }

  if (expense.invoice_date === 'Invalid Date') {
    errors.invoice_date = 'Invoice Date is invalid';
  }

  if (expense.invoice_num === '') {
    errors.invoice_num = 'Invoice Number is required';
  }

  if (expense.amount === '' || expense.amount === 0) {
    errors.amount = 'Invoice Amount is required';
  }

  if (expense.account_id === '') {
    errors.account_id = 'Account Number is required';
  }

  if (expense.expense_category_id === '') {
    errors.expense_category_id = 'Expense Category is required';
  }

  return errors;
};

export const validateRevenue = (revenue) => {
  const errors = {};

  if (revenue.invoice_date === '') {
    errors.invoice_date = 'Invoice Date is required';
  }

  if (revenue.invoice_num === '') {
    errors.invoice_num = 'Invoice Number is required';
  }

  if (revenue.amount === '') {
    errors.amount = 'Invoice Amount is required';
  }

  if (revenue.account_id === '') {
    errors.account_id = 'Account Number is required';
  }

  if (revenue.expense_category_id === '') {
    errors.expense_category_id = 'Expense Category is required';
  }

  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}/${MM}/${DD}`;
};

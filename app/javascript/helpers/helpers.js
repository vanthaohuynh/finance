import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;


export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));
export const validateAccount = (account) => {
  const errors = {};

  if (account.account_num === '') {
    errors.account_num = 'Account Number is required';
  }

  if (!isValidDate(account.cta_date)) {
    errors.cta_date = 'CTA Date is invalid';
  }

  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

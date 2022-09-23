# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Account.create(account_num: '07191-005-111')
Account.create(account_num: '07191-005-112')
Account.create(account_num: '07191-005-113')
Account.create(account_num: '07191-005-114')
Account.create(account_num: '07191-005-115')

ExpenseCategory.create(name: 'Salary')
ExpenseCategory.create(name: 'MRI')
ExpenseCategory.create(name: 'Medical')
ExpenseCategory.create(name: 'iLab fees')
ExpenseCategory.create(name: 'Other')

RevenueCategory.create(name: 'Sales')
RevenueCategory.create(name: 'Service')
RevenueCategory.create(name: 'Other')
RevenueCategory.create(name: 'Other2')
RevenueCategory.create(name: 'Other3')

Expense.create(invoice_date: '2020-01-01', amount: 100, account_id: 1, expense_category_id: 1)
Expense.create(invoice_date: '2020-01-01', amount: 200, account_id: 2, expense_category_id: 2)
Expense.create(invoice_date: '2020-01-01', amount: 300, account_id: 3, expense_category_id: 3)
Expense.create(invoice_date: '2020-01-01', amount: 400, account_id: 4, expense_category_id: 4)
Expense.create(invoice_date: '2020-01-01', amount: 500, account_id: 5, expense_category_id: 5)

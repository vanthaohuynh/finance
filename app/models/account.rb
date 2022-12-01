class Account < ApplicationRecord
  has_many :expense_categories, through: :expenses
  has_many :expenses
  has_many :revenue_categories, through: :revenues
  has_many :revenues
  has_many :account_amendments
  has_many :transactions

  validates :account_num, presence: true, uniqueness: true

  scope :get_revenue_curr_year, lambda { |year| where('extract(year from revenues.deposit_date) = ?', year) }
  scope :get_expense_curr_year, lambda { |year| where('extract(year from expenses.invoice_date) = ?', year) }
end

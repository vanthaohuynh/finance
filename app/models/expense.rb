class Expense < ApplicationRecord
  belongs_to :account
  belongs_to :expense_category

  validates :amount, numericality: { greater_than: 0 }, presence: true
  validates :account_id, presence: true
  validates :expense_category_id, presence: true
  validates :invoice_date, presence: true
  validates :invoice_num, presence: true
end

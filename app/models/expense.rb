class Expense < ApplicationRecord
  belongs_to :account
  belongs_to :expense_category
  has_one_attached :pdf_invoice
  has_many :transactions

  validates :amount, numericality: { greater_than: 0 }, presence: true
  validates :account_id, presence: true
  validates :expense_category_id, presence: true
  validates :invoice_date, presence: true
  # validates :invoice_num, presence: true, uniqueness: true
  validates :invoice_num, presence: true
end

class Revenue < ApplicationRecord
  belongs_to :account
  belongs_to :revenue_category

  validates :invoice_num, presence: true, uniqueness: true
  validates :amount, numericality: { greater_than: 0 }, presence: true
  validates :account_id, presence: true
  validates :revenue_category_id, presence: true
  validates :invoice_date, presence: true
end

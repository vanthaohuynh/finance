class Revenue < ApplicationRecord
  belongs_to :account
  belongs_to :revenue_category
  has_many :transactions

  # validates :invoice_num, presence: true, uniqueness: true
  validates :invoice_num, presence: true
  validates :amount, numericality: { greater_than: 0 }, presence: true
  validates :account_id, presence: true
  validates :revenue_category_id, presence: true
  validates :invoice_date, presence: true
end

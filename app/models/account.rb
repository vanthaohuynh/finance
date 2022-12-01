class Account < ApplicationRecord
  has_many :expense_categories, through: :expenses
  has_many :expenses
  has_many :revenue_categories, through: :revenues
  has_many :revenues
  has_many :account_amendments
  has_many :transactions

  validates :account_num, presence: true, uniqueness: true

  scope :by_year, lambda { |year| where('extract(year from revenues.deposit_date) = ?', year) }

  # range = Date.current.year - 1, 3, 31..Date.current.year, 4, 1
  # scope :ri_current_year_range, ->(ri_year_range) { where('range @> revenues.deposit_date ? ', ri_year_range) }

  # from_date = Date.new(Date.current.year - 1, 3, 31)
  # to_date = Date.new(Date.current.year, 4, 1)
  # scope :getting_ri_year, lambda { |revenues.deposit_date| where('from_date < ? AND to_date > ?', shares_at) }

  # scope :of_shares_at, ->(shares_at) { where("period @> date ? ", shares_at) }

end

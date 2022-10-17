class Account < ApplicationRecord
  has_many :expense_categories, through: :expenses
  has_many :expenses
  has_many :revenue_categories, through: :revenues
  has_many :revenues
  has_many :account_amendments

  validates :account_num, presence: true, uniqueness: true
end

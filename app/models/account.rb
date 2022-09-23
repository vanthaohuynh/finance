class Account < ApplicationRecord
  has_many :expense_categories, through: :expenses
  has_many :expenses
  has_many :revenue_categories, through: :revenues
  has_many :revenues

  validates :account_num, presence: true, uniqueness: true
end

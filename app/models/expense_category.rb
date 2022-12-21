class ExpenseCategory < ApplicationRecord
  has_many :expenses
  has_many :expense_sub_categories
end

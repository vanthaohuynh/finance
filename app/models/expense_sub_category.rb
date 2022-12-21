class ExpenseSubCategory < ApplicationRecord
  belongs_to :expense_category
  has_many :expenses
end

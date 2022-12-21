class AddExpenseCategoryToExpenseSubCategory < ActiveRecord::Migration[7.0]
  def change
    add_reference :expense_sub_categories, :expense_category, null: false, foreign_key: true
  end
end

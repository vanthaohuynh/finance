class AddExpenseSubCategoryToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_reference :expenses, :expense_sub_category, null: false, foreign_key: true
  end
end

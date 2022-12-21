class AddExpenseSubCategoryCodeToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_column :expenses, :expense_sub_category_code, :string
  end
end

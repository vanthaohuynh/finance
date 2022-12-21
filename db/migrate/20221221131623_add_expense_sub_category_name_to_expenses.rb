class AddExpenseSubCategoryNameToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_column :expenses, :expense_sub_category_name, :string
  end
end

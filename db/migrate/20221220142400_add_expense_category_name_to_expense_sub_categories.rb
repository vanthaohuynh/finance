class AddExpenseCategoryNameToExpenseSubCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :expense_sub_categories, :expense_category_name, :string
  end
end

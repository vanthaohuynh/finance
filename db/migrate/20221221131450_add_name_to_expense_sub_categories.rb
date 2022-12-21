class AddNameToExpenseSubCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :expense_sub_categories, :name, :string
  end
end

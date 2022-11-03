class AddDescriptionToExpenseCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :expense_categories, :description, :string
  end
end

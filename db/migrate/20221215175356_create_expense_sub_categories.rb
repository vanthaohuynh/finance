class CreateExpenseSubCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :expense_sub_categories do |t|
      t.string :expense_code
      t.string :description

      t.timestamps
    end
  end
end

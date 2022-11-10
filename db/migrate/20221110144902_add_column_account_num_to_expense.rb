class AddColumnAccountNumToExpense < ActiveRecord::Migration[7.0]
  def change
    add_column :expenses, :account_num, :string
    add_column :expenses, :expense_category_name, :string
    add_column :revenues, :account_num, :string
    add_column :revenues, :revenue_category_name, :string
  end
end

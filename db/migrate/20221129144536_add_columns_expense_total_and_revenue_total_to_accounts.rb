class AddColumnsExpenseTotalAndRevenueTotalToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :expense_total, :float
    add_column :accounts, :revenue_total, :float
  end
end

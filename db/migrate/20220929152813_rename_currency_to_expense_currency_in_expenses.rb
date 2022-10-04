class RenameCurrencyToExpenseCurrencyInExpenses < ActiveRecord::Migration[7.0]
  def change
    rename_column :expenses, :currency, :expense_currency
  end
end

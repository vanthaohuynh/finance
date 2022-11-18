class RemoveColumnBalanceFromTransactions < ActiveRecord::Migration[7.0]
  def change
    remove_column :transactions, :balance, :float
  end
end

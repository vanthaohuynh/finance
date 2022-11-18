class RemoveRevenueFromTransaction < ActiveRecord::Migration[7.0]
  def change
    remove_reference :transactions, :revenue, null: false, foreign_key: true
    remove_reference :transactions, :expense, null: false, foreign_key: true
  end
end

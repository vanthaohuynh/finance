class AddRevenueToTransaction < ActiveRecord::Migration[7.0]
  def change
    add_reference :transactions, :revenue, null: false, foreign_key: true
  end
end

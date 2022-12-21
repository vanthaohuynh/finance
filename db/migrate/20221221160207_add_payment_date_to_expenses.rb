class AddPaymentDateToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_column :expenses, :payment_date, :date
    add_column :expenses, :supplier, :string
  end
end

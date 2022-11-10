class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :account_num
      t.string :invoice_num
      t.date :invoice_date
      t.float :balance
      t.string :transaction_type
      t.string :transaction_category
      t.float :transaction_amount
      t.string :transaction_currency

      t.timestamps
    end
  end
end

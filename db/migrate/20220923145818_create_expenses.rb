class CreateExpenses < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.date :invoice_date
      t.float :amount

      t.timestamps
    end
  end
end

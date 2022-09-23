class AddColumnsToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_column :expenses, :invoice_num, :string
    add_column :expenses, :currency, :string
    add_column :expenses, :notes, :text
  end
end

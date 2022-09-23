class AddInvoiceNumToRevenues < ActiveRecord::Migration[7.0]
  def change
    add_column :revenues, :invoice_num, :string
    add_column :revenues, :currency, :string
    add_column :revenues, :notes, :text
  end
end

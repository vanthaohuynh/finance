class AddDepositDateToRevenue < ActiveRecord::Migration[7.0]
  def change
    add_column :revenues, :deposit_date, :date
  end
end

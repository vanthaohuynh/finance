class RenameCurrencyToRevenueCurrencyInRevenues < ActiveRecord::Migration[7.0]
  def change
    rename_column :revenues, :currency, :revenue_currency
  end
end

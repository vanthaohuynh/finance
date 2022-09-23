class AddRevenueCategoryToRevenues < ActiveRecord::Migration[7.0]
  def change
    add_reference :revenues, :revenue_category, null: false, foreign_key: true
  end
end

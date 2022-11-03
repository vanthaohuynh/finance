class AddDescriptionToRevenueCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :revenue_categories, :description, :string
  end
end

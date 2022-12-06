class AddColumnCalculateOverHeadToRevenues < ActiveRecord::Migration[7.0]
  def change
    add_column :revenues, :calculate_over_head, :boolean, default: false
  end
end

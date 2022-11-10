class AddColumnOverheadToRevenue < ActiveRecord::Migration[7.0]
  def change
    add_column :revenues, :overhead, :float
  end
end

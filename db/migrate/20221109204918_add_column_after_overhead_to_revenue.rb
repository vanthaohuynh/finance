class AddColumnAfterOverheadToRevenue < ActiveRecord::Migration[7.0]
  def change
    add_column :revenues, :after_overhead, :float
  end
end

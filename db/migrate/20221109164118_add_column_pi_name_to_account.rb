class AddColumnPiNameToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :pi_name, :string
  end
end

class AddColumnStatusToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :status, :string
  end
end

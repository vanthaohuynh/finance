class RemoveColumnRoleFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :role, :string
  end
end

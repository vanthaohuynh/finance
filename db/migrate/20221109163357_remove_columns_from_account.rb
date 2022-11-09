class RemoveColumnsFromAccount < ActiveRecord::Migration[7.0]
  def change
    remove_column :accounts, :study_name
    remove_column :accounts, :muhc_account
  end
end

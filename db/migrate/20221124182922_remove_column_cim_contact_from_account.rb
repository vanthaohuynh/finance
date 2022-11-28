class RemoveColumnCimContactFromAccount < ActiveRecord::Migration[7.0]
  def change
    remove_column :accounts, :cim_contact, :string
    remove_column :accounts, :phase, :string
  end
end

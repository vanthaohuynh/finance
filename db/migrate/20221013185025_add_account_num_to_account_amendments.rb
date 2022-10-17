class AddAccountNumToAccountAmendments < ActiveRecord::Migration[7.0]
  def change
    add_column :account_amendments, :account_num, :string
    add_column :account_amendments, :study_name, :string
  end
end

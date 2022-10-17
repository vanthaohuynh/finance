class AddCountToAccountAmendments < ActiveRecord::Migration[7.0]
  def change
    add_column :account_amendments, :count, :integer
  end
end

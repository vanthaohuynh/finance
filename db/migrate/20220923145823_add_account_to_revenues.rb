class AddAccountToRevenues < ActiveRecord::Migration[7.0]
  def change
    add_reference :revenues, :account, null: false, foreign_key: true
  end
end

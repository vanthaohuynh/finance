class AddColumnsToAccounts < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :muhc_account, :string
    add_column :accounts, :study_title, :string
    add_column :accounts, :study_name, :string
    add_column :accounts, :sponsor_name, :string
    add_column :accounts, :sponsor_contact, :string
    add_column :accounts, :number_of_patients, :integer
    add_column :accounts, :cta_date, :date
    add_column :accounts, :phase, :string
    add_column :accounts, :cim_contact, :string
    add_column :accounts, :cro_name, :string
    add_column :accounts, :cro_contact, :string
    add_column :accounts, :budget_version, :string
    add_column :accounts, :budget_currency, :string
    add_column :accounts, :invoicing_terms, :string
    add_column :accounts, :notes, :text
  end
end

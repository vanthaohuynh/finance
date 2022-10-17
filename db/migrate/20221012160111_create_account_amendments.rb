class CreateAccountAmendments < ActiveRecord::Migration[7.0]
  def change
    create_table :account_amendments do |t|
      t.string :budget_version
      t.integer :number_of_patients
      t.date :cta_date
      t.text :notes

      t.timestamps
    end
  end
end

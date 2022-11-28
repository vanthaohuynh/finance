class AddStudyNameToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :study_name, :string
  end
end

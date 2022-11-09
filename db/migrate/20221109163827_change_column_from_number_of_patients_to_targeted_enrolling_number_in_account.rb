class ChangeColumnFromNumberOfPatientsToTargetedEnrollingNumberInAccount < ActiveRecord::Migration[7.0]
  def change
    rename_column :accounts, :number_of_patients, :targeted_enrolling_number
  end
end

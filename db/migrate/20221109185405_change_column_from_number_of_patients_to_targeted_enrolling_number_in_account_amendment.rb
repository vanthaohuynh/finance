class ChangeColumnFromNumberOfPatientsToTargetedEnrollingNumberInAccountAmendment < ActiveRecord::Migration[7.0]
  def change
    rename_column :account_amendments, :number_of_patients, :targeted_enrolling_number
  end
end

class AccountAmendmentSerializer < ActiveModel::Serializer
  attributes :id, :budget_version, :number_of_patients, :cta_date, :notes,
             :count, :account_id
end

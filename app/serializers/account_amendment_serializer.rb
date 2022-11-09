class AccountAmendmentSerializer < ActiveModel::Serializer
  attributes :id, :budget_version, :targeted_enrolling_number, :cta_date, :notes,
             :count, :account_id, :created_at
end

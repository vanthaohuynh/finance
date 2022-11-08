class AccountSerializer < ActiveModel::Serializer
  attributes :id, :account_num, :created_at, :updated_at,
             :muhc_account, :study_title, :study_name, :sponsor_name,
             :sponsor_contact, :number_of_patients, :cta_date, :phase,
             :cim_contact, :cro_name, :cro_contact, :budget_version,
             :budget_currency, :invoicing_terms, :notes, :account_amendments
end

class AccountSerializer < ActiveModel::Serializer
  attributes :id, :account_num, :study_title, :pi_name, :sponsor_name, :status,
             :sponsor_contact, :cim_contact, :cro_name, :cro_contact,
             :phase, :budget_currency, :invoicing_terms, :budget_version,
             :targeted_enrolling_number, :cta_date, :notes,
             :created_at, :updated_at, :account_amendments
end

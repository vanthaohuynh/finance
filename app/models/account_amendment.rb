class AccountAmendment < ApplicationRecord
  belongs_to :account

  validates :account_id, presence: true
  validates :number_of_patients, numericality: { greater_than: 0 }, presence: true
  validates :cta_date, presence: true
  validates :budget_version, presence: true
end

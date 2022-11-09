class AccountAmendment < ApplicationRecord
  belongs_to :account

  validates :account_id, presence: true
  validates :targeted_enrolling_number, numericality: { greater_than: 0 }, presence: true
  validates :cta_date, presence: true
  validates :budget_version, presence: true
end

class Transaction < ApplicationRecord
  belongs_to :account

  validates :account_id, presence: true
  # validates :expense_id
  # validates :revenue_id

  validates :transaction_category, presence: true
  validates :transaction_type, presence: true
  validates :invoice_num, presence: true
  validates :invoice_date, presence: true

  # belongs_to :category
  # belongs_to :user
  # belongs_to :payee
  # belongs_to :payee_location, optional: true
  # belongs_to :transfer_account, class_name: 'Account', optional: true
  # belongs_to :transfer_transaction, class_name: 'Transaction', optional: true

  # validates :account, presence: true
  # validates :amount, presence: true
  # validates :category, presence: true
  # validates :date, presence: true
  # validates :user, presence: true
  # validates :payee, presence: true

  # scope :by_date, -> { order(date: :desc) }
  # scope :by_date_reverse, -> { order(date: :asc) }
  # scope :by_amount, -> { order(amount: :desc) }
  # scope :by_amount_reverse, -> { order(amount: :asc) }
  # scope :by_payee, -> { order(payee: :asc) }
  # scope :by_payee_reverse, -> { order(payee: :desc) }
  # scope :by_category, -> { order(category: :asc) }
  # scope :by_category_reverse, -> { order(category: :desc) }
  # scope :by_transfer, -> { order(transfer_transaction: :asc) }
  # scope :by_transfer_reverse, -> { order(transfer_transaction: :desc) }
  # scope :by_account, -> { order(account: :asc) }
  # scope :by_account_reverse, -> { order(account: :desc) }
  # scope :by_memo, -> { order(memo: :asc) }
  # scope :by_memo_reverse, -> { order(memo: :desc) }
  # scope :by_check_number, -> { order(check_number: :asc) }
  # scope :by_check_number_reverse, -> { order(check_number: :desc) }
  # scope :by_payee_location, -> { order(payee_location: :asc) }
  # scope :by_payee_location_reverse, -> { order(payee_location: :desc) }
  # scope :by_created_at, -> { order(created_at: :desc) }
  # scope :by_created_at_reverse, -> { order(created_at: :asc) }
  # scope :by_updated_at, -> { order(updated_at: :desc) }
  # scope :by_updated_at_reverse, -> { order(updated_at:
end

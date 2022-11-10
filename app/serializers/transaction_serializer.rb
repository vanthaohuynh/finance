class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :account_num, :invoice_num, :invoice_date,
             :balance, :transaction_type, :transaction_category,
             :transaction_amount, :transaction_currency,
             :account_id, :expense_id, :revenue_id
end

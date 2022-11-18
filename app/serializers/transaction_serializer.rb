class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :account_num, :invoice_num, :invoice_date,
             :transaction_type, :transaction_category,
             :transaction_amount, :transaction_currency
end

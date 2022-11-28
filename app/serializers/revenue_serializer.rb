class RevenueSerializer < ActiveModel::Serializer
  attributes :id, :invoice_num, :invoice_date, :amount, :account_id,
             :revenue_category_id, :revenue_currency, :notes, :deposit_date,
             :overhead, :after_overhead, :account_num, :revenue_category_name
end

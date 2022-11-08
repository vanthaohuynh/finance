class RevenueSerializer < ActiveModel::Serializer
  attributes :id, :invoice_num, :invoice_date,
             :amount, :account_id, :revenue_category_id,
             :revenue_currency, :notes, :account_num, :revenue_category_name
end

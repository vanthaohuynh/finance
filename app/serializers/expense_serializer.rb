class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :invoice_num, :invoice_date,
             :amount, :account_id, :expense_category_id,
             :expense_currency, :notes, :created_at, :updated_at,
             :pdf_invoice, :account_num, :expense_category_name
  def pdf_invoice
    if object.pdf_invoice.attached?
      {
        url: rails_blob_url(object.pdf_invoice, only_path: true)
      }
    end
  end
end

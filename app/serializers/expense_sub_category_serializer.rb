class ExpenseSubCategorySerializer < ActiveModel::Serializer
  attributes :id, :expense_code, :name, :expense_category_id, :expense_category_name
end

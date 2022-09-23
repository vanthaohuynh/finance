class Api::V1::ExpenseCategoriesController < ApplicationController
  def index
    @expense_categories = ExpenseCategory.all
    @expense_categories = @expense_categories.map { |expense_category|
      { label: expense_category.name, value: expense_category.id }
    }
    render json: @expense_categories
  end
end

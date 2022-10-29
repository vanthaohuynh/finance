class Api::V1::ExpenseCategoriesController < ApplicationController
  before_action :authorized
  def index
    @expense_categories = ExpenseCategory.all
    @expense_categories = @expense_categories.map { |expense_category|
      # { label: expense_category.name, value: expense_category.id }
      { id: expense_category.id, name: expense_category.name }
    }
    render json: @expense_categories
  end
end

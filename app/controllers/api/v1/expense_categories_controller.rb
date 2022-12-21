class Api::V1::ExpenseCategoriesController < ApplicationController
  # before_action :authorized

  def index
    @expense_categories = ExpenseCategory.all
    @expense_categories = @expense_categories.map { |expense_category|
      { id: expense_category.id, name: expense_category.name, description: expense_category.description }
    }
    render json: @expense_categories

    # This is for rendering All with order DESC.
    # @expense_categories = ExpenseCategory
    #                       .select('expense_categories.*')
    #                       .order('created_at DESC')
    # render json: @expense_categories
  end

  def create
    @expense_category = ExpenseCategory.create(expense_category_params)
    render json: @expense_category
  end

  def update
    @expense_category = ExpenseCategory.find(params[:id])
    @expense_category.update(expense_category_params)
    render json: @expense_category
  end

  def destroy
    @expense_category = ExpenseCategory.find(params[:id])
    @expense_category.destroy
    render json: @expense_category
  end

  private

  def expense_category_params
    params.require(:expense_category).permit(:name, :description)
  end
end

class Api::V1::ExpenseSubCategoriesController < ApplicationController
  # before_action :authorized

  def index
    @expense_sub_categories = ExpenseSubCategory.all
    render json: @expense_sub_categories, include: %i[expense_category]
  end

  def index_listing
    # for creating dropdown list
    @expense_sub_categories = ExpenseSubCategory.all
    @expense_sub_categories = @expense_sub_categories.map { |expense_sub_category|
      { id: expense_sub_category.id, expense_code: expense_sub_category.expense_code, description: expense_sub_category.description }
    }
    render json: @expense_sub_categories
  end

  def create
    @expense_sub_category = ExpenseSubCategory.create(expense_sub_category_params)
    render json: @expense_sub_category
  end

  def update
    @expense_sub_category = ExpenseSubCategory.find(params[:id])
    @expense_sub_category.update(expense_sub_category_params)
    render json: @expense_sub_category
  end

  def destroy
    @expense_sub_category = ExpenseSubCategory.find(params[:id])
    @expense_sub_category.destroy
    render json: @expense_sub_category
  end

  private

  def expense_sub_category_params
    params
      .require(:expense_sub_category)
      .permit(:expense_code, :name, :description, :expense_category_id, :expense_category_name)
  end
end

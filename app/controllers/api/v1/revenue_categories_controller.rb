class Api::V1::RevenueCategoriesController < ApplicationController
  before_action :authorized
  def index
    @revenue_categories = RevenueCategory.all
    @revenue_categories = @revenue_categories.map { |revenue_category|
      { id: revenue_category.id, name: revenue_category.name, description: revenue_category.description }
    }
    render json: @revenue_categories

    # This is for rendering All with order DESC.
    # @revenue_categories = RevenueCategory
    #                       .select('revenue_categories.*')
    #                       .order('created_at DESC')
    # render json: @revenue_categories
  end

  def create
    @revenue_category = RevenueCategory.create(revenue_category_params)
    render json: @revenue_category
  end

  def update
    @revenue_category = RevenueCategory.find(params[:id])
    @revenue_category.update(revenue_category_params)
    render json: @revenue_category
  end

  def destroy
    @revenue_category = RevenueCategory.find(params[:id])
    @revenue_category.destroy
    render json: @revenue_category
  end

  private

  def revenue_category_params
    params.require(:revenue_category).permit(:name, :description)
  end
end

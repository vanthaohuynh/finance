class Api::V1::RevenueCategoriesController < ApplicationController
  def index
    @revenue_categories = RevenueCategory.all
    @revenue_categories = @revenue_categories.map { |revenue_category|
      { id: revenue_category.id, name: revenue_category.name }
    }
    render json: @revenue_categories
  end
end

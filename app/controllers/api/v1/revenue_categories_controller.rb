class Api::V1::RevenueCategoriesController < ApplicationController
  def index
    @revenue_categories = RevenueCategory.all
    @revenue_categories = @revenue_categories.map { |revenue_category|
      { label: revenue_category.name, value: revenue_category.id }
    }
    render json: @revenue_categories
  end
end

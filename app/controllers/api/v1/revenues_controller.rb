class Api::V1::RevenuesController < ApplicationController
  before_action :set_revenue, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @revenues = Revenue
                .joins(:account, :revenue_category)
                .select('revenues.*, accounts.account_num, revenue_categories.name as revenue_category_name')
                .order('created_at DESC')
    render json: @revenues
  end

  def create
    @revenue = Revenue.new(revenue_params)
    if @revenue.save
      render json: @revenue
    else
      render json: @revenue.errors, status: :unprocessable_entity
    end
  end

  def update
    if @revenue.update(revenue_params)
      render json: @revenue
    else
      render json: @revenue.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @revenue.destroy
    head :no_content
  end

  private

  def set_revenue
    @revenue = Revenue.find(params[:id])
  end

  def revenue_params
    params.require(:revenue).permit(:invoice_date, :amount, :account_id, :revenue_category_id, :invoice_num, :currency, :notes)
  end

end

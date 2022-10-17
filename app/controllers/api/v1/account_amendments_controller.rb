class Api::V1::AccountAmendmentsController < ApplicationController
  before_action :set_account, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @account_amendments = AccountAmendment
                          .joins(:account)
                          .select('account_amendments.*, accounts.id as account_id, accounts.account_num')
                          .order('created_at DESC')
    render json: @account_amendments
  end

  def create
    @account_amendment = AccountAmendment.new(account_amendment_params)
    if @account_amendment.save
      render json: @account_amendment
    else
      render json: @account_amendment.errors, status: :unprocessable_entity
    end
  end

  def show
    @account_amendment = AccountAmendment.find(params[:id])
    render json: @account_amendment
  end

  def update
    @account_amendment = AccountAmendment.find(params[:id])
    if @account_amendment.update(account_amendment_params)
      render json: @account_amendment
    else
      render json: @account_amendment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @account_amendment = AccountAmendment.find(params[:id])
    if @account_amendment.destroy
      head :no_content, status: :ok
    else
      render json: @account_amendment.errors, status: :unprocessable_entity
    end
  end

  private

  def account_amendment_params
    params.require(:account_amendment).permit(:account_id, :number_of_patients, :cta_date, :budget_version, :count, :notes)
  end
end

class Api::V1::TransactionsController < ApplicationController
  # before_action :authorized
  before_action :set_transaction, only: %i[update destroy]

  def index
    @transactions = Transaction.all
    render json: @transactions
  end

  def create
    @transaction = Transaction.create(transaction_params)
    render json: @transaction
  end

  def update
    # @transaction = Transaction.find(params[:id])
    @transaction.update(transaction_params)
    render json: @transaction
  end

  def destroy
    # @transaction = Transaction.find(params[:id])
    @transaction.destroy
    render json: @transaction
  end

  private

  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  def transaction_params
    params.require(:transaction)
          .permit(
            :account_id, :expense_id, :revenue_id, :transaction_category,
            :transaction_type, :invoice_num, :invoice_date, :transaction_amount,
            :account_num, :expense_category_id, :expense_category_name,
            :revenue_category_id, :revenue_category_name, :balance,
            :transaction_currency
          )
  end
end

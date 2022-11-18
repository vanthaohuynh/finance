class Api::V1::TransactionsController < ApplicationController
  before_action :authorized
  # before_action :set_transaction, only: %i[update destroy]

  # def index
  #   @transactions = Transaction.all
  #   render json: @transactions
  # end

  def index
    @transactions = Transaction
                    .joins(:account, :expense, :revenue)
                    .select('accounts.*, expenses.*, revenues.*')
                    .group('account_id')
                    .order('invoice_date')
    render json: @transactions
  end

  # def create
  #   @transaction = Transaction.new(transaction_params)
  #   if @transaction.save
  #     render json: @transaction
  #   else
  #     render json: @transaction.errors, status: :unprocessable_entity
  #   end
  # end

  # def update
  #   # @transaction = Transaction.find(params[:id])
  #   @transaction.update(transaction_params)
  #   render json: @transaction
  # end

  # def destroy
  #   # @transaction = Transaction.find(params[:id])
  #   @transaction.destroy
  #   render json: @transaction
  # end

  # private

  # def set_transaction
  #   @transaction = Transaction.find(params[:id])
  # end

  # def transaction_params
  #   params.require(:transaction)
  #         .permit(
  #           :account_id, :account_num, :invoice_num, :invoice_date,
  #           :transaction_type, :transaction_category,
  #           :transaction_amount, :transaction_currency
  #         )
  # end
end

class Api::V1::ExpensesController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_expense, only: [:show, :edit, :update, :destroy]

  skip_before_action :verify_authenticity_token

  def index
    @expenses = Expense
                .joins(:account, :expense_category)
                .select('expenses.*, accounts.account_num, expense_categories.name as expense_category_name')
                .order('created_at DESC')
    render json: @expenses
  end

  def create
    @expense = Expense.new(expense_params)
    if @expense.save
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  def update
    # @expense = Expense.find(params[:id])
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  def destroy
    # @expense = Expense.find(params[:id])
    @expense.destroy
    head :no_content
  end

  private

  def set_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.require(:expense).permit(:invoice_date, :invoice_num, :expense_currency, :description, :amount, :account_id, :expense_category_id, :notes)
  end
end

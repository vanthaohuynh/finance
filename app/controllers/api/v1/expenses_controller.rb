class Api::V1::ExpensesController < ApplicationController
  before_action :authorized
  before_action :set_expense, only: %i[show edit update destroy]
  # skip_before_action :verify_authenticity_token

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
    @expense = Expense.find(params[:id])
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @expense = Expense.find(params[:id])
    @expense.destroy
    render json: @expense
  end

  private

  def set_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.require(:expense).permit(:updated_at, :invoice_date, :invoice_num, :expense_currency, :amount, :account_id, :expense_category_id, :notes)
  end
end

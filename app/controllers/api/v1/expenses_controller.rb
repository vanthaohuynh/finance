class Api::V1::ExpensesController < ApplicationController
  before_action :authorized
  before_action :set_expense, only: %i[show edit update destroy]
  # skip_before_action :verify_authenticity_token

  def index
    # The below lines are working perfectly fine, except that I need the JOIN
    # in order to get account_num and expense_category_name (for expense_serializer.rb)
    # for ExpenseList to display on the grid.
    if can? :read, Expense
      @expenses = Expense.all.order('created_at DESC')
      # render json: @expenses, include: %i[account expense_category]
      render json: @expenses
      # Had to go back to the .joins method.
      # @expenses = Expense
      #             .joins(:account, :expense_category)
      #             .select('expenses.*, accounts.account_num, expense_categories.name as expense_category_name')
      #             .order('created_at DESC')
      # render json: @expenses
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def create
    if can? :manage, Expense
      @expense = Expense.new(expense_params)
      if @expense.save
        render json: @expense
      else
        render json: @expense.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def update
    if can? :manage, Expense
      @expense = Expense.find(params[:id])
      if @expense.update(expense_params)
        render json: @expense
      else
        render json: @expense.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def destroy
    if can? :manage, Expense
      @expense = Expense.find(params[:id])
      @expense.destroy
      render json: @expense
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  private

  def set_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.require(:expense)
          .permit(
            :pdf_invoice, :updated_at, :invoice_date, :invoice_num,
            :expense_currency, :amount, :account_id, :expense_category_id,
            :notes, :account_num, :expense_category_name, :expense_sub_category_id,
            :expense_sub_category_name, :expense_sub_category_code,
            :payment_date, :supplier
          )
  end
end

class Api::V1::Accounts3Controller < ApplicationController
  # before_action :authorized

  def index
    @accounts = Account
                .joins('FULL OUTER JOIN expenses ON accounts.id = expenses.account_id',
                       'FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(expenses.amount) AS expense_total, SUM(revenues.amount) AS revenue_total')
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end
end

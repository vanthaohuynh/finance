class Api::V1::TransactionsController < ApplicationController
  # before_action :authorized

  def revenue_transactions
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where('accounts.status = ?', 'Open')
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end

  def expense_transactions
    @accounts = Account
                .joins('FULL OUTER JOIN expenses ON accounts.id = expenses.account_id')
                .select('accounts.*, SUM(expenses.amount) AS expense_total')
                .where('accounts.status = ?', 'Open')
                .distinct
                .group('accounts.id')
                .order('accounts.account_num')
    render json: @accounts
  end

  # Billable Activity: all revenues amount regardless of deposit date or invoice date
  def billable
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where('accounts.status = ?', 'Open')
                .distinct
                .group('accounts.id')
                .order('accounts.account_num')
    render json: @accounts
  end

  # Amount Reveivable: all revenues with empty deposit date (To be deposited)
  def receivable
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where('revenues.deposit_date IS NULL AND accounts.status = ?', 'Open')
                .distinct
                .group('accounts.id')
                .order('accounts.account_num')
    render json: @accounts
  end

  def revenue_past3years
    from_date = Date.new(Date.current.year - 3, 1, 1)
    to_date = Date.new(Date.current.year - 1, 12, 31)
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                # .where(['accounts.status = ? and revenues.deposit_date >= ?', 'Open', 3.years.ago])
                .where(['accounts.status = ? and revenues.deposit_date BETWEEN ? AND ?', 'Open', from_date, to_date])
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end

  def revenue_currentyear
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where('accounts.status = ?', 'Open')
                .get_revenue_curr_year(Date.current.year)
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end

  def expense_currentyear
    @accounts = Account
                .joins('FULL OUTER JOIN expenses ON accounts.id = expenses.account_id')
                .select('accounts.*, SUM(expenses.amount) AS expense_total')
                .where('accounts.status = ?', 'Open')
                .get_expense_curr_year(Date.current.year)
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end

  def revenue_pastyear
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where('accounts.status = ?', 'Open')
                # Scope defined in account.rb
                .by_year(Date.current.year - 1)
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end

  # RI year is the fiscal year that ends on March 31st
  def revenue_current_ri_year
    # range = Date.new(Date.current.year - 1, 3, 31)..Date.new(Date.current.year, 4, 1)
    from_date = Date.new(Date.current.year, 4, 1)
    to_date = Date.new(Date.current.year + 1, 3, 31)
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where(['accounts.status = ? and revenues.deposit_date BETWEEN ? AND ?', 'Open', from_date, to_date])
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end

  def revenue_past_ri_year
    # range = Date.new(Date.current.year - 1, 3, 31)..Date.new(Date.current.year, 4, 1)
    from_date = Date.new(Date.current.year - 1, 4, 1)
    to_date = Date.new(Date.current.year, 3, 31)
    @accounts = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where(['accounts.status = ? and revenues.deposit_date BETWEEN ? AND ?', 'Open', from_date, to_date])
                .distinct
                .group('accounts.id')
                .order('accounts.id')
    render json: @accounts
  end
end

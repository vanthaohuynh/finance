class Api::V1::AccountsController < ApplicationController
  before_action :authorized
  before_action :set_account, only: %i[show edit update destroy transactions rev_ri_year1]
  # skip_before_action :verify_authenticity_token
  # before_action :authenticate_user, only: %i[create update destroy]

  def index
    if can? :read, Account
      @accounts = Account
                  .select('accounts.*')
                  # .order('created_at DESC')
                  .order('accounts.account_num')
      render json: @accounts
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def transactions
    if can? :read, Account
      @account = Account.find(params[:id])
      render json: @account
      # @transactions = Account
      #                 .joins('FULL OUTER JOIN expenses ON accounts.id = expenses.account_id',
      #                        'FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
      #                 .where('accounts.id = ?', @account.id)
      #                 .distinct
      #                 .order('accounts.id' => :desc)
      # render json: @transactions
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  # def transactions
  #   @accounts = Account
  #               .joins('FULL OUTER JOIN expenses ON accounts.id = expenses.account_id',
  #                      'FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
  #               .distinct
  #               .order('accounts.id' => :desc)
  #               # .group('account.id')
  #               # .order('one_invoice_date' => :desc)
  #   render json: @accounts
  # end

  def create
    if can? :manage, Account
      @account = Account.new(account_params)
      if @account.save
        render json: @account
      else
        render json: @account.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def show
    if can? :read, Account
      @account = Account.find(params[:id])
      render json: @account
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def update
    if can? :manage, Account
      if @account.update(account_params)
        render json: @account
      else
        render json: @account.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def destroy
    if can? :manage, Account
      @account.destroy
      render json: @account
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def rev_ri_year
    from_date = Date.new(Date.current.year, 4, 1)
    to_date = Date.new(Date.current.year + 1, 3, 31)
    @revenues = Account
                .joins('FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
                .select('accounts.*, SUM(revenues.amount) AS revenue_total')
                .where(['accounts.status = ? AND accounts.id = ? AND revenues.deposit_date BETWEEN ? AND ?', 'Open', @account, from_date, to_date])
                .distinct
                .group('accounts.id')
    render json: @revenues
  end

  private

  def set_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account)
          .permit(
            :updated_at, :account_num, :muhc_account, :study_title,
            :pi_name, :sponsor_name, :sponsor_contact, :study_name,
            :targeted_enrolling_number, :cta_date, :phase,
            :cim_contact, :cro_name, :cro_contact, :budget_version,
            :budget_currency, :invoicing_terms, :notes, :status
          )
  end
end

class Api::V1::AccountsController < ApplicationController
  before_action :authorized
  before_action :set_account, only: %i[show edit update destroy transactions]
  # skip_before_action :verify_authenticity_token
  # before_action :authenticate_user, only: %i[create update destroy]

  def index
    @accounts = Account
                .select('accounts.*')
                .order('created_at DESC')
    render json: @accounts
  end

  def transactions
    @account = Account.find(params[:id])
    render json: @account
    # @transactions = Account
    #                 .joins('FULL OUTER JOIN expenses ON accounts.id = expenses.account_id',
    #                        'FULL OUTER JOIN revenues ON accounts.id = revenues.account_id')
    #                 .where('accounts.id = ?', @account.id)
    #                 .distinct
    #                 .order('accounts.id' => :desc)
    # render json: @transactions
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
    @account = Account.new(account_params)
    if @account.save
      render json: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  def show
    @account = Account.find(params[:id])
    render json: @account
  end

  def update
    if @account.update(account_params)
      render json: @account
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @account.destroy
    if @account.destroy
      head :no_content, status: :ok
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  private

  def set_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account)
          .permit(
            :updated_at, :account_num, :muhc_account, :study_title,
            :pi_name, :sponsor_name, :sponsor_contact,
            :targeted_enrolling_number, :cta_date, :phase,
            :cim_contact, :cro_name, :cro_contact, :budget_version,
            :budget_currency, :invoicing_terms, :notes, :status
          )
  end
end

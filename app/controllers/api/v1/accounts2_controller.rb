class Api::V1::Accounts2Controller < ApplicationController
  # This Accounts2Controller is for getting json to create dropdown list
  # for the expense form. Need to have lable and value
  def index
    @accounts = Account.all
    @accounts = @accounts.map { |account|
      # { id: account.id, account_num: account.account_num, label: account.account_num, value: account.id }
      { id: account.id, account_num: account.account_num }
    }
    render json: @accounts
  end
end

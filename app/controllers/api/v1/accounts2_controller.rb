class Api::V1::Accounts2Controller < ApplicationController
  # This Accounts2Controller is for getting json to create dropdown list
  # for the expense form. Need to have lable and value
  def index
    @accounts = Account.all
    @accounts = @accounts.map { |account|
      { label: account.account_num, value: account.id }
    }
    render json: @accounts
  end
end

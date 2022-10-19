class UsersController < ApplicationController
  load_and_authorize_resource

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  # def create
  #   @user = User.new(user_params)

  #   if @user.save
  #     render json: @user, status: :created
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def user_params
    params.require(:user).permit(
      :id,
      :email,
      :password,
      :password_confirmation,
      :created_at,
      :updated_at
    )
  end

end

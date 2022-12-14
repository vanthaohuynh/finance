class UsersController < ApplicationController
  before_action :authorized, only: %i[validate_token]
  before_action :find_user, only: %i[show update destroy]
  # load_and_authorize_resource // Cannot use this because Devise is not installed.
  # so I have no choice but to use "if can? in every controller"

  def index
    if can? :manage, User
      @users = User.all
      render json: @users, status: 200
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def validate_token
    render json: { user: @user }, status: 200
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      token = encode_token(user_id: @user.id)
      # time = Time.now + 24.hours.to_i
      # render json: { user: @user, token:, exp: time.strftime('%Y-%m-%d %H:%M') }, status: 200
      render json: { user: @user, token: }, status: 200
    end
  end

  def create
    if can? :manage, User
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: 200
      else
        render json: { errors: @user.errors.full_messages }, status: 503
      end
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  # def update
  #   unless @user.update(user_params)
  #     render json: { errors: @user.errors.full_messages }, status: 503
  #   end
  # end

  def update
    if can? :manage, User
      if @user.update(user_params)
        render json: @user, status: 200
      else
        render json: @user.errors
      end
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  def destroy
    if can? :manage, User
      @user = User.find(params[:id])
      @user.destroy
    else
      render json: { error: 'UNAUTHORIZED' }, status: 401
    end
  end

  # def create
  #   @user = User.new(user_params)
  #   if user.save
  #     token = issue_token(user)
  #     render json: { user: UserSerializer.new(user), jwt: token }
  #   elsif user.errors.messages
  #     render json: { error: user.errors.messages }
  #   else
  #     render json: { error: 'User could not be created. Please try again.' }
  #   end
  # end

  def show
    user = User.find(params[:id])
    if user
      # render json: user
      render user
    else
      render json: { error: 'User could not be found.' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :role_id, :password, :password_confirmation, :role_name)
  end

  def find_user
    @user = User.find(params[:id])
  end
end

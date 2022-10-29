class UsersController < ApplicationController
  before_action :authorized, only: %i[validate_token]
  before_action :find_user, only: %i[show update destroy]
  # before_action :user_params, only: %i[create update]

  def index
    @users = User.all
    render json: @users, status: 200
  end

  def validate_token
    render json: { user: @user }, status: 200
  end

  def login
    @user = User.find_by(email: params[:email])
    # debugger
    if @user&.authenticate(params[:password])
      token = encode_token(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { user: @user, token:, exp: time.strftime('%Y-%m-%d %H:%M') }, status: 200
    else
      render json: { error: 'unauthorized' }, status: 401
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: 201
    else
      render json: { errors: @user.errors.full_messages }, status: 503
    end
  end

  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages }, status: 503
    end
  end

  def destroy
    @user.destroy
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

  # def show
  #   user = User.find(params[:id])
  #   if user
  #     render json: user
  #   else
  #     render json: { error: 'User could not be found.' }
  #   end
  # end

  # def update
  #   if user.update(user_params)
  #     render json: user, status: :ok
  #   else
  #     render json: user.errors, status: :unprocessable_entity
  #   end
  # end

  # def destroy
  #   user.destroy
  # end

  private

  def user_params
    params.require(:user).permit(:email, :password_digest, :role_id)
  end

  def find_user
    @user = User.find(params[:id])
  end
end

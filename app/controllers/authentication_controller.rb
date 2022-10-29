class AuthenticationController < ApplicationController
  include JwtToken
  skip_before_action :authenticate_user, only: :login

  # POST /login
  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = JwtToken.jwt_encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token:, exp: time.strttime('%Y-%m-%d %H:%M'),
                     user: @user.user_id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end

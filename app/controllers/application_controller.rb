class ApplicationController < ActionController::Base
  # before_action :authorized
  skip_before_action :verify_authenticity_token

  # SECRET_KEY = Rails.application.credentials.jwt_key
  # logger.debug "SECRET_KEY: #{SECRET_KEY}"

  # def encode_token(payload, exp = 24.hours.from_now)
  #   payload[:exp] = exp.to_i
  #   JWT.encode(payload, SECRET_KEY)
  # end

  def encode_token(payload)
    logger.debug "Payload: #{payload}"
    # logger.debug("S: #{Rails.application.credentials.secret_key_base}")
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        # JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
        JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: { message: 'Unauthorized' }, status: :unauthorized unless logged_in?
  end


  # include JwtToken
  # skip_before_action :verify_authenticity_token

  # before_action :authenticate_user

  # private

  # def authenticate_user
  #   header = request.headers['Authorization']
  #   header = header.split(' ').last if header
  #   begin
  #     @decoded = JwtToken.jwt_decode(header)
  #     @current_user = User.find(@decoded[:user_id])
  #   rescue ActiveRecord::RecordNotFound => e
  #     render json: { errors: e.message }, status: :unauthorized
  #   rescue JWT::DecodeError => e
  #     render json: { errors: e.message }, status: :unauthorized
  #   end
  # end


  # protect_from_forgery with: :null_session
  # include CurrentUserConcern

  # private

  # def current_user
  #   @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
  # end
  # helper_method :current_user

  # def jwt_key
  #   Rails.application.credentials.jwt_key
  # end

  # def issue_token(user)
  #   JWT.encode({ user_id: user.id }, jwt_key, 'HS256')
  # end

  # def decoded_token
  #   JWT.decode(token, jwt_key, true, { algorithm: 'HS256' })
  # rescue JWT::DecodeError
  #   [{ error: 'Invalid Token' }]
  # end

  # def token
  #   request.headers['Authorization']
  # end

  # def user_id
  #   decoded_token.first['user_id']
  # end

  # def current_user
  #   @current_user || User.find_by(id: user_id)
  # end

  # def logged_in?
  #   !!@current_user
  # end

  rescue_from CanCan::AccessDenied do
    flash[:error] = 'Access denied!'
    redirect_to root_url
  end
end

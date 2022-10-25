class ApplicationController < ActionController::Base
  # This is for setting app installed with --api flag
  # class ApplicationController < ActionController::API
  # before_action :set_csrf_cookie
  # include ActionController::Cookies
  # include ActionController::RequestForgeryProtection

  # protect_from_forgery with: :exception

  # def cookie
  #   'ok'
  # end

  # private

  # def set_csrf_cookie
  #   cookies['CSRF-TOKEN'] = {
  #     value: form_authenticity_token,
  #     domain: :all,
  #     same_site: :none,
  #     # secure: Rails.env.production?
  #     secure: true
  #   }
  # end

  skip_before_action :verify_authenticity_token
  # protect_from_forgery with: :null_session // Come back to this later.
  # Right now cannot activate this line. The app will not work with it.

  # before_action :set_current_user

  # This one is working fine (in local)
  def current_user
    @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  # This code was in the template
  # def authorize
  #   redirect_to login_path, alert: 'Not authorized - you must be logged in!' if current_user.nil?
  # end

  # def require_user_logged_in!
  #   # allows only logged in user
  #   redirect_to sign_in_path, alert: 'You must be signed in' if Current.user.nil?
  # end

  # protect_from_forgery with: :null_session
  # before_action :configure_permitted_parameters, if: :devise_controller?

  # protected

  rescue_from CanCan::AccessDenied do
    flash[:error] = 'Access denied!'
    redirect_to root_url
  end

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  # end
end

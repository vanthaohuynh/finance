class SessionsController < ApplicationController
  # include CurrentUserConcern

  # def create
  #   user = User.find_by_email(session_params[:email])

  #   if user&.authenticate(session_params[:password])
  #     token = issue_token(user)
  #     render json: { user: UserSerializer.new(user), jwt: token }
  #   else
  #     render json: { error: 'Invalid email or password.' }
  #   end
  # end

  # def logged_in
  #   if @current_user
  #     render json: { user: UserSerializer.new(@current_user), jwt: issue_token(@current_user) }
  #   else
  #     render json: { error: 'User is not logged in' }
  #   end
  #         # if logged_in?
  #         #   render json: @current_user
  #         # else
  #         #   render json: { error: 'User is not logged in/could not be found.' }
  #         # end
  # end

  # def logout
  #   session.clear
  #   render json: { message: 'Successfully logged out.' }
  # end

  # private

  # def session_params
  #   params.require(:session).permit(:email, :password)
  # end
end

  # include CurrentUserConcern

  # def create
  #   user = User
  #           .find_by(email: params["user"]["email"])
  #           .try(:authenticate, params["user"]["password"])

  #   if user
  #     session[:user_id] = user.id
  #     render json: {
  #       status: :created,
  #       logged_in: true,
  #       user: user
  #     }
  #   else
  #     render json: { status: 401 }
  #   end
  # end

  # def logged_in
  #   if @current_user
  #     render json: {
  #       logged_in: true,
  #       user: @current_user
  #     }
  #   else
  #     render json: {
  #       logged_in: false
  #     }
  #   end
  # end

  # def logout
  #   reset_session
  #   render json: { status: 200, logged_out: true }
  # end
# end

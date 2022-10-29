module JwtToken
  # extend ActiveSupport::Concern

  # SECRET_KEY = Rails.application.credentials.jwt_key

  # def jwt_encode(payload, exp: 24.hours.from_now)
  #   payload[:exp] = exp.to_i
  #   JWT.encode(payload, SECRET_KEY)
  # end

  # def jwt_decode(token)
  #   body = JWT.decode(token, SECRET_KEY)[0]
  #   HashWithIndifferentAccess.new body
  # rescue
  #   nil
  # end
end

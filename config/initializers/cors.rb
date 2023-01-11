# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '*', headers: :any, methods: %i[get post put patch delete options head]
  end

  allow do
    # origins 'https://dovee-finance.herokuapp.com'
    origins 'https://dovee-finance.onrender.com'
    resource '*', headers: :any, methods: %i[get post put patch delete options head]
  end
end

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all
  end
end

module ApiTestHelpers
  PASSWORD = "secret123".freeze

  # Logs in through POST /login (the real flow) and returns the Authorization header.
  def auth_headers_for(user)
    post "/login", params: { email: user.email, password: PASSWORD }, as: :json
    assert_response :success
    { "Authorization" => "Bearer #{response.parsed_body.fetch('token')}" }
  end

  def json
    response.parsed_body
  end
end

class ActionDispatch::IntegrationTest
  include ApiTestHelpers
end

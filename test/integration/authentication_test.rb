require "test_helper"

class AuthenticationTest < ActionDispatch::IntegrationTest
  test "login with valid credentials returns the user and a JWT" do
    post "/login", params: { email: users(:admin).email, password: ApiTestHelpers::PASSWORD }, as: :json

    assert_response :success
    assert_equal users(:admin).id, json.dig("user", "id")
    payload, header = JWT.decode(json["token"], Rails.application.secret_key_base, true, algorithm: "HS256")
    assert_equal users(:admin).id, payload["user_id"]
    assert_equal "HS256", header["alg"]
    assert_in_delta 4.hours.from_now.to_i, payload["exp"], 60
  end

  test "login with a wrong password does not return a token" do
    post "/login", params: { email: users(:admin).email, password: "wrong" }, as: :json

    assert_not_equal 200, response.status
    assert_not_includes response.body.to_s, "token"
  end

  test "login with an unknown email does not return a token" do
    post "/login", params: { email: "nobody@test.example", password: ApiTestHelpers::PASSWORD }, as: :json

    assert_not_equal 200, response.status
    assert_not_includes response.body.to_s, "token"
  end

  test "validate_token accepts a token issued by /login" do
    get "/validate_token", headers: auth_headers_for(users(:viewer))

    assert_response :success
    assert_equal users(:viewer).email, json.dig("user", "email")
  end

  test "validate_token rejects a missing token" do
    get "/validate_token"

    assert_response :unauthorized
  end

  test "validate_token rejects a token signed with another key" do
    forged = JWT.encode({ user_id: users(:admin).id, exp: 1.hour.from_now.to_i }, "not-the-secret")
    get "/validate_token", headers: { "Authorization" => "Bearer #{forged}" }

    assert_response :unauthorized
  end

  test "validate_token rejects an expired token" do
    expired = JWT.encode({ user_id: users(:admin).id, exp: 1.minute.ago.to_i }, Rails.application.secret_key_base)
    get "/validate_token", headers: { "Authorization" => "Bearer #{expired}" }

    assert_response :unauthorized
  end
end

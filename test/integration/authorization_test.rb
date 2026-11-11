require "test_helper"

# Spot checks of the role rules in app/models/ability.rb.
class AuthorizationTest < ActionDispatch::IntegrationTest
  def create_account_as(user)
    post "/api/v1/accounts", params: { account: { account_num: "AUTH-#{user.id}" } },
                             headers: auth_headers_for(user), as: :json
  end

  def create_expense_as(user)
    post "/api/v1/expenses", params: { expense: {
      account_id: accounts(:open_study).id, expense_category_id: expense_categories(:salary).id,
      expense_sub_category_id: expense_sub_categories(:coordinator).id,
      invoice_num: "AUTH-#{user.id}", amount: 10, invoice_date: Date.current.to_s
    } }, headers: auth_headers_for(user), as: :json
  end

  test "power users manage accounts" do
    create_account_as(users(:power_user))
    assert_response :success
  end

  test "regular (data entry) users cannot create accounts but can create expenses" do
    create_account_as(users(:data_entry))
    assert_response :unauthorized

    create_expense_as(users(:data_entry))
    assert_response :success
  end

  test "viewers can read but not write" do
    get "/api/v1/accounts", headers: auth_headers_for(users(:viewer))
    assert_response :success

    create_account_as(users(:viewer))
    assert_response :unauthorized
    create_expense_as(users(:viewer))
    assert_response :unauthorized
  end

  test "only admins manage users" do
    post "/users", params: { user: { email: "x@test.example", password: "pw-123456" } },
                   headers: auth_headers_for(users(:power_user)), as: :json
    assert_response :unauthorized
  end
end

require "test_helper"

class ApiReadTest < ActionDispatch::IntegrationTest
  INDEX_ENDPOINTS = %w[
    /api/v1/accounts /api/v1/accounts2 /api/v1/expenses /api/v1/revenues
    /api/v1/expense_categories /api/v1/expense_sub_categories /api/v1/revenue_categories
    /api/v1/account_amendments
    /api/v1/revenue_list /api/v1/expense_list /api/v1/revenue_transactions /api/v1/expense_transactions
    /api/v1/billable /api/v1/receivable /api/v1/revenue_past3years /api/v1/revenue_currentyear
    /api/v1/revenue_current_ri_year /api/v1/revenue_past_ri_year /api/v1/expense_currentyear
  ].freeze

  setup { @headers = auth_headers_for(users(:admin)) }

  INDEX_ENDPOINTS.each do |path|
    test "GET #{path} returns JSON for a logged-in user" do
      get path, headers: @headers

      assert_response :success
      assert_equal "application/json", response.media_type
      assert_kind_of Array, json
    end

    test "GET #{path} requires a token" do
      get path

      assert_response :unauthorized
    end
  end

  test "GET /api/v1/accounts/:id returns the account" do
    get "/api/v1/accounts/#{accounts(:open_study).id}", headers: @headers

    assert_response :success
    assert_equal "07191-005-111", json["account_num"]
  end

  test "GET /api/v1/accounts/:id/transactions returns the account" do
    get "/api/v1/accounts/#{accounts(:open_study).id}/transactions", headers: @headers

    assert_response :success
    assert_equal accounts(:open_study).id, json["id"]
  end

  test "GET /api/v1/account_amendments/:id returns the amendment" do
    get "/api/v1/account_amendments/#{account_amendments(:budget_v2).id}", headers: @headers

    assert_response :success
    assert_equal "v2", json["budget_version"]
  end

  test "GET /api/v1/expenses lists expenses" do
    get "/api/v1/expenses", headers: @headers

    assert_includes json.map { |e| e["invoice_num"] }, "E-1"
  end

  test "billable totals only open accounts" do
    get "/api/v1/billable", headers: @headers

    assert_equal ["07191-005-111"], json.map { |a| a["account_num"] }
  end

  test "GET /users lists users for an admin" do
    get "/users", headers: @headers

    assert_response :success
    assert_equal users.size, json.size
  end

  test "GET /users is refused for a non-admin" do
    get "/users", headers: auth_headers_for(users(:power_user))

    assert_response :unauthorized
  end

  test "GET /roles.json lists roles" do
    get "/roles.json", headers: @headers

    assert_response :success
    assert_equal %w[admin data_entry power_user viewer], json.map { |r| r["name"] }.sort
  end
end

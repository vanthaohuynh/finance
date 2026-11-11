require "test_helper"

# Create -> read back -> update -> delete for each main model, through the JSON API.
class ApiCrudTest < ActionDispatch::IntegrationTest
  setup { @headers = auth_headers_for(users(:admin)) }

  # Runs the round trip and returns nothing; each step asserts on the HTTP response and the database.
  def round_trip(model:, path:, param_key:, create:, update:, write_only: [])
    assert_difference -> { model.count }, 1 do
      post path, params: { param_key => create }, headers: @headers, as: :json
    end
    assert_response :success
    id = json.fetch("id")
    record = model.find(id)
    create.except(*write_only).each { |attr, value| assert_equal value.to_s, record.public_send(attr).to_s, "created #{attr}" }

    patch "#{path}/#{id}", params: { param_key => update }, headers: @headers, as: :json
    assert_response :success
    record.reload
    yield record if block_given?
    update.each { |attr, value| assert_equal value.to_s, record.public_send(attr).to_s, "updated #{attr}" }

    assert_difference -> { model.count }, -1 do
      delete "#{path}/#{id}", headers: @headers, as: :json
    end
    assert_response :success
    assert_not model.exists?(id)
  end

  test "accounts" do
    round_trip model: Account, path: "/api/v1/accounts", param_key: :account,
               create: { account_num: "07191-005-200", study_name: "NEW-1", status: "Open", pi_name: "Dr. New" },
               update: { status: "Closed", notes: "Enrolment finished" }
  end

  test "expenses" do
    round_trip model: Expense, path: "/api/v1/expenses", param_key: :expense,
               create: { account_id: accounts(:open_study).id, expense_category_id: expense_categories(:salary).id,
                         expense_sub_category_id: expense_sub_categories(:coordinator).id,
                         invoice_num: "E-200", amount: 123.45, invoice_date: Date.current.to_s },
               update: { amount: 200.0, supplier: "New supplier" }
  end

  test "revenues" do
    round_trip model: Revenue, path: "/api/v1/revenues", param_key: :revenue,
               create: { account_id: accounts(:open_study).id, revenue_category_id: revenue_categories(:sales).id,
                         invoice_num: "R-200", amount: 900.0, invoice_date: Date.current.to_s },
               update: { deposit_date: Date.current.to_s, overhead: 270.0 }
  end

  test "account amendments" do
    round_trip model: AccountAmendment, path: "/api/v1/account_amendments", param_key: :account_amendment,
               create: { account_id: accounts(:open_study).id, budget_version: "v3",
                         targeted_enrolling_number: 50, cta_date: Date.current.to_s },
               update: { notes: "Amended budget", count: 2 }
  end

  test "expense categories" do
    round_trip model: ExpenseCategory, path: "/api/v1/expense_categories", param_key: :expense_category,
               create: { name: "Travel", description: "Conference travel" },
               update: { description: "Travel and lodging" }
  end

  test "expense sub categories" do
    round_trip model: ExpenseSubCategory, path: "/api/v1/expense_sub_categories", param_key: :expense_sub_category,
               create: { expense_code: "SAL-PM", name: "Project manager", expense_category_id: expense_categories(:salary).id },
               update: { description: "Project management" }
  end

  test "revenue categories" do
    round_trip model: RevenueCategory, path: "/api/v1/revenue_categories", param_key: :revenue_category,
               create: { name: "Grant", description: "Research grants" },
               update: { description: "Research and foundation grants" }
  end

  test "users" do
    round_trip model: User, path: "/users", param_key: :user,
               create: { email: "new.user@test.example", password: "s3cret-pass", role_id: roles(:viewer).id, role_name: "viewer" },
               update: { role_id: roles(:power_user).id, role_name: "power_user" },
               write_only: [:password] do |user|
      assert user.authenticate("s3cret-pass"), "password is stored as a bcrypt digest"
      # Regression: the update used to be applied to the logged-in admin instead of the target user.
      assert_equal roles(:admin).id, users(:admin).reload.role_id
    end
  end

  test "invalid records are rejected with 422" do
    post "/api/v1/expenses", params: { expense: { amount: -1 } }, headers: @headers, as: :json

    assert_response :unprocessable_entity
    assert json.key?("amount")
  end
end

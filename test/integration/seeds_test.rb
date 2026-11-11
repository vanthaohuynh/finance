require "test_helper"

class SeedsTest < ActionDispatch::IntegrationTest
  DEMO_LOGINS = {
    "regular@example.com" => ["regular-demo-1", "data_entry", 1],
    "poweruser@example.com" => ["poweruser-demo-1", "power_user", 2],
    "admin@example.com" => ["admin-demo-1", "admin", 3]
  }.freeze

  setup do
    # Start from an empty database so the seeds get the role ids the frontend expects.
    [Expense, Revenue, AccountAmendment, ExpenseSubCategory, ExpenseCategory, RevenueCategory, Account, User, Role]
      .each(&:delete_all)
  end

  def load_seeds
    load Rails.root.join("db/seeds.rb")
  end

  test "seeds are idempotent" do
    load_seeds
    counts = [Role, User, Account, AccountAmendment, ExpenseCategory, ExpenseSubCategory, RevenueCategory, Expense, Revenue]
             .to_h { |model| [model.name, model.count] }
    assert counts.values.all?(&:positive?), "every model gets sample data: #{counts}"

    load_seeds
    assert_equal counts, counts.keys.to_h { |name| [name, name.constantize.count] }
  end

  test "each demo login works and has the expected role" do
    load_seeds

    DEMO_LOGINS.each do |email, (password, role_name, role_id)|
      post "/login", params: { email: email, password: password }, as: :json
      assert_response :success, email
      assert_equal role_id, json.dig("user", "role_id"), email
      assert_equal role_name, User.find_by!(email: email).role.name
    end
  end
end

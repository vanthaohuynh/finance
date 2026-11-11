# Sample data and demo logins for development, review apps and the demo site.
#
#   bin/rails db:seed            # safe to run repeatedly: records are found or created, never duplicated
#
# Demo logins are created in every environment except production. To create them in
# production too (e.g. the demo deployment), run with SEED_DEMO_USERS=1. Never do that
# on a deployment holding real data: the passwords below are public.
#
# Roles: the backend (User#admin?, Ability) checks the role *name*, while the React app
# checks the role *id* (1 = expenses only, 3 = admin, 4 = accounts/revenues/expenses,
# anything else = everything except Users). Seed both so they agree.

ROLES = [
  { id: 1, name: "data_entry", description: "Regular: data entry for expenses only" },
  { id: 2, name: "power_user", description: "PowerUser: can create and edit accounts, expenses, revenues and categories" },
  { id: 3, name: "admin",      description: "Admin: can perform any operation on any resource, including users" },
  { id: 4, name: "viewer",     description: "Viewer: read-only access to accounts, expenses and revenues (default for new users)" }
].freeze

DEMO_USERS = [
  { label: "Regular",   email: "regular@example.com",   password: "regular-demo-1",   role: "data_entry" },
  { label: "PowerUser", email: "poweruser@example.com", password: "poweruser-demo-1", role: "power_user" },
  { label: "Admin",     email: "admin@example.com",     password: "admin-demo-1",     role: "admin" }
].freeze

ActiveRecord::Base.transaction do
  # --- Roles -------------------------------------------------------------------
  ROLES.each do |attrs|
    role = Role.find_by(name: attrs[:name])
    if role.nil?
      # Use the id the frontend expects when it is free; otherwise let the database pick one.
      id = Role.exists?(attrs[:id]) ? nil : attrs[:id]
      role = Role.create!(attrs.slice(:name, :description).merge(id: id).compact)
    end
    role.update!(description: attrs[:description]) if role.description.blank?
  end
  ActiveRecord::Base.connection.reset_pk_sequence!(Role.table_name)

  # --- Demo users --------------------------------------------------------------
  if !Rails.env.production? || ENV["SEED_DEMO_USERS"].present?
    DEMO_USERS.each do |attrs|
      role = Role.find_by!(name: attrs[:role])
      User.find_or_create_by!(email: attrs[:email]) do |user|
        user.password = attrs[:password]
        user.role = role
        user.role_name = role.name
      end
    end
  end

  # --- Reference data ----------------------------------------------------------
  expense_categories = {
    "Salary"    => "Research staff salaries",
    "MRI"       => "Imaging fees",
    "Medical"   => "Medical procedures and supplies",
    "iLab fees" => "Core facility (iLab) charges",
    "Other"     => "Anything else"
  }.to_h do |name, description|
    [name, ExpenseCategory.find_or_create_by!(name: name) { |c| c.description = description }]
  end

  sub_categories = [
    { code: "SAL-RC", name: "Research coordinator", category: "Salary" },
    { code: "SAL-RA", name: "Research assistant",   category: "Salary" },
    { code: "MRI-3T", name: "3T MRI scan",          category: "MRI" },
    { code: "MED-BL", name: "Blood work",           category: "Medical" },
    { code: "ILB-01", name: "iLab core services",   category: "iLab fees" },
    { code: "OTH-01", name: "Miscellaneous",        category: "Other" }
  ].to_h do |attrs|
    category = expense_categories.fetch(attrs[:category])
    sub = ExpenseSubCategory.find_or_create_by!(expense_code: attrs[:code]) do |s|
      s.name = attrs[:name]
      s.description = attrs[:name]
      s.expense_category = category
      s.expense_category_name = category.name
    end
    [attrs[:code], sub]
  end

  revenue_categories = {
    "Sales"   => "Per-patient payments",
    "Service" => "Start-up and service fees",
    "Other"   => "Anything else"
  }.to_h do |name, description|
    [name, RevenueCategory.find_or_create_by!(name: name) { |c| c.description = description }]
  end

  # --- Accounts (studies) ------------------------------------------------------
  today = Date.current
  accounts = [
    { account_num: "07191-005-111", study_name: "CARDIO-1", study_title: "Cardiac outcomes study", pi_name: "Dr. Alpha",
      sponsor_name: "Acme Pharma", status: "Open", targeted_enrolling_number: 40, budget_currency: "CAD" },
    { account_num: "07191-005-112", study_name: "NEURO-2", study_title: "Neuro imaging study", pi_name: "Dr. Beta",
      sponsor_name: "Globex", status: "Open", targeted_enrolling_number: 25, budget_currency: "USD" },
    { account_num: "07191-005-113", study_name: "ONCO-3", study_title: "Oncology follow-up study", pi_name: "Dr. Gamma",
      sponsor_name: "Initech", status: "Closed", targeted_enrolling_number: 10, budget_currency: "CAD" }
  ].map do |attrs|
    Account.find_or_create_by!(account_num: attrs[:account_num]) do |a|
      a.assign_attributes(attrs.merge(cta_date: today - 1.year, budget_version: "v1", invoicing_terms: "Net 30"))
    end
  end

  accounts.each do |account|
    AccountAmendment.find_or_create_by!(account: account, budget_version: "v2") do |am|
      am.account_num = account.account_num
      am.study_name = account.study_name
      am.targeted_enrolling_number = account.targeted_enrolling_number.to_i + 5
      am.cta_date = today - 3.months
      am.count = 1
    end
  end

  # --- Expenses and revenues spread over the last 6 months so the dashboard has data ----
  accounts.each_with_index do |account, a|
    6.times do |m|
      date = (today - m.months).beginning_of_month + (a * 3).days

      sub = sub_categories.values[(a + m) % sub_categories.size]
      Expense.find_or_create_by!(invoice_num: "DEMO-E-#{account.id}-#{m}") do |e|
        e.account = account
        e.account_num = account.account_num
        e.expense_category = sub.expense_category
        e.expense_category_name = sub.expense_category.name
        e.expense_sub_category = sub
        e.expense_sub_category_name = sub.name
        e.expense_sub_category_code = sub.expense_code
        e.amount = 500 + (100 * a) + (50 * m)
        e.invoice_date = date
        e.payment_date = date + 15.days
        e.expense_currency = account.budget_currency
        e.supplier = "Demo supplier"
      end

      category = revenue_categories.values[(a + m) % revenue_categories.size]
      Revenue.find_or_create_by!(invoice_num: "DEMO-R-#{account.id}-#{m}") do |r|
        r.account = account
        r.account_num = account.account_num
        r.revenue_category = category
        r.revenue_category_name = category.name
        r.amount = 1_000 + (200 * a) + (75 * m)
        r.overhead = (r.amount * 0.3).round(2)
        r.after_overhead = r.amount - r.overhead
        r.calculate_over_head = true
        r.invoice_date = date
        r.deposit_date = m.zero? ? nil : date + 20.days # latest month still receivable
        r.revenue_currency = account.budget_currency
      end
    end
  end
end

puts "Seeded: #{Role.count} roles, #{User.count} users, #{Account.count} accounts, " \
     "#{Expense.count} expenses, #{Revenue.count} revenues" unless Rails.env.test?

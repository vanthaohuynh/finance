# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_23_155817) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "account_num"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "muhc_account"
    t.string "study_title"
    t.string "study_name"
    t.string "sponsor_name"
    t.string "sponsor_contact"
    t.integer "number_of_patients"
    t.date "cta_date"
    t.string "phase"
    t.string "cim_contact"
    t.string "cro_name"
    t.string "cro_contact"
    t.string "budget_version"
    t.string "budget_currency"
    t.string "invoicing_terms"
    t.text "notes"
  end

  create_table "expense_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expenses", force: :cascade do |t|
    t.date "invoice_date"
    t.float "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.bigint "expense_category_id", null: false
    t.string "invoice_num"
    t.string "currency"
    t.text "notes"
    t.index ["account_id"], name: "index_expenses_on_account_id"
    t.index ["expense_category_id"], name: "index_expenses_on_expense_category_id"
  end

  create_table "revenue_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "revenues", force: :cascade do |t|
    t.date "invoice_date"
    t.float "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.bigint "revenue_category_id", null: false
    t.string "invoice_num"
    t.string "currency"
    t.text "notes"
    t.index ["account_id"], name: "index_revenues_on_account_id"
    t.index ["revenue_category_id"], name: "index_revenues_on_revenue_category_id"
  end

  add_foreign_key "expenses", "accounts"
  add_foreign_key "expenses", "expense_categories"
  add_foreign_key "revenues", "accounts"
  add_foreign_key "revenues", "revenue_categories"
end

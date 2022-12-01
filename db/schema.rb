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

ActiveRecord::Schema[7.0].define(version: 2022_11_29_144536) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_amendments", force: :cascade do |t|
    t.string "budget_version"
    t.integer "targeted_enrolling_number"
    t.date "cta_date"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.integer "count"
    t.string "account_num"
    t.string "study_name"
    t.index ["account_id"], name: "index_account_amendments_on_account_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "account_num"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "study_title"
    t.string "sponsor_name"
    t.string "sponsor_contact"
    t.integer "targeted_enrolling_number"
    t.date "cta_date"
    t.string "cro_name"
    t.string "cro_contact"
    t.string "budget_version"
    t.string "budget_currency"
    t.string "invoicing_terms"
    t.text "notes"
    t.string "pi_name"
    t.string "status"
    t.string "study_name"
    t.float "expense_total"
    t.float "revenue_total"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "expense_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
  end

  create_table "expenses", force: :cascade do |t|
    t.date "invoice_date"
    t.float "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.bigint "expense_category_id", null: false
    t.string "invoice_num"
    t.string "expense_currency"
    t.text "notes"
    t.string "account_num"
    t.string "expense_category_name"
    t.index ["account_id"], name: "index_expenses_on_account_id"
    t.index ["expense_category_id"], name: "index_expenses_on_expense_category_id"
  end

  create_table "revenue_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
  end

  create_table "revenues", force: :cascade do |t|
    t.date "invoice_date"
    t.float "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.bigint "revenue_category_id", null: false
    t.string "invoice_num"
    t.string "revenue_currency"
    t.text "notes"
    t.float "overhead"
    t.float "after_overhead"
    t.string "account_num"
    t.string "revenue_category_name"
    t.date "deposit_date"
    t.index ["account_id"], name: "index_revenues_on_account_id"
    t.index ["revenue_category_id"], name: "index_revenues_on_revenue_category_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.string "account_num"
    t.string "invoice_num"
    t.date "invoice_date"
    t.string "transaction_type"
    t.string "transaction_category"
    t.float "transaction_amount"
    t.string "transaction_currency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "account_id", null: false
    t.index ["account_id"], name: "index_transactions_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "account_amendments", "accounts"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "expenses", "accounts"
  add_foreign_key "expenses", "expense_categories"
  add_foreign_key "revenues", "accounts"
  add_foreign_key "revenues", "revenue_categories"
  add_foreign_key "transactions", "accounts"
  add_foreign_key "users", "roles"
end

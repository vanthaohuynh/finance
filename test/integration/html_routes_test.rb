require "test_helper"

# Every client-side route is served by SiteController#index, which renders the React mount point.
class HtmlRoutesTest < ActionDispatch::IntegrationTest
  ROUTES = %w[
    / /dashboard /registration /admin
    /users/1/edit
    /accounts /accounts/new /accounts/1 /accounts/1/edit /accounts/1/transactions
    /expenses /expenses/new /expenses/1 /expenses/1/edit
    /revenues /revenues/new /revenues/1 /revenues/1/edit
    /expense_categories /expense_categories/new /expense_categories/1 /expense_categories/1/edit
    /expense_sub_categories /expense_sub_categories/new /expense_sub_categories/1 /expense_sub_categories/1/edit
    /revenue_categories /revenue_categories/new /revenue_categories/1 /revenue_categories/1/edit
  ].freeze

  ROUTES.each do |path|
    test "GET #{path} serves the React app" do
      get path

      assert_response :success
      assert_equal "text/html", response.media_type
      assert_select "div#root"
      assert_select "script[src*=application]"
    end
  end

  # Known quirk kept as-is: `resources :users` is declared before `get 'users', to: 'site#index'`,
  # so a full page load of /users hits UsersController#index (JSON) instead of the React app.
  test "GET /users is routed to the JSON users index, not the React app" do
    get "/users"

    assert_response :unauthorized
    assert_equal "application/json", response.media_type
  end

  # Same quirk: /users/new matches UsersController#show with id "new".
  test "GET /users/new is routed to UsersController#show, not the React app" do
    get "/users/new"

    assert_response :not_found
  end

  test "the layout links the favicon and touch icon, and they are served" do
    get "/"
    assert_select "link[rel=icon][href='/favicon.ico']"
    assert_select "link[rel=apple-touch-icon][href='/apple-touch-icon.png']"

    %w[/favicon.ico /icon.png /apple-touch-icon.png].each do |path|
      get path
      assert_response :success, path
      assert_operator response.body.bytesize, :>, 0, "#{path} is not empty"
    end
  end

  test "the JavaScript bundle is served" do
    get "/assets/application.js"

    assert_response :success
  end
end

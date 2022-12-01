Rails.application.routes.draw do
  resources :roles
  resources :users

  # scope '/admin' do
  #   resources :users
  # end

  # resources :sessions, only: [:create]
  # resources :registrations, only: [:create]
  # delete :logout, to: 'sessions#logout'
  # get :logged_in, to: 'sessions#logged_in'
  # post :login, to: 'sessions#create'
  post :login, to: 'users#login'
  get :validate_token, to: 'users#validate_token'

  # get :transactions, to: 'accounts#transactions'

  # post "/signup", to: "users#create"
  # get :authorized, to: 'sessions#show'

  root to: 'site#index'

  get 'home', to: 'site#index'
  get 'dashboard', to: 'site#index'
  get 'registration', to: 'site#index'

  get 'accounts', to: 'site#index'
  get 'accounts/new', to: 'site#index'
  get 'accounts/:id', to: 'site#index'
  get 'accounts/:id/edit', to: 'site#index'

  get 'expenses', to: 'site#index'
  get 'expenses/new', to: 'site#index'
  get 'expenses/:id', to: 'site#index'
  get 'expenses/:id/edit', to: 'site#index'

  get 'revenues', to: 'site#index'
  get 'revenues/new', to: 'site#index'
  get 'revenues/:id', to: 'site#index'
  get 'revenues/:id/edit', to: 'site#index'

  get 'expense_categories', to: 'site#index'
  get 'expense_categories/new', to: 'site#index'
  get 'expense_categories/:id', to: 'site#index'
  get 'expense_categories/:id/edit', to: 'site#index'

  get 'revenue_categories', to: 'site#index'
  get 'revenue_categories/new', to: 'site#index'
  get 'revenue_categories/:id', to: 'site#index'
  get 'revenue_categories/:id/edit', to: 'site#index'

  get 'accounts/:id/transactions', to: 'site#index'

  namespace :api do
    namespace :v1 do
      resources :expenses, only: %i[index show create update destroy]
      resources :accounts, only: %i[index show create update destroy]
      resources :accounts2, only: %i[index]
      resources :accounts3, only: %i[index]
      resources :revenues, only: %i[index show create update destroy]
      resources :expense_categories, only: %i[index show create update destroy]
      resources :revenue_categories, only: %i[index show create update destroy]
      resources :account_amendments, only: %i[index show create update destroy]
      get 'accounts/:id/transactions', to: 'accounts#transactions', as: 'account_transactions'
      # get 'transactions', to: 'transactions#index'
      get 'revenue_transactions', to: 'transactions#revenue_transactions'
      get 'expense_transactions', to: 'transactions#expense_transactions'
      get 'billable', to: 'transactions#billable'
      get 'receivable', to: 'transactions#receivable'
      get 'revenue_past3years', to: 'transactions#revenue_past3years'
      get 'revenue_currentyear', to: 'transactions#revenue_currentyear'
      get 'revenue_current_ri_year', to: 'transactions#revenue_current_ri_year'
      get 'revenue_past_ri_year', to: 'transactions#revenue_past_ri_year'
      get 'expense_currentyear', to: 'transactions#expense_currentyear'
    end
  end
end

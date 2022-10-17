Rails.application.routes.draw do
  # get 'welcome/index'
  # get 'site/index'
  # root to: 'welcome#index'
  root to: 'site#index'

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

  namespace :api do
    namespace :v1 do
      resources :events, only: %i[index show create update destroy]
      resources :expenses, only: %i[index show create update destroy]
      resources :accounts, only: %i[index show create update destroy]
      resources :accounts2, only: %i[index show create update destroy]
      resources :revenues, only: %i[index show create update destroy]
      resources :expense_categories, only: %i[index show create update destroy]
      resources :revenue_categories, only: %i[index show create update destroy]
      resources :account_amendments, only: %i[index show create update destroy]
    end
  end
end

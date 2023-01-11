# frozen_string_literal: true

if Rails.env === 'production'
  # Rails.application.config.session_store :cookie_store, key: '_dovee', domain: 'dovee-finance.herokuapp.com'
  Rails.application.config.session_store :cookie_store, key: '_dovee', domain: 'dovee-finance.onrender.com'
else
  Rails.application.config.session_store :cookie_store, key: '_dovee'
end

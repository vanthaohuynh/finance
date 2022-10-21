# frozen_string_literal: true


if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_dovee', domain: 'dovee-finance.herokuapp.com', same_site: :Strict
else
  Rails.application.config.session_store :cookie_store, key: '_dovee', same_site: :Strict
end

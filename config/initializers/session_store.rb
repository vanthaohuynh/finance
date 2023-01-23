# frozen_string_literal: true

if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_vanthao', domain: 'vanthao.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_vanthao'
end

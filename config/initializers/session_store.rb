if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_dovee', domain: 'dovee.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_dovee'
end
# Rails.application.config.session_store :cookie_store, key: '_dovee', domain: 'conggiaomontreal.ca'

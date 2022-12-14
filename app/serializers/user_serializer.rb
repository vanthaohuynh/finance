class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role_id, :password, :password_confirmation, :role_name
end

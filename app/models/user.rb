class User < ApplicationRecord
  has_secure_password
  belongs_to :role

  validates_presence_of :email
  validates_uniqueness_of :email
  before_save :assign_role

  def admin?
    role.name == 'admin' if role
  end

  def data_entry?
    role.name == 'data_entry' if role
  end

  def power_user?
    role.name == 'power_user' if role
  end

  def viewer?
    role.name == 'viewer' if role
  end

  def assign_role
    self.role = Role.find_by name: 'viewer' if role.nil?
  end
end

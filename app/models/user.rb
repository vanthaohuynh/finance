class User < ApplicationRecord
  has_secure_password
  belongs_to :role

  validates_presence_of :email
  validates_uniqueness_of :email
  before_save :assign_role

  def admin?
    role.name == 'admin' if role
  end

  def regular?
    role.name == 'regular' if role
  end

  def power_user?
    role.name == 'power_user' if role
  end

  def assign_role
    self.role = Role.find_by name: 'regular' if role.nil?
  end
end

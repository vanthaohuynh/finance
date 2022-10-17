# frozen_string_literal: true
class Ability
  include CanCan::Ability

  def initialize(user)
    if user.regular?
      can :manage, [Expense]
    elsif user.poweruser?
      can :manage, [Item, Account, Expense, Revenue, ExpenseCategory, RevenueCategory]
    elsif user.admin?
      can :manage, :all
    end
  end
end

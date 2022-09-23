class Revenue < ApplicationRecord
  belongs_to :account
  belongs_to :revenue_category
end

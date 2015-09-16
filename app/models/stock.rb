class Stock < ActiveRecord::Base
  validates :symbol, presence: true, uniqueness: true
end

class Stock < ActiveRecord::Base
  validates :symbol, presence: true
end

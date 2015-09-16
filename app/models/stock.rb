class Stock < ActiveRecord::Base
  validates :symbol, presence: true, uniqueness: true

  def self.stock_autocomplete_array
    stock_arr = []
    self.all.each do |stock|
      stock_arr << {
                    :value => stock.symbol,
                    :label => "#{stock.symbol} - #{stock.company_name}"}
    end

    stock_arr
  end
end

class Stock < ActiveRecord::Base
  validates :symbol, presence: true, uniqueness: true

  def self.searched_stocks(query)
    if query.blank?
      results = []
    else
      results = where("(symbol LIKE ?) OR (company_name LIKE ?)", "%#{query.upcase}%", "%#{query.capitalize}%")
    end
  end

  def self.stock_autocomplete_array(query)
    stock_arr = []

    searched_stocks(query).each do |stock|
      stock_arr << {
                    :value => stock.symbol,
                    :label => "#{stock.symbol} - #{stock.company_name}"}
    end

    stock_arr
  end
end

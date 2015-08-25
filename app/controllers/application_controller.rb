class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  # methods to get the stock price data from Yahoo Finance
  # def self.get_price_data(stock_symbol, days)
  #   self.new.get_price_data(stock_symbol, days)
  # end

  # def get_price_data(stock_symbol, days)
  #   # the data will be in the format of
  #   # [day1Object, day2Object, ...]
  #   # where each object contains date, open, high, low, close, volume, symbol, and adjusted price
  #   arr_of_hash_data = []
  #   YahooFinance::get_HistoricalQuotes_days(stock_symbol,days) do |day_data|
  #     arr_of_hash_data << day_data
  #   end
  #   arr_of_hash_data
  # end
end

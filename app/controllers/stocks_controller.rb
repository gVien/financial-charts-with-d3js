class StocksController < ApplicationController
  # include ApplicationHelper

  def index
    redirect_to root_path
  end

  def create
    # default value of period is 30 days if it is left blanked
    params[:period] = 30 if params[:period] == ""

    @stock = Stock.new(symbol: params[:symbol])
    p "*" * 100
    p @stock
    p "*" * 100

    if request.xhr?
      @stock.save
      @data = YahooFinanceDataCollector.get_price_data(@stock.symbol, params[:period].to_i)
          p "*" * 100
    p @data
    p "*" * 100
      # render json: @data
    end
  end
end

class StocksController < ApplicationController
  # include ApplicationHelper

  def index
    render json: {stocks: Stock.stock_autocomplete_array}
  end

  def create
    # default value of period is 30 days if it is left blanked
    params[:period] = 30 if params[:period] == ""

    if request.xhr?
      @data = YahooFinanceDataCollector.get_price_data(params[:symbol], params[:period].to_i)
      render json: @data
    end
  end
end

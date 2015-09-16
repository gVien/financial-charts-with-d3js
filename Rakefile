# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require "csv"

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

# another option is to seed the stocks data from the csv file
desc "Import stock symbols and names from csv file"
task :import => [:environment] do

  # file = "db/companylist.csv" # this contains over 5k of stocks
  stock_file = "db/yahoo-tickers-jan-2015-stock.csv"
  etf_file = "db/yahoo-tickers-jan-2015-etf.csv"

  # add stocks
  CSV.foreach(stock_file, :headers => true) do |row|
    Stock.create({
      symbol: row[0],
      company_name: row[1]
    })
  end

  # add etfs
  CSV.foreach(etf_file, :headers => true) do |row|
    Stock.create({
      symbol: row[0],
      company_name: row[1]
    })
  end

end
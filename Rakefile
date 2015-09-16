# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require "csv"

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

# another option is to seed the stocks data from the csv file
desc "Import stock symbols and names from csv file"
task :import => [:environment] do

  file = "db/companylist.csv"

  CSV.foreach(file, :headers => true) do |row|
    Stock.create({
      symbol: row[0].upcase,
      company_name: row[1].upcase
    })
  end

end
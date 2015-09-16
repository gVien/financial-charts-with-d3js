class AddIndexToStocks < ActiveRecord::Migration
  def change
    add_index :stocks, :symbol
    add_index :stocks, :company_name
  end
end

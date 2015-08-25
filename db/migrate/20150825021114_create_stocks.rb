class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false

      t.timestamps null: false
    end
  end
end

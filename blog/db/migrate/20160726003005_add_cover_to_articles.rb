class AddCoverToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :cover, :string
  end
end

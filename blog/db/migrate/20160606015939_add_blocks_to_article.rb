class AddBlocksToArticle < ActiveRecord::Migration
  def change
    add_column :articles, :blocks, :json
  end
end

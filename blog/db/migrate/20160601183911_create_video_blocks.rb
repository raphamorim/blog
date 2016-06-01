class CreateVideoBlocks < ActiveRecord::Migration
  def change
    create_table :video_blocks do |t|
      t.string :url
      t.integer :order
      t.references :article, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end

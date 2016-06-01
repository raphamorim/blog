class CreatePhotoBlocks < ActiveRecord::Migration
  def change
    create_table :photo_blocks do |t|
      t.string :path
      t.integer :order
      t.references :article, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end

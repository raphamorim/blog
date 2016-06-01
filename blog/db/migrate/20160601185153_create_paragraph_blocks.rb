class CreateParagraphBlocks < ActiveRecord::Migration
  def change
    create_table :paragraph_blocks do |t|
      t.text :paragraph
      t.integer :order
      t.references :article, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end

class CreateCodeBlocks < ActiveRecord::Migration
  def change
    create_table :code_blocks do |t|
      t.text :code
      t.integer :order
      t.references :article, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end

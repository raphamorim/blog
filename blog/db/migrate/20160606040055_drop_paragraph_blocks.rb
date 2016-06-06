class DropParagraphBlocks < ActiveRecord::Migration
  def change
    drop_table :paragraph_blocks
  end
end

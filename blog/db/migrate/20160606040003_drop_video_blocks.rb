class DropVideoBlocks < ActiveRecord::Migration
  def change
    drop_table :video_blocks
  end
end

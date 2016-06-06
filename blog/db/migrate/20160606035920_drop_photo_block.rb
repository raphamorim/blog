class DropPhotoBlock < ActiveRecord::Migration
  def change
    drop_table :photo_blocks
  end
end

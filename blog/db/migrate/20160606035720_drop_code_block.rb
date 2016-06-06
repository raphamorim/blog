class DropCodeBlock < ActiveRecord::Migration
  def change
    drop_table :code_blocks
  end
end

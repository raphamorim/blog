class CreateTalks < ActiveRecord::Migration
  def change
    create_table :talks do |t|
      t.string :title
      t.string :conf_name
      t.string :conf_link
      t.date :conf_date
      t.string :slides
      t.string :video

      t.timestamps null: false
    end
  end
end

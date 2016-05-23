class Article < ActiveRecord::Base

  has_many :comments, dependent: :destroy
  validates :title, presence: true,
                    length: { minimum: 5 }

  def self.search(search)
    if search
      self.where('title LIKE ?', "%#{search}%")
    else
      find(:all)
    end
  end
end

class Article < ActiveRecord::Base

  has_many :comments, dependent: :destroy
  validates :title, presence: true,
                    length: { minimum: 5 }


  def save

    self.permalink = self.title.parameterize unless self.permalink
    super
  end

  def to_param
    self.permalink
  end

  def self.search(search)
    if search
      self.where('title LIKE ?', "%#{search}%")
    else
      find(:all)
    end
  end
end

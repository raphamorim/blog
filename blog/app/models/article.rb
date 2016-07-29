class Article < ActiveRecord::Base

  validates :title, presence: true,
                    length: { minimum: 5 }
  has_many :taggings, :dependent => :destroy
  has_many :tags, through: :taggings


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

  def all_tags=(names)
    self.tags = names.split(",").map do |name|
      Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end
end

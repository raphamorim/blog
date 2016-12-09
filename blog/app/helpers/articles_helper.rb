module ArticlesHelper

  def get_share_image(article)

    @article.blocks.each do |key, hash|
      if hash.key?("photo")
        return root_url[0, root_url.size - 1] + hash["photo"]
      end
    end

  end
end

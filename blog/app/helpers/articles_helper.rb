module ArticlesHelper

  def get_share_image(article)

    if @article.blocks
      @article.blocks.each do |key, hash|
        if hash.key?("photo")
          return root_url[0, root_url.size - 1] + hash["photo"]["path"]
        end
      end
    end
    return ""
  end
end

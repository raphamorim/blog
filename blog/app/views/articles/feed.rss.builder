#encoding: UTF-8

xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Blog - Gustavo Pantuza"
    xml.author "Gustavo Pantuza"
    xml.description "Posts em português pra fortalecer a comunidade brasileira de ciência da computação"
    xml.link "https://blog.pantuza.com"
    xml.language "pt"

    for article in @articles
      xml.item do
        xml.title article.title
        xml.author "Gustavo Pantuza"
        xml.pubDate article.created_at.to_s(:rfc822)
        xml.link "https://blog.pantuza.com/articles/" + article.permalink
        xml.abstract = article.abstract
        xml.cover = article.cover
      end
    end
  end
end

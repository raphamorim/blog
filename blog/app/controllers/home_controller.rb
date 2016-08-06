class HomeController < ApplicationController
  def index
    @last_articles = Article.first(4)
  end
end

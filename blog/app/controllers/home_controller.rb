class HomeController < ApplicationController
  def index
    @last_articles = Article.first(3)
  end
end

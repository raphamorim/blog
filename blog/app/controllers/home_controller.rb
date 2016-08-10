class HomeController < ApplicationController
  include HomeHelper

  def index
    @last_articles = Article.first(4)
    @top_articles = get_top_articles()
  end
end

class HomeController < ApplicationController
  include HomeHelper
  include UsersHelper

  def index
    @last_articles = Article.last(4)
    @top_articles = get_top_articles()
    @recommended = recommendation()
  end
end

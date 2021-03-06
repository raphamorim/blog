class HomeController < ApplicationController
  include HomeHelper
  include UsersHelper

  def index
    @last_articles = Article.order('id DESC').last(8)
    @top_articles = get_top_articles()
    @recommended = recommendation()[0, 4]
  end
end

class TagsController < ApplicationController

  def index
    @tags = Tag.all
    @articles = Article.first(5)
  end

  def show
    @tag = Tag.find_by(:name => params[:id])
    @articles = Article.joins(:taggings).where("taggings.tag_id" => @tag.id)
    @tags = Tag.all
  end
end
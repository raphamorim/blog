class ArticlesController < ApplicationController
  include HomeHelper
  include UsersHelper
  include ArticlesHelper

  before_action :require_login, only: [:edit, :update,
                                       :create, :new, :destroy, :upload_cover]
  skip_before_filter :verify_authenticity_token, :only => :upload_cover

  def index
    @articles = Article.order("id DESC").all
  end

  def top_articles
    @articles = get_top_articles()
  end

  def recommended_articles
    @articles = recommendation()
  end

  def new
    @article = Article.new
  end

  def show
    @article = Article.find_by_permalink(params[:id])
    @image_share = get_share_image(@article)
  end

  def search
    @articles = Article.search(params[:q])
  end

  def feed
    @articles = Article.all
    respond_to do |format|
      format.rss { render :layout => false }
    end
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def edit
    @article = Article.find_by_permalink(params[:id])
  end

  def update
    @article = Article.find_by_permalink(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render 'edit'
    end
  end

  def destroy
    @article = Article.find_by_permalink(params[:id])
    @article.destroy

    redirect_to articles_path
  end

  def upload_cover()

    if params[:cover]
      @article = Article.find_by_permalink(params[:id])

      path_prefix = "uploads"
      uploaded_io = params[:cover]
      name = uploaded_io.original_filename
      digest = Digest::SHA1.hexdigest("#{name}-{Time.now.to_i}")
      path = Rails.root.join('public', path_prefix, digest)

      File.open(path, 'wb') do |file|
        file.write(uploaded_io.read)
      end

      @article.cover = "/" + path_prefix + "/" + digest
      @article.save
    end
    redirect_to articles_path
  end

  private

    def require_login
      if current_user == nil
        redirect_to root_url
      end
    end

    def article_params
      upload_photo

      params.require(:article).permit(
        :title, :subtitle, :abstract, :text, :cover, :all_tags, blocks: [:paragraph, :video, :code, photo: [:path, :caption]]
      )
    end

    def upload_photo()
      if params[:article][:blocks]
        params[:article][:blocks].each do |key, hash|

          if hash.key?(:photo)

            image_path = params[:article][:blocks][key][:photo]

            if not params[:article][:blocks][key][:photo].is_a? String

              path_prefix = "uploads"
              uploaded_io = params[:article][:blocks][key][:photo]
              name = uploaded_io.original_filename
              digest = Digest::SHA1.hexdigest("#{name}-{Time.now.to_i}")
              path = Rails.root.join('public', path_prefix, digest)

              File.open(path, 'wb') do |file|
                file.write(uploaded_io.read)
              end

              image_path = "/" + path_prefix + "/" + digest
            end

            new_value = {
              "path" => image_path,
              "caption" => params[:article]["photo-" + key + "-alt"]
            }

            params[:article].delete("photo-" + key + "-alt")
            params[:article][:blocks][key][:photo] = new_value
          end
        end
      end
    end
end

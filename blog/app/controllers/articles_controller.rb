class ArticlesController < ApplicationController

  http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]

  def index
    @articles = Article.all
  end

  def new
    @article = Article.new
  end

  def show
    @article = Article.find_by_permalink(params[:id])
  end

  def search
    @articles = Article.search(params[:q])
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

  private
    def article_params
      logger.debug "#{params[:article][:blocks]}"
      upload_photo
      params[:article][:blocks] = normalize_params

      params.require(:article).permit(
        :title, :subtitle, :abstract, :text, :all_tags, blocks: [:paragraph, :video, :photo, :code]
      )
    end

    def normalize_params()
      ar = []
      if params[:article][:blocks]
        params[:article][:blocks].each do |key, value|
          ar << Hash[key, value]
        end
      end
      ar
    end

    def upload_photo()
      if params[:article][:blocks][:photo]

        path_prefix = "uploads"
        uploaded_io = params[:article][:blocks][:photo]
        name = uploaded_io.original_filename
        digest = Digest::SHA1.hexdigest("#{name}-{Time.now.to_i}")
        path = Rails.root.join('public', path_prefix, digest)

        File.open(path, 'wb') do |file|
          file.write(uploaded_io.read)
        end

        params[:article][:blocks][:photo] = "/" + path_prefix + "/" + digest
      end
    end
end

require 'google/apis/analytics_v3'
require 'googleauth'

module HomeHelper

  TOP_ARTICLES_KEY = "top_articles"
  IN_A_DAY = 60 * 60 * 24

  def request_analytics_top_articles()

    scopes = ["https://www.googleapis.com/auth/analytics.readonly"]
    authorization = Google::Auth.get_application_default(scopes)
    authorization.fetch_access_token!

    analytics = Google::Apis::AnalyticsV3::AnalyticsService.new
    analytics.authorization = authorization
    @startDate = DateTime.now.prev_month.strftime("%Y-%m-%d")
    @endDate = DateTime.now.strftime("%Y-%m-%d")

    result = analytics.get_ga_data(
      ids="ga:126632208",
      start_date=@startDate,
      end_date=@endDate,
      metrics='ga:pageviews',
      :dimensions => 'ga:pageTitle,ga:pagePath',
      :sort => '-ga:pageviews'
    )
    result
  end

  def get_top_articles

    top_articles = []

    if $redis.exists(TOP_ARTICLES_KEY)
      articles = $redis.smembers(TOP_ARTICLES_KEY)
      articles.each do |json_article|
        article = Article.new
        top_articles.append(article.from_json(json_article))
      end

    else
      result = request_analytics_top_articles()
      result.rows.each do |row|
        if row[1].include? "/articles/" and not row[1].include? "/articles/new"
          article = Article.find_by_permalink(row[1].split("/articles/")[-1].split("/")[0])
          if article
            top_articles.append(article)
            $redis.sadd(TOP_ARTICLES_KEY, article.to_json)
          end
        end
      end
      $redis.expire(TOP_ARTICLES_KEY, IN_A_DAY)
    end

    top_articles
  end
end

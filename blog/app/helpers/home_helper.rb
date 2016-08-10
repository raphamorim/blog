require 'google/apis/analytics_v3'
require 'googleauth'

module HomeHelper

  def get_top_articles
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

    top_articles = []
    result.rows.each do |row|
      if row[1].include? "/articles/" and not row[1].include? "/articles/new"
        article = Article.find_by_permalink(row[1].split("/articles/")[-1].split("/")[0])
        top_articles.append(article)
      end
    end

    top_articles
  end
end

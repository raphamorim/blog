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

    result
  end
end

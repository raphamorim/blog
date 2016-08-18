require 'net/http'
require 'json'

require 'google/apis/analytics_v3'
require 'googleauth'

module UsersHelper

  IN_A_DAY = 60 * 60 * 24
  DEFAULT_LOCATION = "BR-RJ"

  def get_location_from_request()

    REGION_API = "http://localhost:8080/json/"

    url = URI.parse(REGION_API + request.remote_ip
    res = Net::HTTP.get(url)
    json = JSON.parse(res)

    location = json[:country_code] + "-" + json[:region_code]
    if location == "-"
      return DEFAULT_LOCATION
    end
    return location
  end

  def recommendation()

    location = get_location_from_request()
    recommended = []

    if $redis.exists(location)
      articles = $redis.smembers(location)
      articles.each do |json_article|
        article = Article.new
        recommended.append(article.from_json(json_article))
      end
    else
      result = request_analytics_by_location()
      result.rows.each do |row|
        if row[1].include? "/articles/" and not row[1].include? "/articles/new"
          article = Article.find_by_permalink(row[1].split("/articles/")[-1].split("/")[0])
          if article
            top_articles.append(article)
            $redis.sadd(location, article.to_json)
          end
        end
      end
      $redis.expire(location, IN_A_DAY)
    end
    recommended
  end

  def request_analytics_by_location()
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
      :dimensions => 'ga:pageTitle,ga:pagePath', # TODO: Change dimension to region segment
      :sort => '-ga:pageviews'
    )
    result
  end
end

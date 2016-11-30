require 'net/http'
require 'json'

require 'google/apis/analytics_v3'
require 'googleauth'

module UsersHelper

  IN_A_DAY = 60 * 60 * 24
  DEFAULT_LOCATION = "Brazil-Rio de Janeiro"
  REGION_API = $geoip + "/json/"

  def get_location_from_request()


    url = URI.parse(REGION_API + request.remote_ip)
    res = Net::HTTP.get(url)
    json = JSON.parse(res)

    if json[:country_name].nil? or json[:region_name].nil?
      return DEFAULT_LOCATION
    end

    json[:country_name] + "-" + json[:region_name]
  end

  def recommendation()

    location = get_location_from_request()
    recommended = []

    if $redis.exists(location)
      articles = $redis.smembers(location)
      articles.each do |json_article|
        article = Article.new
        recommended.push(article.from_json(json_article))
      end
    else
      result = request_analytics_by_location(location)
      result.rows.each do |row|
        if row[1].include? "/artigos/" and not row[1].include? "/artigos/new"
          article = Article.find_by_permalink(row[1].split("/artigos/")[-1].split("/")[0])
          if article
            recommended.push(article)
            $redis.sadd(location, article.to_json)
          end
        end
      end
      $redis.expire(location, IN_A_DAY)
    end
    recommended
  end

  def request_analytics_by_location(location)
    scopes = ["https://www.googleapis.com/auth/analytics.readonly"]
    authorization = Google::Auth.get_application_default(scopes)
    authorization.fetch_access_token!

    analytics = Google::Apis::AnalyticsV3::AnalyticsService.new
    analytics.authorization = authorization
    startDate = DateTime.now.prev_month.strftime("%Y-%m-%d")
    endDate = DateTime.now.strftime("%Y-%m-%d")
    country = location.split("-")[0]
    region = location.split("-")[1]

    result = analytics.get_ga_data(
      ids="ga:126632208",
      start_date=startDate,
      end_date=endDate,
      metrics='ga:pageviews',
      :max_results => 15,
      :dimensions => 'ga:pageTitle,ga:pagePath',
      :sort => '-ga:pageviews',
      :filters => "ga:country==#{country},ga:region==#{region}"
    )

    result
  end
end

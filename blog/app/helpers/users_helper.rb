require 'net/http'
require 'json'

module UsersHelper

  DEFAULT_STATE = "Minas Gerais"

  def get_state_from_request()

    REGION_API = "http://localhost:8080/json/"

    url = URI.parse(REGION_API + request.remote_ip
    res = Net::HTTP.get(url)
    json = JSON.parse(res)
    # return json region field
  end

  def recommendation()

    # get state. Otherwise default
    # Check cache of state. Otherwise request from analytics
    # if necessary, cache it and return
    binding.pry
  end
end

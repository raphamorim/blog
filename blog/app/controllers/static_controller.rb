class StaticController < ApplicationController

  def google
    path = request.env['PATH_INFO']
    render :layout => false, template: 'static' + path
  end

  def robots
    render :layout => false
  end

  def sitemap
    path = Rails.root.join("public", "sitemaps", "sitemap.xml")
    if File.exists?(path)
      render xml: open(path).read
    else
      render text: "Sitemap not found.", status: :not_found
    end
  end
end

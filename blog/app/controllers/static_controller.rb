class StaticController < ApplicationController

  def google
    path = request.env['PATH_INFO']
    render :layout => false, template: 'static' + path
  end
end

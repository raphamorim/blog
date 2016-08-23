class TalksController < ApplicationController
  def index
    @talks = Talks.all
  end

  def new
    @talk = Talks.new
  end

  def create
    @talk = Talks.new(talk_params)

    if @talk.save
      redirect_to talks_path
    else
      render 'new'
    end
  end

  def edit
    @talk = Talks.find(params[:id])
  end

  def update
    @talk = Talks.find(params[:id])

    if @talk.update(talk_params)
      redirect_to talks_path
    else
      render 'edit'
    end
  end

  def destroy
    @talk = Talks.find(params[:id])
    @talk.destroy

    redirect_to talks_path
  end

  private

    def require_login
      if current_user == nil
        redirect_to root_url
      end
    end

    def talks_params

      params.require(:talks).permit(
        :title, :conf_name, :conf_link, :conf_date, :slides, :video
      )
    end
end

class PublicController < ApplicationController
  #before_filter :redirect_unauthenticated
  def index
  end

  def redirect_unauthenticated
    redirect_to new_user_session_path unless signed_in?
  end
end
  

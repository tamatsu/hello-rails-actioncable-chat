class ApplicationController < ActionController::Base
  def home
    request.session[:user_id] = SecureRandom.uuid
  end
end

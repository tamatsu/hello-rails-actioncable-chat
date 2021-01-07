class ApplicationController < ActionController::Base
  def home
    cookies.encrypted[:user_id] = SecureRandom.uuid
  end
end

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    
    def connect
      self.current_user = auth_user
    end

    private
      def auth_user
        cookies.encrypted[:user_id] || reject_unauthorized_connection
      end
  end
end

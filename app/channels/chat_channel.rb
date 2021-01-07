class ChatChannel < ApplicationCable::Channel
  def setup
    @name = "chat"
  end

  def subscribed
    stream_from @name
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat(data)
    ActionCable.server.broadcast(@name, data['message'].to_s)
  end
end

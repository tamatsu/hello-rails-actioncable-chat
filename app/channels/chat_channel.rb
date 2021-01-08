class ChatChannel < ApplicationCable::Channel
  def subscribed
    @name = 'chat'
    stream_from @name
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat(data)
    msg = {
      user: current_user,
      content: data['message'].to_s
    }
    # debugger
    ActionCable.server.broadcast(@name, msg)
    # broadcast_to '', msg
    # transmit msg
  end
end

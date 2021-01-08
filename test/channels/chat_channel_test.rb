require "test_helper"

class ChatChannelTest < ActionCable::Channel::TestCase
  test "subscribes" do
    user = SecureRandom.uuid
    stub_connection(current_user: user)
    
    subscribe
    assert subscription.confirmed?
    assert_has_stream 'chat'

    perform :chat, message: 'hi!'
    assert_broadcast_on('chat', {
      user: user,
      content: 'hi!'
    })
  end
end

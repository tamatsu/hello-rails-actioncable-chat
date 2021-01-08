require 'test_helper'

class HomeTest < ActionDispatch::IntegrationTest
  test "home" do
    get root_path
    assert_select "#app"
  end
end

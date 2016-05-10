class AddMissingTimestamps < ActiveRecord::Migration
  def change
    add_timestamps :ideas
  end
end

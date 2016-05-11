require 'rails_helper'

RSpec.feature 'IdeaBox', type: :feature do
  scenario 'user creates a new idea', js: true do
    visit '/'

    fill_in 'title', with: "Idea one"
    fill_in 'body', with: "This is the idea one body"
    click_button "Save"
    wait_for_ajax

    expect(Idea.count).to eq 1

    expect(page).to have_content "Idea one"
    expect(page).to have_content 'This is the idea one body'
    expect(page).to have_content 'swill'
  end
end

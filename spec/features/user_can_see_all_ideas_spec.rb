require 'rails_helper'

RSpec.feature 'Visitor sees all ideas', js: true do
  scenario 'user can see a list of all ideas when page loads' do

    Idea.create(title: 'Idea one', body: 'this is the idea one body', quality: 0)
    Idea.create(title: 'Idea two', body: 'this is the idea two body', quality: 0)

    expect(Idea.count).to eq 2

    visit '/'
    wait_for_ajax

    expect(page).to have_content "Idea one"
    expect(page).to have_content "this is the idea one body"
    expect(page).to have_content "swill"
    expect(page).to have_content "Idea two"
    expect(page).to have_content "this is the idea two body"
    expect(page).to have_content "swill"
  end
end

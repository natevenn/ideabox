require 'rails_helper'

RSpec.feature 'Visitor visits home page', js: true do
  scenario 'user can thumbs up an idea' do

    idea = Idea.create(title: 'Idea one', body: 'this is the idea one body', quality: 0)

    expect(Idea.count).to eq 1

    visit '/'
    wait_for_ajax

    expect(page).to have_content "Idea one"
    expect(page).to have_content "this is the idea one body"
    expect(page).to have_content "swill"
    expect(idea.quality).to eq 0

    find('#up-vote').click

    expect(page).to have_content 'plausible'
    expect(Idea.first.quality).to eq 1
  end
end


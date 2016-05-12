require 'rails_helper'

RSpec.feature 'visitor visits home page' do
  scenario 'visitor searchs for ideas and sees only the ideas matching search', js: true do
    Idea.create(title: 'first idea', body: 'idea body one', quality: 0)
    Idea.create(title: 'second idea', body: 'idea body two', quality: 0)
    Idea.create(title: 'third idea', body: 'idea body three', quality: 0)

    visit '/'

    expect(page).to have_content 'first idea'
    expect(page).to have_content 'second idea'
    expect(page).to have_content 'third idea'

    fill_in 'search', with: 'first'

    expect(page).to have_content 'first idea'
    expect(page).not_to have_content 'second idea'
    expect(page).not_to have_content 'third idea'
  end
end

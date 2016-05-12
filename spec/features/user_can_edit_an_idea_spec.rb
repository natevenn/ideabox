require 'rails_helper'

RSpec.feature 'visitor visit home page' do
  scenario 'visit clicks on title and edits text', js: true do
    Idea.create(title: 'idea one', body: 'idea body', quality: 0)

    visit '/'

    expect(page).to have_content('idea one')
    expect(page).not_to have_content('idea one edited')

    find(".title").click
    find(".title").native.send_keys(' edited')
    find(".title").native.send_keys(:return)

    expect(page).to have_content('idea one edited')
  end

  scenario 'visit clicks on body and edits text', js: true do
    Idea.create(title: 'idea one', body: 'idea body', quality: 0)

    visit '/'

    expect(page).to have_content('idea body')
    expect(page).not_to have_content('idea body edited')

    find(".body").click
    find(".body").native.send_keys(' edited')
    find(".body").native.send_keys(:return)

    expect(page).to have_content('idea body edited')
  end
end

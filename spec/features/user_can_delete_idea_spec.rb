require 'rails_helper'

RSpec.feature 'Visitor visits home page', js: true do
  scenario 'user can delete and idea' do

    Idea.create(title: 'Idea one', body: 'this is the idea one body', quality: 0)

    expect(Idea.count).to eq 1

    visit '/'
    wait_for_ajax

    expect(page).to have_content "Idea one"
    expect(page).to have_content "this is the idea one body"
    expect(page).to have_content "swill"

    click_on 'Delete'

    expect(page).not_to have_content 'Idea one'
    expect(Idea.count).to eq 0
  end
end

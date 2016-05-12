require 'rails_helper'

RSpec.describe 'IdeaApi' do
  it 'returns a collection of all ideas' do
    Idea.create(title: 'first idea', body: 'idea body one', quality: 0)
    Idea.create(title: 'second idea', body: 'idea body two', quality: 0)
    Idea.create(title: 'third idea', body: 'idea body three', quality: 0)

    get '/api/v1/ideas'

    expect(response.status).to eq 200

    body = JSON.parse(response.body)

    expect(body.count).to eq 3

    expect(body[0]['title']).to eq 'first idea'
    expect(body[1]['title']).to eq 'second idea'
    expect(body[2]['title']).to eq 'third idea'
  end

  it 'creates an idea' do
    expect(Idea.count).to eq 0

    post "/api/v1/ideas", { idea: { title: "first idea", body: 'idea body', quality: 0 } }

    expect(Idea.count).to eq 1
    expect(Idea.first.title).to eq "first idea"
  end

  it 'updates an idea' do
    Idea.create(title: 'first idea', body: 'idea body one', quality: 0)

    put "/api/v1/ideas/#{Idea.first.id}", { idea: { title: 'first idea updated' } }

    expect(Idea.first.title).to eq 'first idea updated'
  end

  it 'delete an idea' do
    Idea.create(title: 'first idea', body: 'idea body one', quality: 0)

    expect(Idea.count).to eq 1

    delete "/api/v1/ideas/#{Idea.first.id}"

    expect(Idea.count).to eq 0
  end
end

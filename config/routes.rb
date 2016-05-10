Rails.application.routes.draw do
  root 'home#index'
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :ideas, except: [:edit, :new]
    end
  end
end

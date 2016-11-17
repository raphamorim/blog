Rails.application.routes.draw do

  get '/google(*g_hash)', to: 'static#google'

  get "sitemap.xml" => "static#sitemap", format: :xml, as: :sitemap

  get "robots.txt" => "static#robots", format: :text, as: :robots

  get 'talks/index'

  get 'talks/new'

  get 'talks/create'

  get 'talks/edit'

  get 'talks/update'

  get 'talks/destroy'

  get 'projects/index'

  get 'projects/new'

  get 'projects/create'

  get 'projects/destroy'

  get 'projects/edit'

  get 'projects/update'

  get 'projects/show'

  get 'login' => 'sessions#new', :as => 'login'
  get 'logout' => 'sessions#destroy', :as => 'logout'
  get 'signup' => 'users#new', :as => 'signup'

  resources :users
  resources :sessions
  resources :articles, :path => "artigos"
  resources :tags

  root 'home#index'

  # search route
  get '/search' => 'articles#search'

  # cover upload
  post 'artigos/cover' => 'articles#upload_cover'

  # blog routes
  get 'home/index'

  get 'feed', to: 'articles#feed', as: :feed

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

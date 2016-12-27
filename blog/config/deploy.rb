# config valid only for current version of Capistrano
lock '>=3.6.1'

set :application, 'blog'
set :repo_url, 'git@github.com:pantuza/blog.git'

# config/deploy/deploy.env
set :user, ENV['DEPLOY_USER']
set :group, ENV['DEPLOY_GROUP']
set :deploy_to, ENV['DEPLOY_PATH']

set :pty, true

# Default value for :linked_files is []
# append :linked_files, 'config/database.yml', 'config/secrets.yml'

# Default value for linked_dirs is []
# append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

#
# Configuring 'capistrano/rails'
#

# set :migration_role, :db
#
# set :conditionally_migrate, true
#
# set :keep_assets, 2


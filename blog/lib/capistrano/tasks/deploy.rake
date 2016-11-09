require 'capistrano'

after :deploy, "deploy:build"

set :pty, true

namespace :deploy do

  desc "Builds docker compose images. Used at first deploy"
  task :build do

    on roles(:app) do

      puts "Uploading production environment.."
      upload! 'config/deploy/production.env', "#{ENV['DEPLOY_PATH']}/current/blog/config/deploy/production.env"
      upload! 'config/blog.pantuza.com.json', "#{ENV['DEPLOY_PATH']}/current/blog/config/blog.pantuza.com.json"
    end

    on "#{ENV['DEPLOY_USER']}@#{ENV['DEPLOY_SERVER']}" do
      puts "Running docker containers.."
      execute "docker-compose --file #{ENV['DEPLOY_PATH']}/current/blog/docker-compose.yml up -d"
    end
  end

  desc "Starts all containers using docker-compose"
  task :start do
    on "#{ENV['DEPLOY_USER']}@#{ENV['DEPLOY_SERVER']}" do
      puts "Starting all docker containers.."
      execute "docker-compose --file #{ENV['DEPLOY_PATH']}/current/blog/docker-compose.yml up -d"
    end
  end

  desc "Stops all containers using docker-compose"
  task :stop do
    on "#{ENV['DEPLOY_USER']}@#{ENV['DEPLOY_SERVER']}" do
      puts "Stoping all docker containers.."
      execute "docker-compose --file #{ENV['DEPLOY_PATH']}/current/blog/docker-compose.yml down"
    end
  end

  desc "Restarts all containers using docker-compose"
  task :restart do
    on "#{ENV['DEPLOY_USER']}@#{ENV['DEPLOY_SERVER']}" do
      puts "Restarting all docker containers.."
      execute "docker-compose --file #{ENV['DEPLOY_PATH']}/current/blog/docker-compose.yml restart"
    end
  end
end

require 'capistrano'

after :deploy, "deploy:build"


namespace :deploy do

  desc "Builds docker compose images. Used at first deploy"
  task :build do

    on roles(:app) do

      puts "Uploading production environment.."
      upload! 'config/deploy/production.env', "#{deploy_to}/current/blog/config/deploy/production.env"
      upload! 'config/blog.pantuza.com.json', "#{deploy_to}/current/blog/config/blog.pantuza.com.json"

      puts "Running docker containers.."
      sudo system("docker-compose up -d")
      sudo system("docker ps --all")
    end
  end

  desc "Starts all containers using docker-compose"
  task :start do
  end

  desc "Stops all containers using docker-compose"
  task :stop do
  end

  desc "Restarts all containers using docker-compose"
  task :restart do
  end
end

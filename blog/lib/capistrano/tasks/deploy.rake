
after :deploy, "deploy:build"


namespace :deploy do

  desc "Builds docker compose images. Used at first deploy"
  task :build do
    sudo system("docker-compose up -d")
    sudo system("docker ps --all")
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

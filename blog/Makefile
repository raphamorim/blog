

#
# Makefile to rule blog execution and deploy
#


DOCKER := $(shell which docker)
COMPOSE := $(shell which docker-compose)


all: help


help:
	@echo "Available rules are:"
	@echo "install   - build docker image and run project"
	@echo "start     - starts blog containers"
	@echo "stop      - stops blog containers"
	@echo "restart   - stops and starts blog containers"
	@echo "status    - show status of containers using docker ps"


install: docker-compose.yml
	@echo "It will build docker images and run the blog.."
	$(COMPOSE) up -d
	@sleep 5
	$(COMPOSE) run --name blog_db_setup web rake db:setup RAILS_ENV=development
	$(DOCKER) rm blog_db_setup

uninstall: stop
	@echo "Uninstalling blog.."
	$(DOCKER) rm blog_app
	$(DOCKER) rm blog_db
	$(DOCKER) rmi blog_web

start:
	@echo "Starting blog..."
	$(DOCKER) start blog_db
	$(DOCKER) start blog_app

stop:
	@echo "Stoping blog..."
	$(DOCKER) stop blog_db
	$(DOCKER) stop blog_app

restart: stop start

status:
	$(DOCKER) ps --all

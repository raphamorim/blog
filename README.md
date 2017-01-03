My personal blog
================

This is my [personal blog](https://blog.pantuza.com) implementation using Ruby on Rails.

### Install locally

Inside blog directory you can run the entire project locally using docker compose
```bash
$> docker-compose --file docker-compose-dev.yml up
```

Every file you modify locally will reflect inside the application running container.

### Contributing
I am not stringent with contribuitions. Just do a fork, do some modifications and send me a pull request.


### Stack
This project uses docker to manage containers. When you run this project you have:

* Application container -> Ruby on Rails
* Database container -> PostgreSQL with persistent volume
* Cache container -> Redis server with no persistency
* Geolocation container -> An geolocation API

### Author
Gustavo Pantuza <gustavopantuza@gmail.com>

FROM ruby:2.2.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /blog
WORKDIR /blog
ADD Gemfile /blog/Gemfile
ADD Gemfile.lock /blog/Gemfile.lock
RUN bundle install
EXPOSE 3000
ADD . /blog
CMD cd /blog

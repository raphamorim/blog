namespace :users do
  desc "Encrypt a password using random salt and prints that to stdout"
  task encrypt_password: :environment do

    puts "Enter your password:"
    password = $stdin.readline()

    salt = BCrypt::Engine.generate_salt
    encrypted = BCrypt::Engine.hash_secret(password, salt)

    puts "Password: #{encrypted}"
    puts "Salt: #{salt}"
  end

end

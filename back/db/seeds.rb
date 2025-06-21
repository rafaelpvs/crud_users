# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
BATCH_SIZE = 10_000
TOTAL_USERS = 1_000_000

puts "Cadastrando #{TOTAL_USERS} usuários..."

(TOTAL_USERS / BATCH_SIZE).times do |batch|
  users = []
  BATCH_SIZE.times do
    users << {
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      birth_date: Faker::Date.birthday(min_age: 18, max_age: 80),
      active: Faker::Boolean.boolean
    }
  end
  User.insert_all(users)
  puts "Batch #{batch + 1} de #{TOTAL_USERS / BATCH_SIZE} inserido."
end

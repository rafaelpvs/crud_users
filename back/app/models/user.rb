class User < ApplicationRecord
  def self.ransackable_attributes(_auth_object = nil)
    %w[first_name last_name full_name]
  end

  def self.ransackable_associations(_auth_object = nil)
    []
  end

  ransacker :full_name do |parent|
    table = parent.table.name
    Arel.sql("LOWER(#{table}.first_name || ' ' || #{table}.last_name)")
  end
end

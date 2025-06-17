class User < ApplicationRecord
  def self.ransackable_attributes(_auth_object = nil)
    %w[first_name last_name full_name birth_date created_at updated_at created_at_date active]
  end

  def self.ransackable_associations(_auth_object = nil)
    []
  end

  ransacker :full_name do |parent|
    table = parent.table.name
    Arel.sql("LOWER(#{table}.first_name || ' ' || #{table}.last_name)")
  end
  ransacker :created_at_date, type: :date do |parent|
    Arel::Nodes::SqlLiteral.new("DATE(#{parent.table.name}.created_at)")
  end

  ransacker :updated_at_date, type: :date do |parent|
    Arel::Nodes::SqlLiteral.new("DATE(#{parent.table.name}.updated_at)")
  end
end

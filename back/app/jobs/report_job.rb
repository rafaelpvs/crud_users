class ReportJob < ApplicationJob
  queue_as :default

  # retry_on StandardError, wait: 5.seconds, attempts: 3

  def perform(template, query_params)
    filters = JSON.parse(query_params)
    users = User.ransack(filters).result
    excel_data = ApplicationController.renderer.render(
      handlers: [ :axlsx ],
      formats: [ :xlsx ],
      template: template,
      layout: false,
      locals: { users: users }
    )
    UserMailer.export_email(excel_data).deliver_now
  end
end

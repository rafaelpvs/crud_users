class ReportJob < ApplicationJob
  queue_as :default

  def perform(template, query_params)
    filters = JSON.parse(query_params)
    users = User.ransack(filters).result
    excel_data = render_to_string(
      handlers: [ :axlsx ],
      formats: [ :xlsx ],
      template: template,
      layout: false,
      assigns: { users: users }
    )
    UserMailer.export_email(excel_data).deliver_later
  end
end

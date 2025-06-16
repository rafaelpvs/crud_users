class UserMailer < ApplicationMailer
  def export_email(excel_data)
    timestamp = Time.current.strftime("%Y%m%d_%H%M%S")
    attachments["relatorio_#{timestamp}.xlsx"] = {
      mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      content: excel_data
    }
    mail(to: 'rafael12wq@gmail.com', subject: 'Exportação')
  end
end
class ApplicationController < ActionController::Base
  include ExceptionsHandler

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  add_flash_types :success, :error

  before_action :require_confirmed_user

  private

  def require_confirmed_user
    if signed_in? && !current_user.confirmed && !current_page?(controller: "sessions", action: "destroy")
      redirect_to user_password_edit_path, error: t("application.require_confirmed_user")
    end
  end

  def current_page?(**args)
    params[:controller] == args[:controller] && params[:action] == args[:action]
  end

end

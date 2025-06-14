class UsersController < ApplicationController
  before_action :set_users, only: :index
  def index; end

  def create
    @user = User.new(user_params)
    if @user.save
      render :show, status: :created
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show, status: :ok
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def change_active
    @user = User.find(params[:id])
    if @user.update(active: params[:active])
      render :show, status: :ok
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render :destroy, status: :no_content
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :birth_date, :active)
  end

  def set_users
    @pagy, @users = pagy((User.all), items: 20)
  end
end

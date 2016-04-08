defmodule PhxOembed.Authorization do

  def authorize(:site, :create, site, user) do
    site.user_id == user.id
  end

  def authorize(:site, :show, site, user) do
    site.user_id == user.id
  end

  def authorize(:site, :update, site, user) do
    site.user_id == user.id
  end

  def authorize(:site, :delete, site, user) do
    site.user_id == user.id
  end

  # Default response is false, only explicitly matched actions can return true
  def authorize(_, _, _, _) do
    false
  end
end

defmodule PhxOembed.Authorization do

  def authorize(:site, :create, user, site) do
    site.user_id == user.id
  end

  def authorize(:site, :show, user, site) do
    site.user_id == user.id
  end

  def authorize(:site, :update, user, site) do
    site.user_id == user.id
  end

  def authorize(:site, :delete, user, site) do
    site.user_id == user.id
  end

  # Default response is false, only explicitly matched actions can return true
  def authorize(_, _, _, _) do
    false
  end
end

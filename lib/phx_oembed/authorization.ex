defmodule PhxOembed.Authorization do

  def authorize(:site, :create, _user) do
    true
  end

  def authorize(:site, :index, _user) do
    true
  end

  def authorize(:card, :index, user, site) do
    # site is the parent record in this case
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

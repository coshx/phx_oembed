defmodule PhxOembed.Api.CurrentUserView do
  use PhxOembed.Web, :view

  def render("show.json", %{user: user}) do
    %{
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  end
end

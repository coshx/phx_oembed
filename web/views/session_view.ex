defmodule PhxOembed.SessionView do
  use PhxOembed.Web, :view

  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
  end

  def render("success.json", %{message: message}) do
    %{message: message}
  end

  def render("error.json", %{error: error}) do
    %{error: error}
  end

end

defmodule PhxOembed.ErrorView do
  use PhxOembed.Web, :view

  def render("404.json", _assigns) do
  end

  #TODO: Figure out why the file won't compile with this set to json
  def render("500.html", _assigns) do
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.html", assigns
  end
end

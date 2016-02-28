defmodule PhxOembed.PageController do
  use PhxOembed.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

defmodule PhxOembed.SiteController do
  use PhxOembed.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: PhxOembed.SessionController
  plug :scrub_params, "site" when action in [:create]

  def show(conn, %{"sited_id" => site_id}) do

  end
end

defmodule PhxOembed.SiteController do
  use PhxOembed.Web, :controller
  alias PhxOembed.{Site, Authorization}

  require IEx
  plug Guardian.Plug.EnsureAuthenticated, handler: PhxOembed.SessionController
  plug :scrub_params, "site" when action in [:create]

  def show(conn, %{"id" => id}) do
    site = Repo.get(Site, id)
    user = Guardian.Plug.current_resource(conn)

    case Authorization.authorize(:site, :show, site, user) do
      true ->
        conn
        |> put_status(:ok)
        |> render("show.json", site: site)

      false ->
        conn
        |> put_status(:forbidden)
        |> render(PhxOembed.SessionView, "error.json", error: "Not authorized")
    end
  end
end

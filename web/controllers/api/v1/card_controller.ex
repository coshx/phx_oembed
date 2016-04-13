defmodule PhxOembed.Api.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.{Site, Card, Authorization}

  plug Guardian.Plug.EnsureAuthenticated, handler: PhxOembed.Api.SessionController
  plug :scrub_params, "card" when action in [:create]

  def index(conn, %{"site_id" => site_id}) do
    user = Guardian.Plug.current_resource(conn)
    site = Repo.get(Site, site_id) |> Repo.preload(:cards)

    case Authorization.authorize(:card, :index, user, site) do
      true ->
        conn
        |> put_status(:ok)
        |> render("index.json", cards: site.cards)

      false ->
        conn
        |> put_status(:forbidden)
        |> render(PhxOembed.Api.CardView, "error.json", error: "Not authorized")
    end
  end
end

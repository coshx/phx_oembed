defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.Site
  alias PhxOembed.ErrorView

  #plug :scrub_params, "card" when action in [:create, :update]

  def show(conn, %{"url" => url, "site_id" => site_id}) do
    uri = URI.parse(url)
    path = String.lstrip(uri.path, ?/)
    site = Repo.get(Site, site_id)
    card = site
    |> assoc(:cards)
    |> Repo.get_by(path: path)

    if (site != nil) && (card != nil) && (site.domain == uri.host) do
      conn
      |> put_status(200)
      |> render("show.json", card: card)
    else
      conn
      |> put_status(404)
      |> render(ErrorView, "404.json")
    end
  end
end

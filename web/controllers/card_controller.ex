defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.Site
  alias PhxOembed.ErrorView
  require IEx

  #plug :scrub_params, "card" when action in [:create, :update]

  def show(conn, %{"url" => url, "site_id" => site_id} = params) do
    uri = URI.parse(url)
    path = String.lstrip(uri.path, ?/)
    site = Repo.get(Site, site_id)
    card = site
    |> assoc(:cards)
    |> Repo.get_by(path: path)

    show_template =
      case params["format"] do
        "xml" -> "show.xml"
        _     -> "show.json"
      end

    error_template =
      case params["format"] do
        "xml" -> "404.xml"
        _     -> "404.json"
      end

    if (site != nil) && (card != nil) && (site.domain == uri.host) do
      conn
      |> put_status(200)
      |> render(show_template, card: card)
    else
      conn
      |> put_status(404)
      |> render(ErrorView, error_template)
    end
  end
end

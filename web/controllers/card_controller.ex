defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.Site
  alias PhxOembed.ErrorView

  def show(conn, %{"url" => url, "site_id" => site_id} = params) do
    {uri, site, card}       = parse_params(site_id, url)
    {show_view, error_view} = get_views(params)

    if (site != nil) && (card != nil) && (site.domain == uri.host) do
      conn
      |> put_status(200)
      |> render(show_view, card: card)
    else
      conn
      |> put_status(404)
      |> render(ErrorView, error_view)
    end
  end

  defp parse_params(site_id, url) do
    uri = URI.parse(url)
    path = String.lstrip(uri.path, ?/)
    site = Repo.get(Site, site_id)
    card = site
    |> assoc(:cards)
    |> Repo.get_by(path: path)

    {uri, site, card}
  end

  defp get_views(params) do
    case params["format"] do
      "xml" -> {"show.xml", "404.xml"}
      _     -> {"show.json", "404.json"}
    end
  end
end

defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.Site

  #plug :scrub_params, "card" when action in [:create, :update]

  def show(conn, %{"url" => url, "site_id" => site_id}) do
    uri = URI.parse(url)
    path = String.lstrip(uri.path, ?/)
    card = Site
    |> Repo.get!(site_id)
    |> assoc(:cards)
    |> Repo.get_by!(path: path)

    render(conn, "show.json", card: card)
  end
end

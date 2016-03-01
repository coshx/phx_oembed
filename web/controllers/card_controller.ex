defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller

  alias PhxOembed.Card

  #plug :scrub_params, "card" when action in [:create, :update]

  def index(conn, %{"url" => url}) do
    card = Repo.get_by!(Card, url: url)
    render(conn, "show.json", card: card)
  end
end

defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller

  alias PhxOembed.Card

  #plug :scrub_params, "card" when action in [:create, :update]

  def show(conn, %{"path" => path}) do
    card = Repo.get_by!(Card, path: path)
    render(conn, "show.json", card: card)
  end
end

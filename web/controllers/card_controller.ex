defmodule PhxOembed.CardController do
  use PhxOembed.Web, :controller

  alias PhxOembed.Card

  plug :scrub_params, "card" when action in [:create, :update]

  def show(conn, %{"id" => id}) do
    card = Repo.get!(Card, id)
    render(conn, "show.json", card: card)
  end
end

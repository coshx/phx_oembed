defmodule PhxOembed.Api.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.{Site, Card}

  plug Guardian.Plug.EnsureAuthenticated,
       handler: PhxOembed.Api.SessionController
  plug PhxOembed.Plugs.AssignAuthorizingResource,
       %{resource: Site, resource_id: "site_id"}
  plug PhxOembed.Plugs.Authorization
  plug PhxOembed.Plugs.VerifyAuthorized

  plug :scrub_params, "card" when action in [:create, :update]

  def create(conn, %{"site_id" => site_id, "card" => card}) do
    site = Repo.get(Site, site_id)

    changeset = site
    |> build_assoc(:cards)
    |> Card.changeset(card)

    case Repo.insert(changeset) do
      {:ok, card} ->
        conn
        |> put_status(:ok)
        |> render("show.json", card: card)

      {:error, _} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", error: "Problem adding new card")
    end
  end

  def index(conn, %{"site_id" => site_id}) do
    site = Repo.get(Site, site_id) |> Repo.preload(:cards)

    conn
    |> put_status(:ok)
    |> render("index.json", cards: site.cards)
  end

  def update(conn, %{"id" => id, "card" => card_params }) do
    existing_card = Repo.get(Card, id)

    changeset = Card.changeset(existing_card, card_params)
    case Repo.update(changeset) do
      {:ok, card} ->
        conn
        |> put_status(:ok)
        |> render("show.json", card: card)

      {:error, _} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", error: "Problem updaging card")
    end
  end

  def delete(conn, %{"id" => id}) do
    card = Repo.get(Card, id)

    Repo.delete!(card)
    conn
    |> put_status(:ok)
    |> render(PhxOembed.Api.CardView, "success.json", msg: "Deleted card")
  end
end

defmodule PhxOembed.Api.CardController do
  use PhxOembed.Web, :controller
  alias PhxOembed.{Site, Card, Authorization}

  plug Guardian.Plug.EnsureAuthenticated, handler: PhxOembed.Api.SessionController
  plug :scrub_params, "card" when action in [:create, :update]

  def create(conn, %{"site_id" => site_id, "card" => card}) do
    user = Guardian.Plug.current_resource(conn)
    site = Repo.get(Site, site_id)

    changeset = site
    |> build_assoc(:cards)
    |> Card.changeset(card)

    case Authorization.authorize(:card, :create, user, site) do
      true ->
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
      false ->
        conn
        |> put_status(:forbidden)
        |> render("error.json", error: "Not authorized")
    end
  end

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

  def update(conn, %{"id" => c_id, "site_id" => s_id, "card" => card_params }) do
    user = Guardian.Plug.current_resource(conn)
    site = Repo.get(Site, s_id)
    existing_card = Repo.get(Card, c_id)

    case Authorization.authorize(:card, :update, user, site, existing_card) do
      true ->
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

      false ->
        conn
        |> put_status(:forbidden)
        |> render(PhxOembed.Api.CardView, "error.json", error: "Not authorized")
    end
  end

  def delete(conn, %{"id" => c_id, "site_id" => s_id}) do
    user = Guardian.Plug.current_resource(conn)
    site = Repo.get(Site, s_id)
    card = Repo.get(Card, c_id)

    case Authorization.authorize(:card, :delete, user, site, card) do
      true ->
        Repo.delete!(card)
        conn
        |> put_status(:ok)

      false ->
        conn
        |> put_status(:forbidden)
        |> render(PhxOembed.Api.CardView, "error.json", error: "Not authorized")
    end
  end
end

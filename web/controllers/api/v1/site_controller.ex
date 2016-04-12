defmodule PhxOembed.SiteController do
  use PhxOembed.Web, :controller
  alias PhxOembed.{Site, Authorization}

  plug Guardian.Plug.EnsureAuthenticated, handler: PhxOembed.SessionController
  plug :scrub_params, "site" when action in [:create]

  def show(conn, %{"id" => id}) do
    site = Repo.get(Site, id)
    user = Guardian.Plug.current_resource(conn)

    case Authorization.authorize(:site, :show, user, site) do
      true ->
        conn
        |> put_status(:ok)
        |> render("show.json", site: site)

      false ->
        conn
        |> put_status(:forbidden)
        |> render("error.json", error: "Not authorized")
    end
  end

  def index(conn, %{}) do
    user = Guardian.Plug.current_resource(conn)
    |> Repo.preload(:sites)

    sites = user.sites

    case Authorization.authorize(:site, :index, user) do
      true ->
        conn
        |> put_status(:ok)
        |> render("index.json", sites: sites)

      false ->
        conn
        |> put_status(:forbidden)
        |> render(PhxOembed.SessionView, "error.json", error: "Not authorized")
    end
  end

  def create(conn, %{"site" => site}) do
    user = Guardian.Plug.current_resource(conn)
    case Authorization.authorize(:site, :index, user) do
      true ->
        case Site.changeset(%Site{}, site) |> Repo.insert do
          {:ok, site} ->
            conn
            |> put_status(:ok)
            |> render("show.json", site: site)

          {:error, _} ->
            conn
            |> put_status(:unproccessable_entity)
            |> render("error.json", error: "Problem adding new site")
        end

      false ->
        conn
        |> put_status(:forbidden)
        |> render("error.json", error: "Not authorized")

    end
  end
end

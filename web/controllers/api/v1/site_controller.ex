defmodule PhxOembed.Api.SiteController do
  use PhxOembed.Web, :controller
  alias PhxOembed.Site

  plug Guardian.Plug.EnsureAuthenticated,
       handler: PhxOembed.Api.SessionController
  plug PhxOembed.Plugs.AssignAuthorizingResource,
       %{resource: Site, resource_id: "id"}
  plug PhxOembed.Plugs.Authorization
  plug PhxOembed.Plugs.VerifyAuthorized

  plug :scrub_params, "site" when action in [:create]


  def show(conn, %{"id" => id}) do
    site = Repo.get(Site, id)

    conn
    |> put_status(:ok)
    |> render("show.json", site: site)
  end

  def index(conn, %{}) do
    user = Guardian.Plug.current_resource(conn)
    |> Repo.preload(:sites)

    sites = user.sites

    conn
    |> put_status(:ok)
    |> render("index.json", sites: sites)
  end

  def create(conn, %{"site" => site}) do
    user = Guardian.Plug.current_resource(conn)
    changeset = user
    |> build_assoc(:sites)
    |> Site.changeset(site)

    case Repo.insert(changeset) do
      {:ok, site} ->
        conn
        |> put_status(:ok)
        |> render("show.json", site: site)

      {:error, _} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", error: "Problem adding new site")
    end
  end
end

defmodule PhxOembed.Crawler do
  alias PhxOembed.{Repo, Site, Url}
  import Ecto
  require Logger
  require IEx

  def listen_for_url do
    receive do
      {:ok, site_id, path} ->
        process_new_url(site_id, path)
      _ ->
        Logger.info("recieved bad message")
    end
  end

  defp process_new_url(site_id, path) do
    case Repo.get_by(Url, %{site_id: site_id, path: path}) do
      %Url{path: path} ->
        Logger.info("already know about path " <> path)

      _ ->
        save_new_url(site_id, path)
    end
  end

  defp save_new_url(site_id, path) do
    site = Repo.get(Site, site_id)

    site
    |> build_assoc(:urls)
    |> Url.changeset(%{path: path})
    |> Repo.insert!
  end
end

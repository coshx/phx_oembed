defmodule PhxOembed.Crawler do
  alias PhxOembed.{Repo, Url}

  def listen_for_url do
    receive do
      {:ok, path} ->
        unless already_exists?(path) do

        end
    end
  end

  defp already_exists?(path) do
    url = Repo.get(Url, %{path: path})
  end

  defp save_new_url(path) do

  end
end

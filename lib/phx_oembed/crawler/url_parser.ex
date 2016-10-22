defmodule PhxOembed.UrlParser do
  alias PhxOembed.{Repo, Site, Url}

  import Ecto
  require Logger
  require IEx

  def parse_url do
    receive do
      {site_id, path} ->

        case Repo.get_by(Url, %{site_id: site_id, path: path}) do
          %Url{path: path} ->
            Logger.info("already know about path " <> path)

          _ ->
            save_new_url(site_id, path)
            |> fetch_url
            |> find_links
            |> find_meta_tags
        end
    end
  end

  defp save_new_url(site_id, path) do
    site = Repo.get(Site, site_id)

    path = site
    |> build_assoc(:urls)
    |> Url.changeset(%{path: path})
    |> Repo.insert!

    {site, path}
  end

  defp fetch_url({site, url}) do
    HTTPoison.start
    full_path = site.protocol <> "://" <> site.domain <> "/" <> url.path
    {:ok, resp} = HTTPoison.get full_path
    {site, resp.body}
  end

  defp find_links({site, html}) do
    Enum.each Floki.find(html, "a"), fn(link) ->
      # figure out if the link is in our domain or not. if it is, 
      # call crawl_link/1
      {_, element, _} = link
      element = List.last(element)
      {_, url} = element
      uri = URI.parse(url)
      if uri.host == nil || uri.host == site.domain do
        pid = spawn(PhxOembed.UrlParser, :parse_url, [])
        send(pid, {site.id, uri.path})
      end
    end
  end

  defp crawl_link(link) do
    # re-crawl this link, since we know it's in our domain
    # call listen_for_url somehow ? self returns the current PID
  end


  defp find_meta_tags(html) do
    #Enum.each Floki.find(html, "meta"), fn(meta) ->
      # find the meta tags
    #end
  end

  defp parse_and_store_meta_tags(tag) do
    # parse the meta tag and make a Card record for it
  end

end

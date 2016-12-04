defmodule PhxOembed.Crawler do
  alias PhxOembed.{Repo, Url}

  import Ecto
  require Logger
  require IEx

  def parse_url do
    receive do
      url_id ->

        # look up the url and the site in the db
        url = Repo.get(Url, url_id) |> Repo.preload(:site)

        case url.crawled do
          false ->
            # fetch the html

            # parse the html for meta tags we don't already know about.
            # If it finds them, make Card records

            # parse the html for local links we don't already know about. create Url
            # records for them

            # mark the url as crawled
            IO.puts "foo"
          true ->
            IO.puts "This url has already been crawled."
        end
    end
  end

  defp find_links({site, html}) do
    Enum.each Floki.find(html, "a"), fn(link) ->
      {_, element, _} = link
      element = List.last(element)
      {_, url} = element
      uri = URI.parse(url)
      if uri.host == nil || uri.host == site.domain do
        # this is a link in our domain, so make a new Url record
      end
    end
  end

  defp find_meta_tags({site, html}) do
    #Enum.each Floki.find(html, "meta"), fn(meta) ->
      # find the meta tags
    #end
  end

end

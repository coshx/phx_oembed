defmodule PhxOembed.Crawler.Fetcher do

  def fetch_url(url) do
    #HTTPoison.start
    {:ok, resp} = HTTPoison.get url
    resp.body
  end
end

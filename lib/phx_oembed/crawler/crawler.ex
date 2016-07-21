defmodule PhxOembed.Crawler do
  use GenServer
  require IEx

  def handle_cast({site_id, path}, _) do
    pid = spawn(PhxOembed.UrlParser, :parse_url, [])
    send(pid, {site_id, path})
  end
end

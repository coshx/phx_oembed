defmodule PhxOembed.CrawlerTest do
  use ExUnit.Case
  use PhxOembed.ModelCase
  import PhxOembed.Factory
  alias PhxOembed.{Repo, Url, Crawler}
  #require IEx

  test "mark urls as crawled" do
    url = insert(:url)
    crawler = spawn Crawler, :parse_url, []
    ref  = Process.monitor(crawler)
    send(crawler, url.id)
    assert_receive {:DOWN, ^ref, :process, _, :normal}, 6000
    url = Repo.get(Url, url.id)
    assert true == url.crawled
  end
end

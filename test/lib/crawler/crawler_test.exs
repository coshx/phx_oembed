# Integration test for the crawler library

defmodule PhxOembed.CrawlerTest do
  use ExUnit.Case, async: false
  use PhxOembed.ModelCase
  alias PhxOembed.{Repo, Url, Crawler}
  import PhxOembed.Factory
  #require IEx

  setup do
    crawler = spawn Crawler, :parse_url, []
    url = insert(:url)
    %{crawler: crawler, url: url}
  end

  test "mark urls as crawled", %{crawler: crawler, url: url} do
    ref  = Process.monitor(crawler)
    send(crawler, url.id)
    assert_receive {:DOWN, ^ref, :process, _, :normal}, 6000
    url = Repo.get(Url, url.id)
    assert true == url.crawled
  end

  test "create Url records for local links", %{crawler: crawler, url: url} do
    initial_count = Repo.one(from u in Url, select: count("*"))
    ref  = Process.monitor(crawler)
    send(crawler, url.id)
    assert_receive {:DOWN, ^ref, :process, _, :normal}, 6000
    final_count = Repo.one(from u in Url, select: count("*"))
    assert final_count > initial_count
  end

  test "create Card records for meta tags", %{crawler: crawler, url: url} do

  end
end

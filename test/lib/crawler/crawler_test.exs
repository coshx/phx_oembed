defmodule PhxOembed.CrawlerTest do
  use ExUnit.Case
  import Ecto.Query
  import PhxOembed.Factory
  alias PhxOembed.{Repo, Url, Crawler}
  require IEx

  setup do
    {:ok, site: create(:site)}
  end

  @tag :skip #not working, this is synchronous test code
  test "receiving a new url that has not already been crawled", %{site: site} do
    crawler = spawn Crawler, :listen_for_url, []
    initial_count = Repo.one(from u in Url, select: count("*"))
    send crawler, {:ok, site.id, "foo"}
    final_count = Repo.one(from u in Url, select: count("*"))
    assert (final_count - initial_count) == 1
  end

  @tag :skip
  test "receiving a new url that has already been crawled", %{site: site} do
    create(:url, site: site, path: "foo")
    crawler = spawn Crawler, :listen_for_url, []
    initial_count = Repo.one(from u in Url, select: count("*"))
    send crawler, {:ok, site.id, "foo"}
    final_count = Repo.one(from u in Url, select: count("*"))
    assert final_count == initial_count
  end
end

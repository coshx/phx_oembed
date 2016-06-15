defmodule PhxOembed.CrawlerTest do
  use ExUnit.Case
  import PhxOembed.Factory
  alias PhxOembed.Crawler

  test "receiving a new url that has not already been crawled" do
    crawler = spawn Crawler, :listen_for_url, []
    send crawler, {:ok, "foo"}
  end

  test "receiving a new url that has already been crawled" do
    create(:url, path: "foo")

  end
end

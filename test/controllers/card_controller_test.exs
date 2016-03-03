defmodule PhxOembed.CardControllerTest do
  use PhxOembed.ConnCase

  alias PhxOembed.Site
  alias PhxOembed.Endpoint

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows the right card", %{conn: conn} do
    url = "https://example.com/cats"
    site = create(:site)
    card = create(:card, url: url, site: site)
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 200)["url"] == card.url
  end

  test "throws an error when card does not exist", %{conn: conn} do
    site = Repo.insert! %Site{domain: "example.com", protocol: "https"}
    fake_url = "http://example.com/dogs"
    assert_error_sent 404, fn ->
      get(conn, site_card_path(Endpoint, :show, site.id, url: fake_url))
    end
  end
end

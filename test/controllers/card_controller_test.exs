defmodule PhxOembed.CardControllerTest do
  use PhxOembed.ConnCase

  alias PhxOembed.Site
  alias PhxOembed.Endpoint

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows the right card", %{conn: conn} do
    path = "https://example.com/cats"
    site = create(:site)
    card = create(:card, path: path, site: site)
    conn = get(conn, site_card_path(Endpoint, :show, site.id, path: path))
    assert json_response(conn, 200)["path"] == card.path
  end

  test "throws an error when card does not exist", %{conn: conn} do
    site = Repo.insert! %Site{domain: "example.com", protocol: "https"}
    fake_path = "http://example.com/dogs"
    assert_error_sent 404, fn ->
      get(conn, site_card_path(Endpoint, :show, site.id, path: fake_path))
    end
  end
end

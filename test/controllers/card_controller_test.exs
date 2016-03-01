defmodule PhxOembed.CardControllerTest do
  use PhxOembed.ConnCase

  alias PhxOembed.Card
  alias PhxOembed.Site
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows the right card", %{conn: conn} do
    url = "https://example.com/cats"
    #TODO: use factories
    site = Repo.insert! %Site{domain: "example.com", protocol: "https"}
    card = Repo.insert! %Card{url: url, card_type: "twitter", site_id: site.id}
    #TODO: use route helpers
    conn = get conn, "/sites/" <> Integer.to_string(site.id) <> "/cards?url=" <> url
    assert json_response(conn, 200)["url"] == card.url
  end

  test "throws an error when card does not exist", %{conn: conn} do
    site = Repo.insert! %Site{domain: "example.com", protocol: "https"}
    fake_url = "http://example.com/dogs"
    assert_error_sent 404, fn ->
      get conn, "/sites/" <> Integer.to_string(site.id) <> "/cards?url=" <> fake_url
    end
  end
end

defmodule PhxOembed.CardControllerTest do
  use PhxOembed.ConnCase

  alias PhxOembed.Card
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows chosen resource", %{conn: conn} do
    url = "http://example.com/cats"
    card = Repo.insert! %Card{url: url, card_type: "twitter"}
    conn = get conn, "/?url=" <> url
    assert json_response(conn, 200)["url"] == card.url
  end

  test "throws an error when card is nonexistent", %{conn: conn} do
    fake_url = "http://example.com/dogs"
    assert_error_sent 404, fn ->
      get conn, "/?url=" <> fake_url
    end
  end
end

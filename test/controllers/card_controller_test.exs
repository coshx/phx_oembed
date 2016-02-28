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
    assert json_response(conn, 200)["data"] == %{"id" => card.id}
  end

  test "throws an error when url is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, card_path(conn, :show, -1)
    end
  end
end

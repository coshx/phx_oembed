defmodule PhxOembed.Api.CardControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, TestUtils}

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> create()
    {:ok,
     user: user,
     site: create(:site, user: user),
     conn: put_req_header(conn, "accept", "application/json")}
  end

  test "CREATE - not signed in", %{conn: conn, site: site} do
    conn
    |> post(site_card_path(Endpoint, :create, site, card: %{}))
    |> json_response(:forbidden)
  end

  test "CREATE - signed in", %{conn: conn, site: site, user: user} do
    params = %{path: "/foo", card_type: "twitter"}
    token = TestUtils.get_user_token(user)

    resp = conn
    |> put_req_header("authorization", token)
    |> post(site_card_path(Endpoint, :create, site, card: params))
    |> json_response(:ok)

    assert resp["path"] == params.path
    assert resp["card_type"] == params.card_type

  end

  test "INDEX - not signed in", %{conn: conn, site: site} do
    conn
    |> get(site_card_path(Endpoint, :index, site))
    |> json_response(:forbidden)

  end

  test "INDEX - signed in", %{conn: conn, user: user, site: site} do
    token = TestUtils.get_user_token(user)
    create(:card, site: site)
    create(:card, site: site)

    # IEx.pry
    resp = conn
    |> put_req_header("authorization", token)
    |> get(site_card_path(Endpoint, :index, site))
    |> json_response(:ok)

    assert(Enum.count(resp) == 2)
  end
end

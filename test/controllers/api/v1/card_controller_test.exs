defmodule PhxOembed.Api.CardControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, Card, TestUtils}

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
    resp = conn
    |> put_req_header("authorization", token)
    |> get(site_card_path(Endpoint, :index, site))
    |> json_response(:ok)

    assert(Enum.count(resp) == 2)
  end

  test "UPDATE - not signed in", %{conn: conn, site: site} do
    card = create(:card, site: site)
    conn
    |> patch(site_card_path(Endpoint, :update, site, card))
    |> json_response(:forbidden)
  end

  test "UPDATE - signed in, not authorized", %{conn: conn, user: user, site: site} do
    token = TestUtils.get_user_token(user)
    card = create(:card)
    conn
    |> put_req_header("authorization", token)
    |> patch(site_card_path(Endpoint, :update, site, card, card: %{path: "/ponies!1"}))
    |> json_response(:forbidden)
  end

  test "UPDATE - signed in, authorized", %{conn: conn, user: user, site: site} do
    token = TestUtils.get_user_token(user)
    card = create(:card, site: site)
    resp = conn
    |> put_req_header("authorization", token)
    |> patch(site_card_path(Endpoint, :update, site, card, card: %{path: "/ponies!1"}))
    |> json_response(:ok)

    assert resp["path"] == "/ponies!1"

    updated_card = Repo.get(Card, card.id)
    assert updated_card.path == "/ponies!1"
  end

  test "DELETE - not signed in", %{conn: conn, site: site} do
    card = create(:card, site: site)
    conn
    |> delete(site_card_path(Endpoint, :delete, site, card))
    |> json_response(:forbidden)
  end

  test "DELETE - signed in, not authorized", %{conn: conn, user: user} do
    token = TestUtils.get_user_token(user)
    site = create(:site)
    card = create(:card, site: site)
    conn
    |> put_req_header("authorization", token)
    |> delete(site_card_path(Endpoint, :delete, site, card))
    |> json_response(:forbidden)
  end

  test "DELETE - signed in, authorized", %{conn: conn, user: user, site: site} do
    token = TestUtils.get_user_token(user)
    card = create(:card, site: site)
    resp = conn
    |> put_req_header("authorization", token)
    |> delete(site_card_path(Endpoint, :delete, site, card))

    assert resp.status == 200
  end
end

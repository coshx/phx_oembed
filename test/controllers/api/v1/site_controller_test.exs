defmodule PhxOembed.SiteControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, TestUtils}

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> create()
    {:ok,
     user: user,
     conn: put_req_header(conn, "accept", "application/json")}
  end

  test "SHOW - not signed in", %{conn: conn} do
    site = create(:site)
    conn
    |> get(site_path(Endpoint, :show, site))
    |> json_response(:forbidden)
  end

  test "SHOW - signed in, does not own the record", %{conn: conn, user: user} do
    site = create(:site)
    token = TestUtils.get_user_token(user)
    conn
    |> put_req_header("authorization", token)
    |> get(site_path(Endpoint, :show, site))
    |> json_response(:forbidden)
  end

  test "SHOW - signed in, does own the record", %{conn: conn, user: user} do
    site = create(:site, user: user)
    token = TestUtils.get_user_token(user)
    resp = conn
    |> put_req_header("authorization", token)
    |> get(site_path(Endpoint, :show, site))
    |> json_response(:ok)

    assert resp["domain"] == site.domain
    assert resp["protocol"] == site.protocol
  end

  test "INDEX - not signed in", %{conn: conn} do
    conn
    |> get(site_path(Endpoint, :index))
    |> json_response(:forbidden)
  end

  test "INDEX - signed in", %{conn: conn, user: user} do
    token = TestUtils.get_user_token(user)
    create(:site, user: user)
    create(:site, user: user)

    resp = conn
    |> put_req_header("authorization", token)
    |> get(site_path(Endpoint, :index))
    |> json_response(:ok)

    assert(Enum.count(resp) == 2)
  end
end

defmodule PhxOembed.Api.SiteControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, TestUtils}

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> insert()
    {:ok,
     user: user,
     conn: put_req_header(conn, "accept", "application/json")}
  end

  test "CREATE", %{conn: conn, user: user} do
    params = %{domain: "example.foo.com", protocol: "https"}
    token = TestUtils.get_user_token(user)

    resp = conn
    |> put_req_header("authorization", token)
    |> post(site_path(Endpoint, :create, site: params))
    |> json_response(:ok)

    assert resp["domain"] == params.domain
    assert resp["protocol"] == params.protocol
  end

  test "SHOW", %{conn: conn, user: user} do
    site = insert(:site, user: user)
    token = TestUtils.get_user_token(user)
    resp = conn
    |> put_req_header("authorization", token)
    |> get(site_path(Endpoint, :show, site))
    |> json_response(:ok)

    assert resp["domain"] == site.domain
    assert resp["protocol"] == site.protocol
  end

  test "INDEX", %{conn: conn, user: user} do
    token = TestUtils.get_user_token(user)
    insert(:site, user: user)
    insert(:site, user: user)

    resp = conn
    |> put_req_header("authorization", token)
    |> get(site_path(Endpoint, :index))
    |> json_response(:ok)

    assert(Enum.count(resp) == 2)
  end
end

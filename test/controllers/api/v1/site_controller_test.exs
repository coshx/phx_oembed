defmodule PhxOembed.SiteControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, TestUtils}

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> create()
    {:ok,
     user: user,
     site: create(:site),
     conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the user is not signed in", %{conn: conn, site: site} do
    conn
    |> get(site_path(Endpoint, :show, site))
    |> json_response(:forbidden)
  end
end

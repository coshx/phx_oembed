defmodule PhxOembed.SiteAuthorizationTest do
  use PhxOembed.ConnCase

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> insert()

    private = conn.private
    |> Map.merge(%{phoenix_controller: PhxOembed.Api.SiteController})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:user, user)

    {:ok, conn: conn, user: user}
  end

  test "show for a site the user does not own", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :show})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status == 403)
  end

  test "show for a site that the user does own", %{conn: conn, user: user} do
    private = Map.merge(conn.private, %{phoenix_action: :show})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site, user: user))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403)
  end

  test "index for a signed in user", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :index})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, %{})
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403)
  end

  test "create for a signed in user", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :create})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, %{})
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403) 
  end
end

defmodule PhxOembed.CardAuthorizationTest do
  use PhxOembed.ConnCase

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> insert()

    private = conn.private
    |> Map.merge(%{phoenix_controller: PhxOembed.Api.CardController})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:user, user)

    {:ok, conn: conn, user: user}
  end

  test "create for a card for a site owned by the user", %{conn: conn, user: user} do
    private = Map.merge(conn.private, %{phoenix_action: :create})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site, user: user))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403)
  end

  test "create for a card for a site not owned by the user", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :create})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status == 403)
  end

  test "index for cards for a site the user owns", %{conn: conn, user: user} do
    private = Map.merge(conn.private, %{phoenix_action: :index})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site, user: user))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403)
  end

  test "index for cards for a site the user does not own", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :index})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status == 403)
  end


  test "update for a card the user does not own", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :update})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status == 403)
  end

  test "update for a card that the user does own", %{conn: conn, user: user} do
    private = Map.merge(conn.private, %{phoenix_action: :update})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site, user: user))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403)
  end

  test "delete for a card the user does not own", %{conn: conn} do
    private = Map.merge(conn.private, %{phoenix_action: :delete})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status == 403)
  end

  test "delete for a card that the user does own", %{conn: conn, user: user} do
    private = Map.merge(conn.private, %{phoenix_action: :delete})

    conn = conn
    |> Map.merge(%{private: private})
    |> assign(:authorizing_resource, insert(:site, user: user))
    |> PhxOembed.Plugs.Authorization.call(%{})

    assert(conn.assigns[:authorization_performed] == true)
    assert(conn.status != 403)
  end
end

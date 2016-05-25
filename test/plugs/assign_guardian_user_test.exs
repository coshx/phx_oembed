defmodule PhxOembed.AssignGuardianUserTest do
  use PhxOembed.ConnCase
  alias PhxOembed.Plugs.AssignGuardianUser

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> create()
    private = Map.merge(conn.private, %{guardian_default_resource: user})
    conn = Map.merge(conn, %{private: private})

    {:ok, user: user, conn: conn}
  end

  test "assigning the guardian user", %{ conn: conn, user: user } do
    conn = AssignGuardianUser.call(conn, %{})
    assert conn.assigns[:user] == user
  end
end

defmodule PhxOembed.CurrentUserControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, User}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the user is not signed in", %{conn: conn} do
    conn
    |> get(current_user_path(Endpoint, :show))
    |> json_response(:forbidden)
  end

  test "when the user is signed in", %{conn: conn} do
    token = create_user |> get_token(conn)

    conn
    |> put_req_header("authorization", token)
    |> get(current_user_path(Endpoint, :show))
    |> json_response(:ok)
  end

  defp create_user do
    attrs = %{email: "example@example.com", password: "password"}
    changeset = User.changeset(%User{}, attrs)
    Repo.insert!(changeset)
  end

  defp get_token(user, conn) do
    params = %{email: user.email, password: user.password}
    resp = conn
    |> post(session_path(Endpoint, :create, session: params))
    |> json_response(:created)

    resp["jwt"]
  end
end



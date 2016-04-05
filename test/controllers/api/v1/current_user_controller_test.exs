defmodule PhxOembed.CurrentUserControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, TestUtils}

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> create()
    {:ok, user: user, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the user is not signed in", %{conn: conn} do
    conn
    |> get(current_user_path(Endpoint, :show))
    |> json_response(:forbidden)
  end

  test "when the user is signed in", %{conn: conn, user: user} do
    token = TestUtils.get_user_token(user)
    conn
    |> put_req_header("authorization", token)
    |> get(current_user_path(Endpoint, :show))
    |> json_response(:ok)
  end
end



defmodule PhxOembed.SessionControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, User}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the info is correct", %{conn: conn} do
    user = create_user
    params = %{email: user.email, password: user.password}
    conn = post(conn, session_path(Endpoint, :create, session: params))
    resp = json_response(conn, :created)
    {:ok, user_as_json } = Poison.encode(user)
    assert String.length(resp["jwt"]) > 0
    assert resp["user"]["email"] == user.email
  end

  test "when the email does not match", %{conn: conn} do

  end

  test "when the password does not match", %{conn: conn} do

  end

  test "when no info matches", %{conn: conn} do

  end

  defp create_user do
    attrs = %{email: "example@example.com", password: "password"}
    changeset = User.changeset(%User{}, attrs)
    Repo.insert!(changeset)
  end
end

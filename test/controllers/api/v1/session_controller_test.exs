defmodule PhxOembed.SessionControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, User}
  require IEx
  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the info is correct", %{conn: conn} do
    user = create_user
    params = %{email: user.email, password: user.password}
    conn = post(conn, session_path(Endpoint, :create, session: params))
    resp = json_response(conn, :created)
    assert String.length(resp["jwt"]) > 0
    assert resp["user"]["email"] == user.email
  end

  test "when the email does not match", %{conn: conn} do
    user = create_user
    params = %{email: "doesnotmatch@example.com", password: user.password}
    conn = post(conn, session_path(Endpoint, :create, session: params))
    resp = json_response(conn, :unprocessable_entity)
    assert resp["error"] == "Invalid email or password"
  end

  test "when the password does not match", %{conn: conn} do
    user = create_user
    params = %{email: user.email, password: "doesnotmatch"}
    conn = post(conn, session_path(Endpoint, :create, session: params))
    resp = json_response(conn, :unprocessable_entity)
    assert resp["error"] == "Invalid email or password"
  end

  test "when no info matches", %{conn: conn} do
    create_user
    params = %{email: "doesnotmatch@example.com", password: "doesnotmatch"}
    conn = post(conn, session_path(Endpoint, :create, session: params))
    resp = json_response(conn, :unprocessable_entity)
    assert resp["error"] == "Invalid email or password"
  end

  test "when logging out with no session", %{conn: conn} do
    create_user
    conn = delete(conn, session_path(Endpoint, :delete))
    assert conn.status == 422
  end

  @tag :skip
  test "when logging out with a session", %{conn: conn} do
    conn = delete(conn, session_path(Endpoint, :delete))
    assert conn.status == 200
  end

  defp create_user do
    attrs = %{email: "example@example.com", password: "password"}
    changeset = User.changeset(%User{}, attrs)
    Repo.insert!(changeset)
  end
end

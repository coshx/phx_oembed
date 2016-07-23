defmodule PhxOembed.Api.SessionControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, TestUtils}

  setup %{conn: conn} do
    user = build(:user) |> set_password("password") |> insert()
    {:ok, user: user, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the info is correct", %{conn: conn, user: user} do
    params = %{email: user.email, password: user.password}
    resp = conn
    |> post(session_path(Endpoint, :create, session: params))
    |> json_response(:created)

    assert String.length(resp["jwt"]) > 0
    assert resp["user"]["email"] == user.email
  end

  test "when the email does not match", %{conn: conn, user: user} do
    params = %{email: "doesnotmatch@example.com", password: user.password}
    resp = conn
    |> post(session_path(Endpoint, :create, session: params))
    |> json_response(:unprocessable_entity)

    assert resp["error"] == "Invalid email or password"
  end

  test "when the password does not match", %{conn: conn, user: user} do
    params = %{email: user.email, password: "doesnotmatch"}
    resp = conn
    |> post(session_path(Endpoint, :create, session: params))
    |> json_response(:unprocessable_entity)

    assert resp["error"] == "Invalid email or password"
  end

  test "when no info matches", %{conn: conn} do
    params = %{email: "doesnotmatch@example.com", password: "doesnotmatch"}
    resp = conn
    |> post(session_path(Endpoint, :create, session: params))
    |> json_response(:unprocessable_entity)

    assert resp["error"] == "Invalid email or password"
  end

  test "when logging out with no session", %{conn: conn} do
    conn = delete(conn, session_path(Endpoint, :delete))
    assert conn.status == 422
  end

  test "when logging out with a session", %{conn: conn, user: user} do
    token = TestUtils.get_user_token(user)
    resp = conn
    |> put_req_header("authorization", token)
    |> delete(session_path(Endpoint, :delete))

    assert resp.status == 200
  end
end

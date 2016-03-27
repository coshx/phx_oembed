defmodule PhxOembed.CurrentUserControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Endpoint, User}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "when the user is not signed in" do
    conn = get(conn, current_user_path(Endpoint, :show))
    json_response(conn, :forbidden)
  end

  test "when the user is signed in" do
    user = create_user
    # get a jwt token
    # set that token as a header


    #conn = get(conn, current_user_path(Endpoint, :show))
    #json_response(conn, :ok)
  end

  defp create_user do
    attrs = %{email: "example@example.com", password: "password"}
    changeset = User.changeset(%User{}, attrs)
    Repo.insert!(changeset)
  end
end



defmodule PhxOembed.SessionController do
  use PhxOembed.Web, :controller

  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params}) do
    case PhxOembed.Session.authenticate(session_params) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", jwt: jwt, user: user)

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", error: "Invalid email or password")
    end
  end

  def delete(conn, _) do
    case Guardian.Plug.claims(conn) do
    {:ok, claims} ->

      conn
      |> Guardian.Plug.current_token
      |> Guardian.revoke!(claims)

      conn
      |> put_status(:ok)
      |> render("success.json", message: "Logged out")

    {:error, _} ->
      conn
      |> put_status(:unprocessable_entity)
      |> render("error.json", error: "Could not log out")

    end
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(PhxOembed.SessionView, "error.json", error: "Not Autenthicated")
  end
end

defmodule PhxOembed.SessionController do
  use PhxOembed.Web, :controller
  require IEx

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
        |> render("error.json")
    end
  end
end

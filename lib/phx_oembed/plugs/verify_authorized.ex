defmodule PhxOembed.Plugs.VerifyAuthorized do

  defexception message: "Authorization not performed"

  def init(default), do: default

  def call(conn, _) do
    try do
      unless conn.assigns.authorization_performed == true do
        raise PhxOembed.Plugs.VerifyAuthorized
      end
    rescue _ in KeyError -> raise PhxOembed.Plugs.VerifyAuthorized
    end

    conn
  end
end

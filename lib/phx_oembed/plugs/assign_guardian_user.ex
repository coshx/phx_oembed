defmodule PhxOembed.Plugs.AssignGuardianUser do
  import Plug.Conn

  def init(default), do: default

  def call(conn, _) do
    assign(conn, :user, conn.private.guardian_default_resource)
  end
end

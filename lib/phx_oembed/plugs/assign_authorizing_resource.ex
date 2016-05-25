defmodule PhxOembed.Plugs.AssignAuthorizingResource do
  import Plug.Conn

  def init(default), do: default

  def call(conn, %{resource: resource, resource_id: resource_id}) do
    {resource_id, _} = Integer.parse(conn.params[resource_id])
    resource = PhxOembed.Repo.get(resource, resource_id)
    assign(conn, :authorizing_resource, resource)
  end
end

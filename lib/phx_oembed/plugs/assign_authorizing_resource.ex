defmodule PhxOembed.Plugs.AssignAuthorizingResource do
  import Plug.Conn

  def init(default), do: default

  def call(conn, %{resource: resource, resource_id: resource_id}) do
    resource_id = conn.params[resource_id]

    if resource_id == nil do
      resource = %{}
    else
      {resource_id, _} = Integer.parse(resource_id)
      resource = PhxOembed.Repo.get(resource, resource_id)
    end

    assign(conn, :authorizing_resource, resource)
  end
end

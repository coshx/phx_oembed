defmodule PhxOembed.AssignAuthorizingResourceTest do
  use PhxOembed.ConnCase
  alias PhxOembed.{Site, Plugs.AssignAuthorizingResource}

  setup %{conn: conn} do
    site = insert(:site)
    conn = Map.merge(conn, %{params: %{"site_id" => Integer.to_string(site.id)}})
    {:ok, conn: conn, site: site}
  end

  test "assigning the authorizing resource", %{conn: conn, site: site} do
    args = %{resource: Site, resource_id: "site_id"}
    conn = AssignAuthorizingResource.call(conn, args)
    assert conn.assigns[:authorizing_resource] == site
  end
end

defmodule PhxOembed.Oembed.CardControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.Endpoint

  setup %{conn: conn} do
    {:ok,
     site: insert(:site),
     conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows the right card", %{conn: conn, site: site} do
    card = insert(:card, site: site, title: "test card")
    url = make_url(site.protocol, site.domain, card.path)
    resp = conn
    |> get(site_card_path(Endpoint, :show, site.id, url: url))
    |> json_response(:ok)

    assert resp["title"] == card.title
    assert resp["url"] == url
    assert resp["type"] == card.card_type
    assert resp["version"] == "1.0"
  end

  test "returns xml when requested", %{conn: conn, site: site} do
    card = insert(:card, site: site, title: "test card")
    url = make_url(site.protocol, site.domain, card.path)
    resp = conn
    |> get(site_card_path(Endpoint, :show, site.id, url: url, format: "xml"))

    assert resp.status == 200
    assert {"content-type", "text/xml; charset=utf-8"} = List.first(resp.resp_headers)
  end

  test "returns 404 when the id != the card's site", %{conn: conn, site: site} do
    site2 = insert(:site)
    card = insert(:card, site: site)
    url = make_url(site.protocol, site.domain, card.path)
    conn = get(conn, site_card_path(Endpoint, :show, site2.id, url: url))
    assert json_response(conn, 404) == nil
  end

  test "returns 404 when the domain in url != site domain", %{conn: conn, site: site} do
    card = insert(:card, site: site)
    url = make_url(site.protocol, "fakedomain.com", card.path)
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 404) == nil
  end

  test "returns 404 when card does not exist", %{conn: conn, site: site} do
    insert(:card, site: site)
    url = make_url(site.protocol, site.domain, "doesnotexist")
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 404) == nil
  end

  defp make_url(protocol, domain, path) do
    protocol <> "://" <> domain <> "/" <> path
  end
end

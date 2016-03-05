defmodule PhxOembed.CardControllerTest do
  use PhxOembed.ConnCase

  alias PhxOembed.Endpoint
  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows the right card", %{conn: conn} do
    site = create(:site)
    card = create(:card, site: site, title: "test card")
    url = make_url(site.protocol, site.domain, card.path)
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    resp = json_response(conn, 200)
    assert resp["title"] == card.title
    assert resp["url"] == url
  end

  test "returns xml when requested", %{conn: conn} do
    site = create(:site)
    card = create(:card, site: site, title: "test card")
    url = make_url(site.protocol, site.domain, card.path)
    resp = get(conn, site_card_path(Endpoint, :show, site.id, url: url, format: "xml"))
    assert resp.status == 200
  end

  test "returns 404 when the site id != the card's site", %{conn: conn} do
    site = create(:site)
    site2 = create(:site)
    card = create(:card, site: site)
    url = make_url(site.protocol, site.domain, card.path)
    conn = get(conn, site_card_path(Endpoint, :show, site2.id, url: url))
    assert json_response(conn, 404) == nil
  end

  test "returns 404 when the domain in the url != site domain", %{conn: conn} do
    site = create(:site)
    card = create(:card, site: site)
    url = make_url(site.protocol, "fakedomain.com", card.path)
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 404) == nil
  end

  test "returns 404 when card does not exist", %{conn: conn} do
    site = create(:site)
    create(:card, site: site)
    url = make_url(site.protocol, site.domain, "doesnotexist")
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 404) == nil
  end

  def make_url(protocol, domain, path) do
    protocol <> "://" <> domain <> "/" <> path
  end
end

defmodule PhxOembed.CardControllerTest do
  use PhxOembed.ConnCase

  alias PhxOembed.Endpoint

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "shows the right card", %{conn: conn} do
    site = create(:site)
    card = create(:card, site: site, title: "test card")
    url = site.protocol <> "://" <> site.domain <> "/" <> card.path
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    resp = json_response(conn, 200)
    assert resp["title"] == card.title
    assert resp["url"] == url
  end

  test "throws an error when the site id does not match the card's site" do
    site = create(:site)
    site2 = create(:site)
    card = create(:card, site: site)
    url = site.protocol <> "://" <> site.domain <> "/" <> card.path
    conn = get(conn, site_card_path(Endpoint, :show, site2.id, url: url))
    assert json_response(conn, 404) == nil
  end

  test "throws an error when the domain in the url doesn't match the site domain" do
    site = create(:site)
    card = create(:card, site: site)
    url = site.protocol <> "://" <> "fakedomain.com" <> "/" <> card.path
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 404) == nil
  end

  @tag :wip
  test "throws an error when card does not exist", %{conn: conn} do
    site = create(:site)
    card = create(:card, site: site)
    url = site.protocol <> "://" <> site.domain <> "/" <> "doesnotexist"
    conn = get(conn, site_card_path(Endpoint, :show, site.id, url: url))
    assert json_response(conn, 404) == nil
  end
end

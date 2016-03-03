defmodule PhxOembed.SiteTest do
  use PhxOembed.ModelCase
  import PhxOembed.Factory

  alias PhxOembed.Site
  alias PhxOembed.Card

  @valid_attrs %{domain: "example.com", protocol: "https"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Site.changeset %Site{}, @valid_attrs
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Site.changeset %Site{}, @invalid_attrs
    refute changeset.valid?
  end

  test "protocol default values" do
    site = Repo.insert! %Site{domain: "example.com"}
    site = Repo.get Site, site.id
    assert site.protocol == "http"
  end

  test "cards relationship" do
    site = create(:site)
    create(:card, site: site)
    create(:card, site: site)
    create(:card)

    site = Site
    |> Repo.get(site.id)
    |> Repo.preload(:cards)

    assert Enum.count(site.cards) == 2
  end
end

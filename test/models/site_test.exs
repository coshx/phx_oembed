defmodule PhxOembed.SiteTest do
  use PhxOembed.ModelCase
  import PhxOembed.Factory

  alias PhxOembed.Site

  @valid_attrs %{domain: "example.com", protocol: "https"}
  @invalid_attrs %{domain: "", protocol: ""}

  test "changeset with valid attributes" do
    changeset = Site.changeset(%Site{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Site.changeset(%Site{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset with missing attributes" do
    changeset = Site.changeset(%Site{}, %{})
    refute changeset.valid?
  end

  test "default protocol" do
    site = create(:site)
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

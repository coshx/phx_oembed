defmodule PhxOembed.SiteTest do
  use PhxOembed.ModelCase

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

  test "cards relationship" do
    site = Repo.insert! %Site{domain: "example.com", protocol: "https"}
    Repo.insert! %Card{path: "cats", card_type: "twitter", site_id: site.id}
    Repo.insert! %Card{path: "dogs", card_type: "twitter", site_id: site.id}
    Repo.insert! %Card{path: "mice", card_type: "facebook"}

    site = Site
    |> Repo.get(site.id)
    |> Repo.preload(:cards)

    assert Enum.count(site.cards) == 2
  end
end

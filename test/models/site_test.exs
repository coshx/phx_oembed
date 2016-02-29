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
    card1 = Repo.insert! %Card{url: "cats", card_type: "twitter"}
    card2 = Repo.insert! %Card{url: "dogs", card_type: "twitter"}

    site = Repo.get Site, site.id
    cards = [card1, card2]
    assert cards = site.cards
  end
end

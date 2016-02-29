defmodule PhxOembed.CardTest do
  use PhxOembed.ModelCase

  alias PhxOembed.Card
  alias PhxOembed.Site

  @valid_attrs %{url: "http://example.com/cats", card_type: "twitter"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Card.changeset(%Card{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Card.changeset(%Card{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "site relationship" do
    site = Repo.insert! %Site{domain: "example.com", protocol: "https"}
    card = Repo.insert! %Card{url: "cats", card_type: "twitter", site_id: site.id}

    card = Card
    |> Repo.get(card.id)
    |> Repo.preload(:site)

    assert site == card.site
  end
end

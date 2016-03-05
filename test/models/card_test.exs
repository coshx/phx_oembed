defmodule PhxOembed.CardTest do
  use PhxOembed.ModelCase
  import PhxOembed.Factory

  alias PhxOembed.Card

  @valid_attrs %{path: "http://example.com/cats", card_type: "twitter"}
  @invalid_attrs %{path: "", card_type: ""}
  @missing_attrs %{}

  test "changeset with valid attributes" do
    changeset = Card.changeset(%Card{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Card.changeset(%Card{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset with missing attributes" do
    changeset = Card.changeset(%Card{}, @missing_attrs)
    refute changeset.valid?
  end

  test "site relationship" do
    site = create(:site)
    card = create(:card, site: site)

    card = Card
    |> Repo.get(card.id)
    |> Repo.preload(:site)

    assert site == card.site
  end
end

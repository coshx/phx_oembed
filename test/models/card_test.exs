defmodule PhxOembed.CardTest do
  use PhxOembed.ModelCase
  import PhxOembed.Factory

  alias PhxOembed.Card

  @valid_attrs %{path: "cats", card_type: "twitter"}
  @invalid_attrs %{path: "", card_type: ""}

  test "changeset with valid attributes" do
    changeset = Card.changeset(%Card{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Card.changeset(%Card{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset with missing attributes" do
    changeset = Card.changeset(%Card{}, %{})
    refute changeset.valid?
  end

  test "site relationship" do
    site = insert(:site)
    card = insert(:card, site: site)

    card = Card
    |> Repo.get(card.id)
    |> Repo.preload(:site)

    assert site == card.site
  end
end

defmodule PhxOembed.CardTest do
  use PhxOembed.ModelCase

  alias PhxOembed.Card

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
end

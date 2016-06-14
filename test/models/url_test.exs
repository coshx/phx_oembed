defmodule PhxOembed.UrlTest do
  use PhxOembed.ModelCase
  alias PhxOembed.Url

  @valid_attrs %{path: "https://www.example.org"}
  @invalid_attrs %{path: ""}

  test "changeset with valid attributes" do
    changeset = Url.changeset(%Url{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Url.changeset(%Url{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "changeset with missing attributes" do
    changeset = Url.changeset(%Url{}, %{})
    refute changeset.valid?
  end
end

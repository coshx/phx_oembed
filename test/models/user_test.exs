defmodule PhxOembed.UserTest do
  use PhxOembed.ModelCase
  import PhxOembed.Factory
  alias PhxOembed.User

  @valid_attrs %{first_name: "Jose", last_name: "Valim",
                 email: "jose@example.com", password: "password",
                 password_confirmation: "password"}

  test "sites relationship" do
    user = build(:user) |> set_password("password") |> insert()
    insert(:site, user: user)
    insert(:site, user: user)

    user = User
    |> Repo.get(user.id)
    |> Repo.preload(:sites)

    assert(Enum.count(user.sites) == 2)
  end

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with blank first name" do
    attrs = Map.put(@valid_attrs, :first_name, "")
    changeset = User.changeset(%User{}, attrs)
    assert changeset.valid?
  end

  test "changeset with blank last name" do
    attrs = Map.put(@valid_attrs, :last_name, "")
    changeset = User.changeset(%User{}, attrs)
    assert changeset.valid?
  end

  test "changeset with no email" do
    attrs = Map.put(@valid_attrs, :email, "")
    changeset = User.changeset(%User{}, attrs)
    refute changeset.valid?
  end

  test "changeset with no password" do
    attrs = Map.put(@valid_attrs, :password, "")
    changeset = User.changeset(%User{}, attrs)
    refute changeset.valid?
  end

  test "changeset with no pw_conf" do
    attrs = Map.put(@valid_attrs, :password_confirmation, "")
    changeset = User.changeset(%User{}, attrs)
    refute changeset.valid?
  end

  test "changeset without matching password confirmation" do
    attrs = Map.put(@valid_attrs, :password, "password")
    |> Map.put(:password_confirmation, "1234")

    changeset = User.changeset(%User{}, attrs)
    refute changeset.valid?
  end

  test "unique emails" do
    user = build(:user) |> set_password("password") |> insert()
    changeset = User.changeset(%User{}, %{email: user.email, password: "password",
                                          password_confirmation: "password"})
    catch_error Repo.insert!(changeset)
  end
end

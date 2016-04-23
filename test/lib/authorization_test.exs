defmodule PhxOembed.AuthorizationTest do
  use PhxOembed.ModelCase
  alias PhxOembed.Authorization
  import PhxOembed.Factory
  require IEx

  test "default" do
    auth = Authorization.authorize(%{}, %{}, %{}, %{})
    assert auth == false
  end

  test "Card INDEX when the user owns the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site, user: user)
    auth = Authorization.authorize(:card, :index, user, site)

    assert auth == true
  end

  test "Card INDEX when the user does not own the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site)
    auth = Authorization.authorize(:card, :index, user, site)

    assert auth == false
  end

  test "Card CREATE when the user owns the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site, user: user)
    auth = Authorization.authorize(:card, :create, user, site)

    assert auth == true
  end

  test "Card CREATE when the user does not own the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site)
    auth = Authorization.authorize(:card, :create, user, site)

    assert auth == false
  end

  test "Site CREATE" do
    user = build(:user) |> set_password("password") |> create()

    auth = Authorization.authorize(:site, :create, user)
    assert auth == true
  end

  test "Site SHOW when the user owns the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site, user: user)

    auth = Authorization.authorize(:site, :show, user, site)
    assert auth == true
  end

  test "Site SHOW when the user does not own the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site)

    auth = Authorization.authorize(:site, :show, user, site)
    assert auth == false
  end

  test "Site UPDATE when the user owns the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site, user: user)

    auth = Authorization.authorize(:site, :update, user, site)
    assert auth == true
  end

  test "Site UPDATE when the user does not own the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site)

    auth = Authorization.authorize(:site, :update, user, site)
    assert auth == false
  end

  test "Site INDEX" do
    user = build(:user) |> set_password("password") |> create()

    auth = Authorization.authorize(:site, :index, user)
    assert auth == true
  end

  test "Site DELETE when the user owns the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site, user: user)

    auth = Authorization.authorize(:site, :delete, user, site)
    assert auth == true
  end

  test "Site DELETE when the user does not own the site" do
    user = build(:user) |> set_password("password") |> create()
    site = create(:site)

    auth = Authorization.authorize(:site, :delete, user, site)
    assert auth == false
  end
end

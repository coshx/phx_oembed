defmodule PhxOembed.Factory do

  use ExMachina.Ecto, repo: PhxOembed.Repo
  alias PhxOembed.{User, Site, Card, Url}

  def site_factory do
    %Site{domain: "example.com"}
  end

  def card_factory do
    %Card{path: "cats",
          card_type: "twitter",
          site: build(:site)}
  end

  def user_factory do
    # Ex Machina factories bypass custom changesets, so we set the encrypted
    # password field here to avoid not_null_violation db errors.
    %User{email: sequence(:email, &"email-#{&1}@example.com")}
  end

  def url_factory do
    %Url{path: "foo", site: build(:site)}
  end

  # https://github.com/thoughtbot/ex_machina/issues/82
  def set_password(user, password) do
    user
    |> User.changeset(%{"password" => password})
    |> Ecto.Changeset.apply_changes()
  end
end

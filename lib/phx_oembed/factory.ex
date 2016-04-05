defmodule PhxOembed.Factory do

  use ExMachina.Ecto, repo: PhxOembed.Repo
  alias PhxOembed.{User, Site, Card}

  def factory(:site) do
    %Site{domain: "example.com"}
  end

  def factory(:card) do
    %Card{path: "cats",
          card_type: "twitter",
          site: build(:site)}
  end

  def factory(:user) do
    # Ex Machina factories bypass custom changesets, so we set the encrypted
    # password field here to avoid not_null_violation db errors.
    %User{email: "example@example.com"}
  end

  # https://github.com/thoughtbot/ex_machina/issues/82
  def set_password(user, password) do
    user
    |> User.changeset(%{"password" => password})
    |> Ecto.Changeset.apply_changes()
  end
end

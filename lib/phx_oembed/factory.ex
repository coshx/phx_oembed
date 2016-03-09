defmodule PhxOembed.Factory do

  use ExMachina.Ecto, repo: PhxOembed.Repo
  alias PhxOembed.Card
  alias PhxOembed.Site
  alias PhxOembed.User

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
    %User{email: "example@example.com", encrypted_password: "123456"}
  end
end

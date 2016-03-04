defmodule PhxOembed.Factory do

  use ExMachina.Ecto, repo: PhxOembed.Repo
  alias PhxOembed.Card
  alias PhxOembed.Site

  def factory(:site) do
    %Site{domain: "example.com"}
  end

  def factory(:card) do
    %Card{path: "cats",
          card_type: "twitter",
          site: build(:site)}
  end
end

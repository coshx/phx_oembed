defmodule PhxOembed.CardView do
  use PhxOembed.Web, :view

  def render("index.json", %{cards: cards}) do
    %{data: render_many(cards, PhxOembed.CardView, "card.json")}
  end

  def render("show.json", %{card: card}) do
    %{data: render_one(card, PhxOembed.CardView, "card.json")}
  end

  def render("card.json", %{card: card}) do
    %{id: card.id}
  end
end

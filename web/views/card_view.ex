defmodule PhxOembed.CardView do
  use PhxOembed.Web, :view

  def render("show.json", %{card: card}) do
    card
  end
end

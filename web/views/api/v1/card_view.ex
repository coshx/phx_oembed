defmodule PhxOembed.Api.CardView do
  use PhxOembed.Web, :view
  alias PhxOembed.Repo

  def render("index.json", %{cards: cards}) do
    render_many(cards, PhxOembed.Api.CardView, "show.json")
  end

  def render("show.json", %{card: card}) do
    %{
      id:                 card.id,
      path:               card.path,
      version:            card.version,
      type:               card.card_type,
      title:              card.title,
      author_name:        card.author_name,
      author_url:         card.author_url,
      provider_name:      card.provider_name,
      provider_url:       card.provider_url,
      cache_age:          card.cache_age,
      thumbnail_url:      card.thumbnail_url,
      thumbnail_width:    card.thumbnail_width,
      thumbnail_height:   card.thumbnail_height,
      html:               card.html,
      width:              card.width,
      height:             card.height
     }
  end
end

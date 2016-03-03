defmodule PhxOembed.CardView do
  use PhxOembed.Web, :view

  def render("show.json", %{card: card}) do
    %{
      path:               card.path,
      card_type:          card.card_type,
      title:              card.title,
      author_name:        card.author_name,
      author_url:         card.author_url,
      provider_name:      card.provider_name,
      provider_url:       card.provider_url,
      cache_age:          card.cache_age,
      thumbnail_url:      card.thumbnail_url,
      thumbnail_width:    card.thumbnail_width,
      thumbnail_height:   card.thumbnail_height
     }
  end
end

defmodule PhxOembed.CardView do
  use PhxOembed.Web, :view
  alias PhxOembed.Repo

  def render("show.json", %{card: card}) do
    card = Repo.preload(card, :site)
    site = card.site
    url = site.protocol <> "://" <> site.domain <> "/" <> card.path
    %{
      url:                url,
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

  def render("show.xml", %{card: card}) do
    card = Repo.preload(card, :site)
    site = card.site
    url = site.protocol <> "://" <> site.domain <> "/" <> card.path

    {:oembed, nil,
      [
        {:url,              nil, url},
        {:card_type,        nil, card.card_type},
        {:title,            nil, card.title},
        {:author_name,      nil, card.author_name},
        {:author_url,       nil, card.author_url},
        {:provider_name,    nil, card.provider_name},
        {:provider_url,     nil, card.provider_url},
        {:cache_age,        nil, card.cache_age},
        {:thumbnail_url,    nil, card.thumbnail_url},
        {:thumbnail_width,  nil, card.thumbnail_width},
        {:thumbnail_height, nil, card.thumbnail_height}
      ]
    } |> XmlBuilder.generate
  end
end

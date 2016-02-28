defmodule PhxOembed.Card do
  use PhxOembed.Web, :model

  schema "cards" do
    field :url,               :string, null: false
    field :card_type,         :string, null: false
    field :title,             :string, default: ""
    field :author_name,       :string, default: ""
    field :author_url,        :string, default: ""
    field :provider_name,     :string, default: ""
    field :provider_url,      :string, default: ""
    field :cache_age,         :string, default: ""
    field :thumbnail_url,     :string, default: ""
    field :thumbnail_width,   :string, default: ""
    field :thumbnail_height,  :string, default: ""
    timestamps
  end

  @required_fields ~w(url card_type)
  @optional_fields ~w(title author_name author_url provider_name provider_url
                      cache_age thumbnail_url thumbnail_width thumbnail_height)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  @doc """
  custom JSON serialization to avoid serializing meta keys
  https://github.com/elixir-lang/ecto/issues/840
  """
  defimpl Poison.Encoder, for: PhxOembed.Card do
    def encode(model, opts) do
      model
        |> Map.take([:url, :card_type, :title, :author_name, :author_url, 
                     :provider_name, :provider_url, :cache_age, :thumbnail_url,
                     :thumbnail_width, :thumbnail_height])
        |>Poison.Encoder.encode(opts)
    end
  end
end

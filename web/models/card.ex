defmodule PhxOembed.Card do
  use PhxOembed.Web, :model

  schema "cards" do
    belongs_to :site, PhxOembed.Site
    field :path,              :string, null: false
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
    field :height,            :integer
    field :width,             :integer
    field :html,              :string, default: ""
    timestamps
  end

  @required_fields ~w(path card_type)
  @optional_fields ~w(title author_name author_url provider_name provider_url
                      cache_age thumbnail_url thumbnail_width thumbnail_height
                      height width html)

  @doc """
  Card changeset. Fields 'url' and 'card_type required'
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:path, min: 1)
    |> validate_length(:card_type, min: 1)
  end
end

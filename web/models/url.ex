defmodule PhxOembed.Url do
  use PhxOembed.Web, :model

  schema "urls" do
    belongs_to :site, PhxOembed.Site
    field :path,    :string,  null: false
    field :crawled, :boolean, default: false
    timestamps
  end

  @required_fields ~w(path)
  @optional_fields ~w(crawled)

  @doc """
  Site changeset. Field 'path' required
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:path, min: 1)
  end
end

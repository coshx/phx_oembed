defmodule PhxOembed.Site do
  use PhxOembed.Web, :model

  schema "sites" do
    field :domain,        :string, null: false
    field :protocol,      :string, null: false
    timestamps
  end

  @required_fields ~w(domain protocol)
  @optional_fields ~w()

  @doc """
  Site changeset. Fields 'domain' and 'protocol' required
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end

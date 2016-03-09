defmodule PhxOembed.User do
  use PhxOembed.Web, :model
  schema "users" do
    field :first_name,            :string, default: ""
    field :last_name,             :string, default: ""
    field :email,                 :string, null: false
    field :encrypted_password,    :string, null: false
    field :password,              :string, virtual: true
    field :password_confirmation, :string, virtual: true
    timestamps
  end

  @required_fields ~w(email password)
  @optional_fields ~w(first_name last_name encrypted_password)

  @doc """
  User changset. Fields email and password required
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:email, min: 1)
    |> validate_length(:password, min: 1)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email has already been taken")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(changeset) do
    pass = changeset.params["password"]
    put_change(changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(pass))
  end
end

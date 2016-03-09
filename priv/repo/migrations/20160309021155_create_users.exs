defmodule PhxOembed.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first_name, :string, default: ""
      add :last_name, :string, default: ""
      add :email, :string, null: false
      add :encrypted_password, :string, null: false
      timestamps
    end

    create unique_index(:users, [:email])
  end
end

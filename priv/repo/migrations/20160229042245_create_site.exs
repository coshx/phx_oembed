defmodule PhxOembed.Repo.Migrations.CreateSite do
  use Ecto.Migration

  def change do
    create table(:sites) do
      add :domain,        :string, null: false
      add :protocol,      :string, null: false

      timestamps
    end

  end
end

defmodule PhxOembed.Repo.Migrations.AddDefaultProtocolForSite do
  use Ecto.Migration

  def change do
    alter table(:sites) do
      remove :protocol
      add :protocol, :string, default: "http", null: false
    end

    create index(:sites, [:domain])
  end
end

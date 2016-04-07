defmodule PhxOembed.Repo.Migrations.AddForeignKeyToSites do
  use Ecto.Migration

  def change do
    alter table(:sites) do
      add :user_id, references(:users, on_delete: :delete_all)
    end

    create index(:sites, [:user_id])
  end
end

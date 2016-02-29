defmodule PhxOembed.Repo.Migrations.AddSiteIdToCards do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      add :site_id, references(:sites, on_delete: :delete_all)
    end

    create index(:cards, [:site_id])
  end
end

defmodule PhxOembed.Repo.Migrations.CreateUrls do
  use Ecto.Migration

  def change do
    create table(:urls) do
      add :site_id, references(:sites, on_delete: :delete_all)
      add :path, :string, null: false
      add :crawled, :boolean, default: false

      timestamps
    end

    create index(:urls, [:site_id])
    create index(:urls, [:path])
  end
end

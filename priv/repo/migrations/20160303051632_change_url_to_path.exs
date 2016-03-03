defmodule PhxOembed.Repo.Migrations.ChangeUrlToPath do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      remove :url
      add :path, :string, null: false
    end

    create index(:cards, [:path])
  end
end

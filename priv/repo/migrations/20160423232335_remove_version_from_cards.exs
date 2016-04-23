defmodule PhxOembed.Repo.Migrations.RemoveVersionFromCards do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      remove :version
    end
  end
end

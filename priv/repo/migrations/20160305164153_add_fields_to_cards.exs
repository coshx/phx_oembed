defmodule PhxOembed.Repo.Migrations.AddFieldsToCards do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      add :version, :string, null: false, default: "1.0"
      add :height, :integer
      add :width, :integer
      add :html, :string, default: ""
    end
  end
end

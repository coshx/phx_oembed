defmodule PhxOembed.Repo.Migrations.CreateCard do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :url,               :string, null: false
      add :card_type,         :string, null: false
      add :title,             :string, default: ""
      add :author_name,       :string, default: ""
      add :author_url,        :string, default: ""
      add :provider_name,     :string, default: ""
      add :provider_url,      :string, default: ""
      add :cache_age,         :string, default: ""
      add :thumbnail_url,     :string, default: ""
      add :thumbnail_width,   :string, default: ""
      add :thumbnail_height,  :string, default: ""
      timestamps
    end

    create unique_index(:cards, [:url])
  end
end

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PhxOembed.Repo.insert!(%PhxOembed.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias PhxOembed.{Repo, User}

user_attrs = %{first_name: "Jose", last_name: "Valim",
               email: "example@example.com", password: "password",
               password_confirmation: "password"}
user_changeset = User.changeset(%User{}, user_attrs)

user = Repo.insert!(user_changeset)

user2_attrs = %{first_name: "Jose", last_name: "Valim",
               email: "example2@example.com", password: "password",
               password_confirmation: "password"}
user2_changeset = User.changeset(%User{}, user2_attrs)

user2 = Repo.insert!(user2_changeset)

site = user
|> Ecto.build_assoc(:sites, %{domain: "example.com", protocol: "https"})
|> Repo.insert!

site
|> Ecto.build_assoc(:cards, %{path: "/foo", card_type: "twitter"})
|> Repo.insert!

site = user
|> Ecto.build_assoc(:sites, %{domain: "example.org", protocol: "http"})
|> Repo.insert!

site
|> Ecto.build_assoc(:cards, %{path: "/baz", card_type: "twitter"})
|> Repo.insert!

site = user
|> Ecto.build_assoc(:sites, %{domain: "foo.com", protocol: "https"})
|> Repo.insert!


site
|> Ecto.build_assoc(:cards, %{path: "/cats", card_type: "twitter"})
|> Repo.insert!

site = user
|> Ecto.build_assoc(:sites, %{domain: "bar.com", protocol: "https"})
|> Repo.insert!


site
|> Ecto.build_assoc(:cards, %{path: "/dogs", card_type: "twitter"})
|> Repo.insert!

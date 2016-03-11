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
alias PhxOembed.{Repo, Card, List, User}

user_attrs = %{first_name: "Jose", last_name: "Valim",
               email: "example@example.com", password: "password",
               password_confirmation: "password"}
user_changeset = User.changeset(%User{}, user_attrs)
Repo.insert!(user_changeset)

{:ok, _} = Application.ensure_all_started(:ex_machina)
ExUnit.start
Ecto.Adapters.SQL.Sandbox.mode(PhxOembed.Repo, :manual)

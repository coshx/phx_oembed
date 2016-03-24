defmodule PhxOembed.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  imports other functionality to make it easier
  to build and query models.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest

      alias PhxOembed.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query, only: [from: 1, from: 2]
      require IEx
      import PhxOembed.Router.Helpers

      # The default endpoint for testing
      @endpoint PhxOembed.Endpoint

      import PhxOembed.Factory

      # https://github.com/hassox/phoenix_guardian/blob/ueberauth-guardian/test/support/conn_case.ex
      #def guardian_login(%PhxOembed.User{} = user), do: guardian_login(conn(), user, :token, [])
      #def guardian_login(%PhxOembed.User{} = user, token), do: guardian_login(conn(), user, token, [])
      #def guardian_login(%PhxOembed.User{} = user, token, opts), do: guardian_login(conn(), user, token, opts)

      #def guardian_login(%Plug.Conn{} = conn, user), do: guardian_login(conn, user, :token, [])
      #def guardian_login(%Plug.Conn{} = conn, user, token), do: guardian_login(conn, user, token, [])
      def guardian_login(%Plug.Conn{} = conn, user) do
        conn
          |> bypass_through(PhxOembed.Router, [:api])
          |> get("/") # https://github.com/phoenixframework/phoenix/issues/861
          |> fetch_session
          |> Guardian.Plug.sign_in(user, :token, [])
          |> send_resp(200, "Flush the session")
          |> recycle()
      end
    end
  end

  setup tags do
    unless tags[:async] do
      Ecto.Adapters.SQL.restart_test_transaction(PhxOembed.Repo, [])
    end

    {:ok, conn: Phoenix.ConnTest.conn()}
  end
end

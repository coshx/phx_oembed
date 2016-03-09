use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phx_oembed, PhxOembed.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :phx_oembed, PhxOembed.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "phx_oembed_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# speed up tests by reducing the number of hashing rounds
config :comeonin, :bcrypt_log_rounds, 1

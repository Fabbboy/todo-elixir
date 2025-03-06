import Config

config :logger, :console,
  format: "[$level] $message\n",
  metadata: [:request_id]

config :todo, Todo.Repo,
  database: "todo_dev.sqlite3",
  pool_size: 10

config :todo, ecto_repos: [Todo.Repo]

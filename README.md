# Todo App using Elixir and NextJS

## Install and Run

You need the Erlang Runtime and Elixir compiler
```
sudo add-apt-repository ppa:rabbitmq/rabbitmq-erlang
sudo apt update
sudo apt install git elixir erlang
```

After that install hex package manager and the packages and apply migrations
```
mix local.hex
mix deps.get
mix ecto.migrate
```

Compile and run using:
```
mix run --no-halt
```



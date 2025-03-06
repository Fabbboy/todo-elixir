defmodule Todo.Router do
  use Plug.Router

  plug(Todo.LoggingPlug)

  plug(Plug.Static,
    at: "/",
    from: "priv/dist",
    gzip: false
  )

  plug(:match)
  plug(:dispatch)

  forward("/api", to: Todo.Api.Router)

  match "/" do
    send_file(conn, 200, "priv/dist/index.html")
  end

  match _ do
    send_file(conn, 404, "priv/dist/404.html")
  end
end

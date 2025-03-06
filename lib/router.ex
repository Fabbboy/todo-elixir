defmodule Todo.Router do
  use Plug.Router

  plug(Plug.Static,
    at: "/",
    from: Path.expand("dist"),
    gzip: false
  )

  plug(:match)
  plug(:dispatch)

  forward("/api", to: Todo.Api.Router)

  get "/" do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Path.expand("dist/index.html"))
  end

  match _ do
    send_file(conn, 404, "dist/404.html")
  end
end

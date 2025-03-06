defmodule Todo.Api.Router do
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/*p" do
    send_resp(conn, 200, ~s({"message": "Hello on URL: #{conn.request_path}"}))
  end
end

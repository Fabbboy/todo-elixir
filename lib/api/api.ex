defmodule Todo.Api.Router do
  use Plug.Router

  plug(:match)

  plug(Plug.Parsers,
    parsers: [:json],
    pass: ["application/json"],
    json_decoder: Jason
  )

  plug(:dispatch)

  defp json(conn, body) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(body))
  end

  post "/" do
    with {:ok, todo_item} <- Todo.Items.create_item(conn.body_params) do
      json(conn, Map.put(todo_item, :message, "Todo created!"))
    else
      {:error, changeset} -> json(conn, %{error: "Failed to create todo", details: changeset})
    end
  end

  get "/" do
    json(conn, Todo.Items.get_all())
  end

  patch "/:id" do
    with {:ok, todo_item} <- Todo.Items.check_todo(conn.params["id"]) do
      json(conn, Map.put(todo_item, :message, "Todo checked!"))
    else
      {:error} ->
        json(conn, %{error: "Failed to check todo", details: "Todo #{conn.params["id"]} not found"})
    end
  end

  delete "/:id" do
    with {:ok, todo_item} <- Todo.Items.delete(conn.params["id"]) do
      json(conn, Map.put(todo_item, :message, "Todo deleted!"))
    else
      {:error} ->
        json(conn, %{error: "Failed to delete todo", details: "Todo #{conn.params["id"]} not found"})
    end
  end

  match _ do
    send_file(conn, 404, "priv/dist/404.html")
  end
end

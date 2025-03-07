defmodule Todo.Items do
  alias Todo.Repo
  alias Todo.Item

  def create_item(attrs) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  def get_all() do
    Repo.all(Item)
  end

  def check_todo(id) do
    case Repo.get(Item, id) do
      nil ->
        {:error}

      todo_item ->
        todo_item
        |> Item.changeset(%{completed: true})
        |> Repo.update()
    end
  end

  def delete(id) do
    case Repo.get(Item, id) do
      nil ->
        {:error}

      todo_item ->
        Repo.delete(todo_item)
        {:ok, todo_item}
    end
  end
end

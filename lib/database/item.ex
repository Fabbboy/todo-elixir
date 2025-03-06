defmodule Todo.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "item" do
    field :title, :string
    field :completed, :boolean, default: false

    timestamps()
  end

  def changeset(todo_item, attrs) do
    todo_item
    |> cast(attrs, [:title, :completed])
    |> validate_required([:title])
  end
end

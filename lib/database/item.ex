defmodule Todo.Item do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :title, :completed, :inserted_at, :updated_at]}
  schema "todos" do
    field :title, :string
    field :completed, :boolean, default: false

    timestamps()
  end

  def changeset(todo_item, attrs) do
    todo_item
    |> cast(attrs, [:title, :completed])
    |> validate_required([:title])
    |> validate_length(:title, min: 1, max: 255)
  end
end

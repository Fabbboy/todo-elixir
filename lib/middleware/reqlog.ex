defmodule Todo.LoggingPlug do
  require Logger

  def init(opts), do: opts

  def call(conn, _opts) do
    ip = get_ip(conn)
    method = conn.method
    uri = conn.request_path

    Logger.info("[REQUEST] #{ip} - #{method} #{uri}")

    conn
  end

  defp get_ip(conn) do
    case conn.remote_ip do
      {_, _, _, _} = ip_tuple ->
        ip_tuple |> Tuple.to_list() |> Enum.join(".")

      {_, _, _, _, _, _, _, _} = ip_tuple ->
        ip_tuple |> :inet.ntoa() |> to_string()

      other ->
        inspect(other)
    end
  end
end

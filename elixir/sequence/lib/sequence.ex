defmodule Sequence do
  @server Sequence.Server
  import GenServer, only: [ call: 2, cast: 2, start_link: 3 ]

  def start_link(sequence_list) do
    start_link(@server, sequence_list, name: @server)
  end

  def get(), do: call(@server, :get)

  def pop(), do: call(@server, :pop)
  def push(item), do: cast(@server, { :push, item })
  def clear(), do: cast(@server, :clear)
end

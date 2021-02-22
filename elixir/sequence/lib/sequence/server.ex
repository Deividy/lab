defmodule Sequence.Server do
  use GenServer
  import GenServer, only: [ call: 2, cast: 2, start_link: 3 ]

  def start_link(sequence_list) do
    start_link(__MODULE__, sequence_list, name: __MODULE__)
  end

  def get(), do: call(__MODULE__, :get)

  def pop(), do: call(__MODULE__, :pop)
  def push(item), do: cast(__MODULE__, { :push, item })
  def clear(), do: cast(__MODULE__, :clear)

  def init(sequence_list) do
    { :ok, sequence_list }
  end

  def handle_cast(:clear, _sequence_list), do: { :noreply, [] }
  def handle_cast({ :push, item }, sequence_list) do
    { :noreply, [ item | sequence_list ] }
  end

  def handle_call(:get, _pid_from, list), do: { :reply, list, list }
  def handle_call(:pop, _pid_from, []), do: { :reply, nil, [] }
  def handle_call(:pop, _pid_from, [ head | tail ]) do
    { :reply, head, tail }
  end
end

#{ :ok, pid } = GenServer.start_link(
# Sequence.Server, [ 5, "cat", 9 ],
# [ debug: [ :trace , :statistics] ]
# )
#
#
# :sys.statistics(pid, :get)
# :sys.get_status(pid)

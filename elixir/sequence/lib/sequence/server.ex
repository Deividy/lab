defmodule Sequence.Stash do
  use GenServer
  import GenServer, only: [ call: 2, cast: 2, start_link: 3 ]

  def init(_) do
    { :ok, [] }
  end

  def start_link(_) do
    start_link(__MODULE__, nil, name: __MODULE__)
  end

  def get(), do: call(__MODULE__, :get)
  def update(item), do: cast(__MODULE__, { :update, item })

  def handle_call(:get, _pid_from, list), do: { :reply, list, list }
  def handle_cast({ :update, list }, _sequence_list) do
    { :noreply, list }
  end
end

defmodule Sequence.Server do
  use GenServer
  import GenServer, only: [ call: 2, cast: 2, start_link: 3 ]

  def start_link(_) do
    start_link(__MODULE__, nil, name: __MODULE__)
  end

  def get(), do: call(__MODULE__, :get)

  def pop(), do: call(__MODULE__, :pop)
  def push(item), do: cast(__MODULE__, { :push, item })
  def clear(), do: cast(__MODULE__, :clear)

  def crash_cast(), do: cast(__MODULE__, :crash_cast)
  def crash_call(), do: cast(__MODULE__, :crash_call)

  def init(_) do
    { :ok, Sequence.Stash.get() }
  end

  def handle_cast(:crash_cast, sequence_list), do: { :noreply, [ 1 * "" ] ++ sequence_list }
  def handle_call(:crash_call, sequence_list), do: { :reply, [ 1 * "" ] ++ sequence_list }
  def handle_cast(:clear, _sequence_list), do: { :noreply, [] }
  def handle_cast({ :push, item }, sequence_list) do
    { :noreply, [ item | sequence_list ] }
  end

  def handle_call(:get, _pid_from, list), do: { :reply, list, list }
  def handle_call(:pop, _pid_from, []), do: { :reply, nil, [] }
  def handle_call(:pop, _pid_from, [ head | tail ]) do
    { :reply, head, tail }
  end

  def terminate(_reason, list) do
    Sequence.Stash.update(list)
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

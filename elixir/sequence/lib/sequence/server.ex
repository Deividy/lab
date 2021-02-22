defmodule Sequence.Server do
  use GenServer

  def init(sequence_list) do
    { :ok, sequence_list }
  end

  def handle_cast(:clear, _sequence_list), do: { :noreply, [] }

  def handle_call({ :push, item }, _pid_from, list) do
    { :reply, :ok, [ item | list ] }
  end

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

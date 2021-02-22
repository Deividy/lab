defmodule Sequence.Server do
  use GenServer
  alias Sequence.Impl

  def init(sequence_list) do
    { :ok, sequence_list }
  end

  def handle_cast(:clear, _sequence_list), do: { :noreply, [] }
  def handle_cast({ :push, item }, sequence_list) do
    { :noreply, Impl.push(item, sequence_list) }
  end

  def handle_call(:get, _pid_from, list), do: { :reply, list, list }
  def handle_call(:pop, _pid_from, []), do: { :reply, nil, [] }
  def handle_call(:pop, _pid_from, list = [ head ]) do
    { :reply, head, Impl.pop(list) }
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

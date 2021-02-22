defmodule Sequence.Impl do
  def push(item, list), do: [ item | list ]
  def pop([ _head | tail ]), do: tail
end

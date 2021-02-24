defmodule Duper.ResultsTest do
  use ExUnit.Case
  alias Duper.Results

  test("can add entries to the results") do
    Results.add_hash_for("evil", 666)
    Results.add_hash_for("good", 420)
    Results.add_hash_for("bad", 111)

    Results.add_hash_for("good", 111)
    Results.add_hash_for("god", 666)

    duplicates = Results.find_duplicates()

    assert(length(duplicates) === 2)
    assert(~w{good bad} in duplicates)
    assert(~w{god evil} in duplicates)
  end
end

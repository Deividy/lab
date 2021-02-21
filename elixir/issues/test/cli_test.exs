defmodule CliTest do
  use ExUnit.Case
  doctest Issues

  import Issues.CLI, only: [ parse_args: 1, sort_into_descending_order: 1 ]

  test("help returned by option parsing with -h and --help") do
    assert(parse_args([ "-h", "anything, really" ]) == :help)
    assert(parse_args([ "--help" ]) == :help)
  end

  test("test parse_args user project default") do
    assert(parse_args([ "deividy", "test" ]) == { "deividy", "test", 4 })
    assert(parse_args([ "OK", "ok" ]) == { "OK", "ok", 4 })
  end

  test("test parse_args user project") do
    assert(parse_args([ "deividy", "issues", "420" ]) == { "deividy", "issues", 420 })
  end

  test("sort descending orders to correct way") do
    result = sort_into_descending_order(fake_created_at_list([ "c", "a", "b" ]))
    issues = for issue <- result, do: Map.get(issue, "created_at")
    assert issues == ~w{ c b a }

    result = sort_into_descending_order(fake_created_at_list([ "c", "z", "G", "a", "b" ]))
    issues = for issue <- result, do: Map.get(issue, "created_at")
    assert issues == ~w{ z c b a G }
  end

  defp fake_created_at_list(values) do
    for value <- values, do: %{ "created_at" => value, "other" => "x" }
  end
end

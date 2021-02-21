defmodule Issues.CLI do
  @default_count 4

  @moduledoc """
  handle the command line parsing and the dispatch to the various functions
  that end up generating a table of the last _n_ issues in a github project
  """

  def main(argv) do
    argv
      |> parse_args
      |> process
  end

  def process(:help) do
    IO.puts("""
    usage:  issues <user> <project> [ count | #{@default_count} ]
    """)
    System.halt(0)
  end

  def process({ user, project, count }) do
    Issues.GithubIssues.fetch(user, project)
    |> decode_response()
    |> sort_into_descending_order()
    |> last(count)
    |> IO.puts()
  end

  def last(list, count) do
    list
    |> Enum.take(count)
    |> Enum.reverse
  end

  def decode_response({ :ok, body }), do: body
  def decode_response({ :error, error }) do
    IO.puts("Error fetching from github: #{error["message"]}")
    System.halt(2)
  end

  def sort_into_descending_order(list_of_issues) do
    list_of_issues
    |> Enum.sort(fn (issue1, issue2) ->
      issue1["created_at"] >= issue2["created_at"]
    end)
  end;

  @doc """
  `argv` can be -h or --help, whic retrurns :help

  otherwise it is a github username, project name, and (optionally) the number
  of entries to format

  Return tuple of `{ user, project, count }`, or `:help` if help was given.
  """

  def parse_args(argv) do
    OptionParser.parse(argv, switches: [ help: :boolean ], aliases: [ h: :help ])
      |> elem(1)
      |> args_to_internal_representation
  end

  def args_to_internal_representation([ user, project, count ]) do
   { user, project, String.to_integer(count) }
  end

  def args_to_internal_representation([ user, project ]) do
    { user, project, @default_count }
  end

  def args_to_internal_representation(_) do
    :help
  end
end

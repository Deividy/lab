defmodule SpeedyCli.S3 do

end

defmodule SpeedyCli.CLI do
  def main(argv), do: argv |> parse_args() |> process()

  @moduledoc """
  speedy cli is a fun cli to test some things that has no documentation :)
  """

  def parse_args(argv) do
    OptionParser.parse(argv, switches: [
      help: :boolean,
      download: :boolean,
      delete_remote: :boolean
    ], aliases: [
      h: :help,
      d: :download
    ])
    |> args_to_internal_representation()
  end

  defp args_to_internal_representation({
    [ download: true ],
    [ bucket, prefix, cache ],
    _
  }) do
    [ :download, bucket, prefix, cache ]
  end

  defp args_to_internal_representation({
    [ delete_remote: true ],
    [ bucket, prefix, cache ],
    _
  }) do
    [ :delete_remote, bucket, prefix, cache ]
  end

  defp args_to_internal_representation({ _, _, _ }), do: :help

  def process([ :download, bucket, prefix, cache ]) do
    SpeedyCli.S3.download_emails(bucket, prefix, cache)
  end

  def process([ :delete_remote, bucket, prefix, cache ]) do
    SpeedyCli.S3.delete_remote(bucket, prefix, cache)
  end

  def process(:help) do
    IO.puts("""
    usage:
      ./speedycli --download <bucket> <prefix> <cache_path>
      ./speedycli --delete_remote <bucket> <prefix> <cache_path>
    """)
  end

end

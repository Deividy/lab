defmodule Speedycli.MixProject do
  use Mix.Project

  def project do
    [
      app: :speedycli,
      escript: escript_config(),
      version: "0.1.0",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [ ]
  end

  defp escript_config do
    [
      main_module: SpeedyCli.CLI
    ]
  end
end

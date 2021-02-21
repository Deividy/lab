defmodule S3.MixProject do
  use Mix.Project

  def project do
    [
      app: :s3,
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
    [
      { :ex_aws, "~> 2.0" },
      { :ex_aws_s3, "~> 2.0" },
      { :poison, "~> 3.0" },
      { :hackney, "~> 1.9" },
      { :sweet_xml, "~> 0.6" },
      { :email_checker, "~> 0.1.4" }
    ]
  end
end

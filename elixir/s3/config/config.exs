use Mix.Config
  config :ex_aws,
    debug_requests: true,
    region: [{ :system, "AWS_REGION" }],
    access_key_id: [{ :system, "AWS_ACCESS_KEY_ID" }],
    secret_access_key: [{ :system, "AWS_SECRET_ACCESS_KEY" }],
    json_codec: Poison

  config :email_checker,
    default_dns: :system,
    validations: [
      EmailChecker.Check.Format,
      EmailChecker.Check.MX
    ],
    smtp_retries: 2,
    timeout_miliseconds: 5000 # 5sec


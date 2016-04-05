defmodule PhxOembed.TestUtils do

  def get_user_token(user) do
    {:ok, jwt, _} = user |> Guardian.encode_and_sign(:token)
    jwt
  end
end

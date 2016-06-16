defmodule PhxOembed.VerifyAuthorizedTest do
  use PhxOembed.ConnCase
  alias PhxOembed.Plugs.VerifyAuthorized

  setup %{conn: conn} do
    {:ok, conn: conn}
  end

  test "should raise if authorization was not performed", %{conn: conn} do
    catch_error VerifyAuthorized.call(conn, %{})
  end
end

defmodule PhxOembed.PageControllerTest do
  use PhxOembed.ConnCase

  setup do
    {:ok, conn: Phoenix.ConnTest.conn()}
  end

  test "renders the front end container" do
    assert html_response(conn, 200) =~ "PhxOembed"
  end
end

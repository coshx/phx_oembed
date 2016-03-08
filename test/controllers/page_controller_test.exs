defmodule PhxOembed.PageControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.Endpoint

  test "GET /", %{conn: conn} do
    conn = get conn, page_path(Endpoint, :index)
    assert html_response(conn, 200) =~ "PhxOembed"
  end
end


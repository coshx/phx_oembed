defmodule PhxOembed.PageControllerTest do
  use PhxOembed.ConnCase
  alias PhxOembed.Endpoint

  test "renders the front end container" do
    conn = get conn, page_path(Endpoint, :index)
    assert html_response(conn, 200) =~ "PhoEmbed"
  end
end

defmodule PhxOembed.ErrorViewTest do
  use PhxOembed.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.json" do
    assert render_to_string(PhxOembed.ErrorView, "404.json", []) ==
           "null"
  end
end

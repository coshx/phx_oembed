defmodule PhxOembed.SiteView do
  use PhxOembed.Web, :view

  def render("show.json", %{site: site}) do
    %{
      domain: site.domain,
      protocol: site.protocol
    }
  end
end

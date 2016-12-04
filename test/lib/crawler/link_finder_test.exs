# Unit test for the link finder component of the crawler library

defmodule PhxOembed.Crawler.LinkFinderTest do
  use ExUnit.Case
  alias PhxOembed.Crawler.LinkFinder

  test "should return a List of local links" do
    site = insert(:site)
    test_domain = site.domain
    test_html = ~s"""
<!DOCTYPE html>
<html>
<head><title>Test</title</head>
<body>
</body>
</html>
    """
  end
end

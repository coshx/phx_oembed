import expect                   from "expect";
import Pages                    from "../../web/static/js/pages";

describe("Pages", () => {

  it("should return the proper sign in page", () => {
    expect("/sign_in").toEqual(Pages.signIn());
  })

  it("should return the proper sites page", () => {
    expect("/sites").toEqual(Pages.sites());
  })

  it("should return the proper site page", () => {
    const siteId = 4;
    expect("/sites/4").toEqual(Pages.site(siteId));
  })
})

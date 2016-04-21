import expect                   from "expect";
import Pages                    from "../../web/static/js/pages";

describe("Pages", () => {

  it("should return the proper sign in page", () => {
    expect("/sign_in").toEqual(Pages.signIn());
  })

  it("should return the proper sites in page", () => {
    expect("/sites").toEqual(Pages.sites());
  })
})

import expect                   from "expect";
import Routes                   from "../../web/static/js/routes";

describe("Routes", () => {

  it("should return the proper session route", () => {
    expect(Routes.session()).toEqual("/api/v1/sessions");
  })

  it("should return the proper currentUser route", () => {
    expect(Routes.currentUser()).toEqual("/api/v1/current_user");
  })

  it("should return the proper sites route", () => {
    expect(Routes.sites()).toEqual("/api/v1/sites");
  })

  it("should return the proper cards route", () => {
    const siteId = 4;
    expect(Routes.cards(siteId)).toEqual("/api/v1/sites/" + siteId + "/cards");
  })

})

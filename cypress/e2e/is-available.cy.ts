import "@4tw/cypress-drag-drop";

describe("service is available", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should get h1", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("check card with ingredient", () => {
    cy.get("[class^=Card_item__]").first().as("card");
    cy.get("@card").click();
    cy.get("[class^=Modal_container__]").as("modal");
    cy.get("@modal").find("h2").contains("Детали ингредиента");
    cy.get("@modal").find("svg").click();
  });

  it("check button inactivity and list is empty", () => {
    cy.get("button").contains("Оформить заказ").should("have.disabled");

    cy.get("[class^=BurgerConstructor_ingredients__]").contains(
      "Пожалуйста, перенесите сюда булочку для создания заказа"
    );
    cy.get("[class^=BurgerConstructor_ingredients__]").contains("Пожалуйста, добавьте ингредиенты");
  });

  it("check delete ingredient", () => {
    cy.get("[class^=Card_item__]").as("card");
    cy.get("#bunContainer").as("container");
    cy.get("#list").as("list");

    cy.get("@card").eq(0).drag("@container");
    cy.get("@card").eq(5).drag("@list");
    cy.get("@list").find("[class^='constructor-element__action']").click();
  });

  it("check drag and drop and login", () => {
    cy.get("[class^=Card_item__]").as("card");
    cy.get("#bunContainer").as("container");
    cy.get("#list").as("list");

    cy.get("@card").eq(0).drag("@container");
    cy.get("@card").eq(5).drag("@list");
    cy.get("@card").eq(6).drag("@list");
    cy.get("@card").eq(11).drag("@list");

    cy.get("button").contains("Оформить заказ").click();

    cy.get("form").find("h1").contains("Вход");
    cy.get("form").find("button").contains("Войти").as("loginButton");
    //eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[type="email"]')
      .type("zakharovamaria73@yandex.ru")
      .should("have.value", "zakharovamaria73@yandex.ru");
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[type="password"]').type("123456").should("have.value", "123456");
    cy.get("@loginButton").click();

    cy.get("button").contains("Оформить заказ").click();

    cy.get("[class^=Modal_content__]").as("modal");
    cy.get("@modal").find("p").contains("Ваш заказ начали готовить");
    cy.get("@modal").find("svg").click();
  });
});

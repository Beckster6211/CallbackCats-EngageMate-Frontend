function speakerLiveQuizSession(question, option1, option2, option3, option4) {
  describe("Speaker Live Quiz test", () => {
    describe("Speaker setting a question, answer options, select correct answer and submit", () => {
      it("Get question drop down, select custom question and input question?", () => {
        cy.get("form.skPoll_select__33B4f")
          .get("select.chakra-select,css-18wj7tk")
          .get("option")
          .eq(0)
          .contains("Select a question");
        cy.get("select.chakra-select,css-18wj7tk")
          .select("Set a custom question")
          .should("have.value", "custom");
        cy.get("input.chakra-input,css-1j4w011").type(question);
      });

      it("Create input field for option 1 and type answer option 1 into it", () => {
        cy.get("form.skPoll_select__33B4f")
          .find("div.chakra-stack,css-d9swal")
          .find("button.chakra-button,css-pazafr")
          .eq(0)
          .click();
        cy.get("input#1").type(option1);
      });

      it("Create input field for option 2 and type answer option 2 into it", () => {
        cy.get("form.skPoll_select__33B4f")
          .find("div.chakra-stack,css-d9swal")
          .find("button.chakra-button,css-pazafr")
          .eq(0)
          .click();
        cy.get("input#2").type(option2);
      });

      it("Create input field for option 3 and type answer option 3 into it", () => {
        cy.get("form.skPoll_select__33B4f")
          .find("div.chakra-stack,css-d9swal")
          .find("button.chakra-button,css-pazafr")
          .eq(0)
          .click();
        cy.get("input#3").type(option3);
      });

      it("Create input field for option 4 and type answer option 4 into it", () => {
        cy.get("form.skPoll_select__33B4f")
          .find("div.chakra-stack,css-d9swal")
          .find("button.chakra-button,css-pazafr")
          .eq(0)
          .click();
        cy.get("input#4").type(option4);
      });

      it("Remove last answer option", () => {
        cy.get("form.skPoll_select__33B4f")
          .find("div.chakra-stack,css-d9swal")
          .find("button.chakra-button,css-102nuie")
          .eq(0)
          .click();
      });

      it("Select the correct answer", () => {
        cy.get("input#choice1").click();
      });

      it("Submit the quiz to participant", () => {
        cy.get("button.chakra-button,css-102nuie").contains("Submit").click();
      });
    });
  });
}

export default speakerLiveQuizSession;

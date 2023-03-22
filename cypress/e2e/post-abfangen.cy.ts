it("should not post", () => {
  // zuerst bereiten wir unseren Intercept vor
  cy.intercept(
    {
      method: "POST",
      url: "https://demo.wpeverest.com/user-registration/wp-admin/admin-ajax.php",
    },
    (request) => {
      // wir fangen den request ab
      /* 
            Auf der Beispielseite die ich rausgesucht habe wird form/multipart verwendet. 
            Dadurch ist der post body wie ein query string aufgebaut. Das hängt von dern Anwendung ab welches format der body aufweist
            Für dieses Beispiel parse ich den query string mit URLSearchParams, parse dann das enthaltene JSON aus dem form_data bereich
            und vereinfache dann das resultat auf die daten die ich expecten möchte
        */
      const queryStringObject = new URLSearchParams(request.body);
      const formDataJson = JSON.parse(queryStringObject.get("form_data"));
      const formKeyValue = formDataJson.map((field) => ({
        name: field.field_name,
        value: field.value,
      }));

      // hier nutze ich eine chai funktion um sicherzustellen das bestimmte objekte in den geposteten daten sind
      // quelle: https://www.chaijs.com/api/bdd/
      expect(formKeyValue).to.deep.include.members([
        {
          name: "user_email",
          value: "testuser@example.com",
        },
        {
          name: "user_pass",
          value: "secret",
        },
        {
          name: "user_login",
          value: "testuser",
        },
      ]);
      // hier könnte man den request auch weiter an den server gehen lassen request.continue()
      // wir wollen aber lieber eine fake success antwort geben
      request.reply({
        body: {
          success: true,
          data: {
            username: "testuser12341241241234134",
            success_message_positon: "1",
            form_login_option: "default",
          },
        },
      });
    }
  );

  cy.visit(
    "https://demo.wpeverest.com/user-registration/social-registration-form/"
  );
  cy.get("#user_email").type("testuser@example.com");
  cy.get("#user_pass").type("secret");
  cy.get("#user_login").type("testuser");
  cy.contains("Submit").click();

  // Wir testen nun noch ob ein erfolgreiches speichern auch korrekt auf der webseite ausgegeben wird.
  cy.get("#ur-submit-message-node").should(
    "contain.text",
    "User successfully registered"
  );
});

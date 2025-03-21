// @ts-check
import { test, expect } from "@playwright/test";
import { request } from "http";

var tokenRecebido;

test("Consultando Reservas Cadastradas", async ({ request }) => {
  const response = await request.get("/booking");
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test("Consultando Reservas Cadastradas com base em um ID", async ({
  request,
}) => {
  //Chamaando a API
  const response = await request.get("/booking/1819");

  //Transformando a resposta da API em json
  const responseBody = await response.json();
  console.log(responseBody);

  // Verificando se os dados da reserva estão corretos
  expect(responseBody.firstname).toBe("Gabriel");
  expect(responseBody.lastname).toBe("Lima");
  expect(responseBody.totalprice).toBe(111);
  expect(responseBody.depositpaid).toBeTruthy();
  expect(responseBody.bookingdates.checkin).toBe("2018-01-01");
  expect(responseBody.bookingdates.checkout).toBe("2019-01-01");
  expect(responseBody.additionalneeds).toBe("Breakfast");

  //Verificando se a resposta da API está Ok
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test("Validando campos exibidos", async ({ request }) => {
  //Chamaando a API
  const response = await request.get("/booking/1819");

  //Transformando a resposta da API em json
  const responseBody = await response.json();
  console.log(responseBody);

  // Verificando se os dados da reserva estão corretos
  expect(responseBody).toHaveProperty("firstname");
  expect(responseBody).toHaveProperty("lastname");
  expect(responseBody).toHaveProperty("totalprice");
  expect(responseBody).toHaveProperty("depositpaid");
  expect(responseBody).toHaveProperty("bookingdates");
  expect(responseBody).toHaveProperty("additionalneeds");

  //Verificando se a resposta da API está Ok
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test("Criando uma reserva", async ({ request }) => {
  const reserva = await request.post("/booking", {
    data: {
      firstname: "Gabriel",
      lastname: "Lima",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  });

  //Transformando a resposta da API em Json
  console.log(await reserva.json());

  //Verificando Status da API
  expect(reserva.ok()).toBeTruthy();
  expect(reserva.status()).toBe(200);

  // Validando dados de retorno
  const responseBody = await reserva.json();
  expect(responseBody.booking).toHaveProperty("firstname", "Gabriel");
  expect(responseBody.booking).toHaveProperty("lastname", "Lima");
  expect(responseBody.booking).toHaveProperty("totalprice", 111);
  expect(responseBody.booking).toHaveProperty("depositpaid", true);
});

test("Gerando token", async ({ request }) => {
  const responseToken = await request.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
  });

  console.log(await responseToken.json());
  //Transformando a resposta da API em Json
  const tokenGerado = await responseToken.json();

  //Verificando Status da API
  expect(responseToken.ok()).toBeTruthy();
  expect(responseToken.status()).toBe(200);

  //Validando dados do retorno
  expect(tokenGerado).toHaveProperty("token");
  console.log("O seu token é: ", tokenGerado);
});

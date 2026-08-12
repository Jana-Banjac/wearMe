# wearMe

MERN aplikacija za online prodavnicu odeće. Sadrži katalog proizvoda, korpu,
registraciju i prijavu korisnika, poručivanje, PayPal plaćanje i administratorski
panel za proizvode i porudžbine.

## Preduslovi

- Node.js 20 ili noviji
- MongoDB Atlas nalog ili lokalna MongoDB instanca

## Konfiguracija

U fajlu `backend/.env` postavi sledeće vrednosti. Fajl je ignorisan u Gitu i ne
treba ga deliti niti slati u repozitorijum.

```env
NODE_ENV=development
PORT=5000
DATABASE_URI=mongodb+srv://...
JWT_SECRET=duga-nasumicna-tajna
PAYPAL_CLIENT_ID=paypal-client-id
```

Port `5000` je namerno isti kao `proxy` vrednost u `frontend/package.json`, pa
frontend razvojni server prosleđuje API zahteve backendu.

## Pokretanje

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
npm run dev
```

Aplikacija je zatim dostupna na `http://localhost:3000`, a API na
`http://localhost:5000`.

## Osnovna provera

1. Otvori početnu stranu i proveri učitavanje proizvoda.
2. Registruj korisnika, prijavi se i dodaj proizvod u korpu.
3. Završi adresu dostave, izbor plaćanja i kreiranje porudžbine.
4. Kao administrator proveri dodavanje, izmenu i brisanje proizvoda, kao i listu porudžbina.

## Produkcioni build

```bash
npm run build --prefix frontend
```

Pre objave obavezno proveri ceo tok kupovine sa test PayPal nalogom i koristi
produkcione vrednosti za bazu, JWT tajnu i PayPal Client ID.

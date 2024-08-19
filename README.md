# Webbservice

Detta är en webbservice för moment fyra i kursen Backend-baserad webbutveckling.

APIet är inte publicerat på internet utan är enbart tillgängligt i detta repository.

## Installation
För att köra detta API lokalt krävs en MongoDB-databas, under utveckling har MongoDB Compass använts.
Utöver det kan man klona ner detta repo och köra "npm install" för att installera nödvändinga npm-paket.

## Routes och models
Webbservicen använder routes och models i separata filer. Det finns i huvudsak två datasamlingar, "Users" och "Data".

### Schema
#### Users

|Fält       |Typ      |Teckenkrav |Required          |
|-----------|---------|-----------|------------------|
|_id        |ObjectID | -         |X                 |
|username   |string   | 4-25      |X                 |
|password   |string   | 10-100    |X                 |
|created    |date     | -         |Default: Date.now |

Fältet _id skapas automatiskt i MongoDB. Fältet created skapas med ett defaultvärde av "nu".

#### Data

|Fält           |Typ      |Teckenkrav |Required   |
|---------------|---------|-----------|-----------|
|_id            |ObjectID | -         |X          |
|name           |string   | 5-15      |X          |
|letter         |string   | 1-2       |X          |
|city           |string   | 4-9       |X          |
|municipalities |number   | 1-49      |X          |

Fältet _id skapas automatiskt i MongoDB.

## Köra server
För att köra servern används sedan kommandot "node server.js". Man kan också använda nodemon för att köra server, detta görs genom kommandot "npm run dev".

### Metoder
|Metod  |URI            |Beskrivning              |
|-------|---------------|-------------------------|
|POST   |/api/register  | Skapa konto.            |
|POST   |/api/login     | Logga in.               |
|GET    |/api/protected | Visa data som inloggad. |

Vid anrop till /api/protected måste Bearer token skickas med, token erhålls vid lyckad inloggning och är giltig i en timme. Token sparas lämpligen i LocalStorage eller liknande. 

Information skickas i JSon-format.

# Iceberg Lighthouse

lighthouse metrics gatherer, inspired by garie-lighthouse

[![Build Status](https://img.shields.io/travis/mouafa/iceberg-lighthouse/master.svg) ](https://travis-ci.org/mouafa/iceberg-lighthouse)[ ![](https://codecov.io/gh/mouafa/iceberg-lighthouse/branch/master/graph/badge.svg) ](https://codecov.io/gh/mouafa/iceberg-lighthouse) [![garie](https://img.shields.io/badge/support-garie-blue.svg)](https://github.com/boyney123/garie) [![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Similarity with `garie-lightouse`**

- Audit any website and stores the metrics into InfluxDB
- Write lighthouse reports to the disk
- Minimal setup effort
- Webhook support

**Difference from `garie-lightouse`**

- **Accept custom Lighthouse config**
- **Queue based auditing**
- **More stable**
- **Lightweight docker image (alpine based)**
  > ![images](./assets/images.png 'Reports')
  > in red is `garie-lighthouse` docker image  
  > in green is `iceberg-lightouse` docker image, 2.6x lighter

## Overview

Iceberg Lighthouse is similar in many way to [garie-lighthouse](https://github.com/boyney123/garie-lighthouse), both generates and stores lighthouse data into `InfluxDB`.

## Usage

check `docker-compose.yml` to see a usage example

## Config file

| Property              | Type      | Description                                                                                                                                                    |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cron`                | `string`  | Cron pattern supoorted by the [cron module](https://www.npmjs.com/package/cron). if the cron is not set, iceberg lighthouse will run just once on all the urls |
| `urls`                | `array`   | array of url to audit                                                                                                                                          |
| `urls.url`            | `string`  | url to audit                                                                                                                                                   |
| `urls.plugins`        | `array`   | array of plugins to apply                                                                                                                                      |
| `urls.plugins.name`   | `string`  | set it to `lighthouse` to apply the plugin setting                                                                                                             |
| `urls.plugins.report` | `boolean` | set it to true to save lighthouse report to disk                                                                                                               |
| `urls.plugins.config` | `object`  | [lighthouse custom config](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md)                                                       |

**example**

```json
{
  "cron": "00 00 */6 * * *",
  "urls": [
    {
      "url": "https://www.google.com",
      "plugins": [
        {
          "name": "lighthouse",
          "report": true
        }
      ]
    },
    {
      "url": "https://www.example.com",
      "plugins": [
        {
          "name": "lighthouse",
          "report": true,
          "config": {
            "settings": {
              "emulatedFormFactor": "desktop"
            }
          }
        }
      ]
    }
  ]
}
```

## Server

visit the server root to see all the stored report:
![reports](./assets/reports.png 'Reports')
![example.com](./assets/example.com.png 'Reports')

## Webhook

To trigger the webhooks. You will need to `POST` or `GET` request to `/collect`.

**Payload**

| Property | Type                 | Description                                            |
| -------- | -------------------- | ------------------------------------------------------ |
| `url`    | `string` (required)  | Url to get metrics for.                                |
| `report` | `boolean` (optional) | When set to true a lighthouse report will be generated |

**POST Example**

payload:

```json
{
  "url": "https://www.example.com",
  "report": true
}
```

curl:

```bash
curl -X POST \
  http://localhost:3000/collect \
  -H 'Content-Type: application/json' \
  -d '{
"url": "https://www.example.com",
"report":true
}'
```

**GET Example**

```bash
curl -X GET 'http://localhost:3000/collect?url=https://www.example.com&report=true'
```

## Data collected

Lighthouse comes with loads of audits out the box. You can view all metrics in the reports.

Garie-lighthouse filters what data is stored into influxDB and returned in the webhook.

| Property                | Type     | Description                             |
| ----------------------- | -------- | --------------------------------------- |
| `performance-score`     | `number` | Overall performance score.              |
| `pwa-score`             | `number` | Overall progressive web app score.      |
| `accessibility-score`   | `number` | Overall accessibility score.            |
| `best-practices-score`  | `number` | Overall best practices score.           |
| `seo-score`             | `number` | Overall seo score.                      |
| `time-to-first-byte`    | `number` | Number of ms to first byte.             |
| `firstContentfulPaint`  | `number` | Number of ms to first contentful paint. |
| `firstMeaningfulPaint`  | `number` | Number of ms to first meaningful paint. |
| `interactive`           | `number` | Number of ms to interactive.            |
| `firstCPUIdle`          | `number` | Number of ms to CPU idle.               |
| `speedIndex`            | `number` | Google speed index.                     |
| `estimatedInputLatency` | `number` | Input Latency.                          |
| `errors-in-console`     | `number` | Number of errors in the console.        |
| `redirects`             | `number` | Number of redirects.                    |

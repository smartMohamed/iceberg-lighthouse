# Iceberg Lighthouse

<p align="center">
  <p align="center">lighthouse metrics gatherer, inspired by garie-lighthouse<p>
  <p align="center"><a href="https://travis-ci.org/mouafa/iceberg-lighthouse"><img src="https://img.shields.io/travis/mouafa/iceberg-lighthouse/master.svg" alt="Build Status">
	<a href="https://codecov.io/gh/mouafa/iceberg-lighthouse">
  <img  src="https://codecov.io/gh/mouafa/iceberg-lighthouse/branch/master/graph/badge.svg" />
	</a>
	<a href="https://github.com/boyney123/garie"><img src="https://img.shields.io/badge/support-garie-blue.svg" alt="garie"></a>  
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT"></a>
  </p>
</p>

**Similarity with `garie-lightouse`**

- Audit any website and stores the metrics into InfluxDB
- Write lighthouse reports to the disk
- Minimal setup effort
- ~~Webhook support~~ (not yet)

**Difference from `garie-lightouse`**

- **Lightweight docker image**
- **Accept custom Lighthouse config**
- **More stable**

## Overview of iceberg-lighthouse

Iceberg Lighthouse is similar in many way to [garie-lighthouse](https://github.com/boyney123/garie-lighthouse), both generates and stores lighthouse data into `InfluxDB`.

Iceberg Lighthouse can also be run as standalone tool. more information bellow.

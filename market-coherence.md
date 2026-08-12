---
layout: page
title: Market Coherence for prediction-market products
permalink: /market-coherence/
---

# Market Coherence for prediction-market products

Prediction-market products can remain numerically plausible while becoming internally incoherent. A constituent market can close without leaving an index, a displayed weight can breach the product's stated cap, or a gauge can reconcile even though some legs use mock or inconsistent scoring rules. These failures are difficult to see in a polished aggregate number.

Market Coherence turns the mechanical parts of those claims into executable checks. The current dependency-free command-line tool reads a live index payload, retrieves the corresponding records from Polymarket's official Gamma API, and fails when required source data is missing. It checks:

- constituent counts, probabilities, signs, weights, contributions, and aggregate arithmetic;
- concentration caps against final displayed weights;
- local expiry dates and Polymarket's official closed or expired status;
- leg-level scoring provenance that differs from the index's declared rubric.

The tests use a field-preserving subset of a real response, not generated or approximated data.

## What the first audit found

On 6 August 2026, the checker reproduced the displayed gauge for Net Long's Germany Stability & Prosperity index but found several product-level failures. Two constituents had final weights of 48.91% and 26.52% against a stated 25% cap. One closed, expired Polymarket remained in the live response. Four legs used scoring provenance different from the theme-level rubric, including two explicitly labelled `mock`.

Arithmetic consistency was therefore necessary but insufficient. A reproducible signal also needs versioned composition, lifecycle checks, and explicit provenance.

## Product direction

The next version would expose the checks as a hosted read-only dashboard and API. Each snapshot would preserve the exact contracts, signs, weights, rules, and source timestamps behind a historical value. It would attribute changes to repricing, composition changes, expiry, and rule changes; alert on invariant failures; and add Polymarket-native checks for mutually exclusive outcomes, nested deadlines, duplicate exposure, and resolution dependencies.

This is not an automated judge of whether a market fits a natural-language theme, a market-manipulation detector, or a trading-profit claim. Those require different evidence. The current artifact is working proof of the deterministic layer, not evidence of user traction.

The [Polymarket Builders Program](https://builders.polymarket.com/) explicitly invites new analytics and decision tools, while its [2026 Request for Builders](https://builders.polymarket.com/rfb/explore) offers rolling, no-equity grants. A grant would fund the hosted API, reproducible snapshots, and buyer discovery needed to learn whether risk and quantitative teams actually spend meaningful time repairing these inconsistencies.

## Program boundary and submission gate

The analytics grant path is distinct from the operational [Builder Program](https://docs.polymarket.com/programs/builders/overview), which defines builders as products that route user orders. This read-only tool does not claim builder-code volume, fees, or tier rewards.

Polymarket says it selects grants on product innovation and traction. Market Coherence has no users, so its application is deferred until one risk, quantitative, or product user confirms that a recurring coherence failure consumes analyst time or changes a decision. The current audit is sufficient for that test; a hosted service is not.

Working code and the captured audit are available for review. Contact [me@distbit.xyz](mailto:me@distbit.xyz).

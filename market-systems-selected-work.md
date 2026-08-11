---
layout: page
title: "Market systems: selected work and operating thesis"
permalink: /market-systems-selected-work/
---

# Market systems: selected work and operating thesis

I work at the seam between mechanism design, adversarial analysis, and product implementation. I start from the information or incentive problem, specify the payoff and resolution structure, identify how strategic actors can break the intended signal, and turn the surviving design into a system that can be tested.

## Decision markets under adversarial incentives

[Adversarial Futarchy Proposal Strategies](https://distbit.xyz/malicious-futarchy-proposal-strategies/) identifies five ways a proposer can make the pass branch look better without creating corresponding value: resistance-contingent delivery, conditional-exit extraction, proposal-specific selection, ambiguity that deters corrective trading, and fail-branch sabotage. The proposed contract review and proposal gating replace several market attacks with a trusted governance surface rather than eliminating governance risk.

[Decision selection bias is not robustly detectable from the realized price path](https://distbit.xyz/impossibility-of-robustly-detecting-strategic-dsb/) separates a conditional forecast from a causal estimate. When the market helps choose the action and settles only in the chosen branch, favorable private information can select which histories reach settlement without producing a visible movement in the accepted history. Price-decay and staleness detectors cannot recover the missing counterfactual from that path alone.

[Advisory Markets](https://distbit.xyz/advisory-markets/) develops a lower-authority deployment path: markets estimate the effects of decisions while the decision maker retains control. This lets an organization evaluate forecast quality and operating fit before allowing a market price to execute decisions.

## Building inspectable information systems

[Truesight](https://truesight.ink) turns scattered claims, sources, criticisms, and replies into public issue pages. Its [mechanism description](https://distbit.xyz/truesight-recursive-criticism/) explains the recursive rule: a claim is refuted when an unanswered direct criticism survives, and a criticism stops defeating its target when it is itself refuted. Language models propose the graph; deterministic checks enforce parent validity, reachability, acyclicity, source accounting, and reproducible status derivation.

[Germane](https://germane.page) and [Lineate](https://github.com/distbit0/lineate) form a production reading system. Lineate converts web pages, PDFs, audio, video, and message threads into structured highlights, a strong rebuttal, and either full text or a semantically complete summary. Germane ranks the resulting documents against user-defined topics and supports reading, filtering, and text-to-speech. The system makes attention allocation an explicit product surface rather than leaving summarization as a one-off model response.

## Market-lifecycle ownership thesis

The first useful market-systems project should improve an observed operating outcome before introducing a new instrument. I would map the lifecycle from market selection and specification through launch, monitoring, and resolution; baseline rework, manual intervention, delay, disputes, and market-quality measures; then ship one control against the largest measured failure mode.

A plausible first control is a structured market specification with explicit proposition, source, cutoff, edge cases, fallback, monitoring trigger, and escalation path, plus deterministic linting before listing. The next step is one end-to-end automation or review workflow measured against the baseline. Only after that foundation works would I run a market-structure experiment, with a predeclared hypothesis, primary measure, guardrails, eligible cohort, and stopping rule.

This scope is intended for product ownership with an engineering and operations counterpart. It is not an advisory research role. The test is whether a mechanism insight becomes a measurable change in the reliability, quality, or usefulness of live markets.

## Background and contact

At Butter, I worked on conditional funding markets, advisory markets, market configuration, resolution design, liquidity mechanisms, and adversarial analysis. At Increment Finance and Fringe Finance, I worked on perpetual-market risk, margin and liquidation systems, oracle manipulation, interest-rate control, and collateral-risk tooling.

[Curriculum vitae](https://gist.github.com/b8a1358a60d3713cb5652d9038c5c86c) · [GitHub](https://github.com/distbit0) · [Email](mailto:me@distbit.xyz) · [Schedule a 20-minute call](https://cal.com/distbit/call)

*Selected work, 11 August 2026.*

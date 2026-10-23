---
articleUrl: https://distbit.xyz/zcash-grant-forecast-cutoff/
author: distbit
category: ''
date: 2026-10-23 00:00
description: Zcash's grant-market quotes scored 16.1% better after the announced cutoff.
  A reproducible audit separates pre-poll forecasting from later trading.
draft: true
headerImage: false
hidden: true
layout: post
live: false
published: true
tag: []
title: Zcash grant forecast cutoff
---




Changing the evaluation timestamp can make a prediction market look more accurate without improving its forecast at the intended decision time. Zcash's Q3 2026 grant markets provide a measurable example: **using the October 14 website quotes instead of the announced pre-poll snapshot lowers mean squared error by 16.1%.** The proposals and eventual outcomes are identical in both comparisons.  

The [pilot announcement](https://forum.zcashcommunity.com/t/seer-prediction-markets-forecasting-q3-2026-coinholder-retroactive-grant-approvals/57063) proposed forecasting which grants coinholders would approve. It specified a September 16, 20:00 UTC trading deadline, before the poll, and an evaluation against initial GPT forecasts. This tests prediction of voters' decisions; it does not directly test which grants create the most value.  

## Trading continued beyond the announced deadline  

I reconstructed the 37 markets' prices at Optimism block **156,995,011**, timestamped September 16 at **19:59:59 UTC**. The next block brackets the deadline. The captured contracts record **227 subsequent swaps across 36 markets**, through September 27, with **1,419.96 sUSDS** in collateral turnover. The [first later swap](https://optimistic.etherscan.io/tx/0xe88a5bc7d0e9ca0a2fa41da57348c101c059f8c0569ca9e60c5dc3edceacce1e) occurred on September 17 at 08:30:39 UTC.  

This establishes continued pool trading. It does not establish what information traders possessed or whether the website disabled its trading interface.  

Treating each raw YES quote as a probability gives:  

- **At the announced cutoff:** mean Brier score **0.18737**; mean log loss **0.54978**.  
- **In the October 14 website snapshot:** mean Brier score **0.15718**; mean log loss **0.48181**.  

Brier score averages the squared difference between a forecast and its eventual zero-or-one outcome. Log loss penalizes confident errors more heavily. Lower is better for both. The later quotes score better, but that difference cannot be credited to forecasting before the announced deadline.  

All **37 contract settlements** match the [corrected official result](https://forum.zcashcommunity.com/t/q3-coinholder-directed-retroactive-grants-program-results/57909): **17 approvals and 20 rejections**. Participation before the cutoff comprised 546 swaps in 168 transactions from 11 transaction-origin addresses. Addresses do not establish independent people; turnover does not measure net capital committed.  

## What remains unmeasured  

The original timestamped GPT forecasts were unavailable to this audit. Consequently, it cannot establish how much traders improved on GPT. A generic starting price is not a substitute for that missing benchmark.  

The scores also assume that collateral-denominated YES quotes represent probabilities. Pre-cutoff YES and NO quotes sum to **0.8921–1.0001**, and Invalid has no quoted pool. I have retained the raw quotes without normalization. Contract evidence comes from one public Optimism RPC; outcome verification uses published finalized tallies, not a recount of encrypted ballots.  

Before a subsequent round starts trading, preserve the initial model forecasts and fix the evaluation deadline. At that deadline, archive the final preceding block and its quotes. Report later price updates separately. A reproducible pre-decision snapshot makes the claimed information benefit testable even if trading remains possible afterward.  

[Download the 37-market CSV](/assets/research/zcash-q3-2026-cutoff/markets.csv), or [download the evidence and offline verifier](/assets/research/zcash-q3-2026-cutoff/evidence.zip). The archive's README gives the verification command; it needs only Python's standard library and makes no network calls in verification mode.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [20m call](https://cal.com/distbit/call?duration=20)
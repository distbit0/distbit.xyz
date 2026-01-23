---
articleUrl: https://distbit.xyz/decision-selection-bias-fix?
author: distbit
category: blog
date: 2026-01-23 00:00
description: ''
gist_url: https://gist.github.com/0263d017c78742811c501cd46939429f
headerImage: false
layout: post
live: true
tag: []
title: Decision selection bias fix?
---




This note sketches a contract and settlement design for “unconditional outcome futures” and explains why it addresses decision selection bias in decision markets. It assumes a binary event, an underlying asset with a spot market, and two conditional markets for the asset’s price under each event outcome.  

Decision selection bias occurs when a market both guides the choice and only pays out if that choice is made. That makes the market price track the conditional expectation “impact given this option gets chosen,” not the unconditional expectation “impact of this option.” This is problematic because the decision rule selects options more often in states where their impact is high, so selection is correlated with impact and the conditional expectation is biased upward by an amount that increases with that correlation. The price then reflects both expected impact and a correlation term that is not relevant to comparing options on impact. Unconditional outcome futures remove this by making each option’s contract settle to a value even when it is not chosen, so prices track unconditional impact rather than “impact in the worlds where it gets picked.”  

An “event” is a binary proposition with outcomes YES and NO. `p_yes(t)` is the event market’s YES price at time `t` and is interpreted as the market-implied probability that the event resolves YES. `price_yes(t)` and `price_no(t)` are the market-implied asset prices conditional on YES and NO. The spot price is the asset’s unconditional market price, and `spot_at_resolution` is the spot price sampled at the event’s resolution time.  

`impact(t)` is `price_yes(t) - price_no(t)`. “In-band time” is time during which `p_yes(t)` is within `[5%, 95%]`. `t_end` is the resolution time if `p_yes(t)` never leaves the band before resolution, otherwise it is the last time before resolution that `p_yes(t)` crosses outside the band (`<=5%` or `>=95%`). A TWAP is a time-weighted average of a price series over a window. `impact_TWAP` is a TWAP of `impact(t)` over 24 hours of cumulative in-band time ending at `t_end`, where cumulative in-band time counts only in-band periods. “Settle” means redeem the contract for its final value, “refund” means return collateral without resolving to a price, and “self-resolve” means the non-occurring outcome settles to an imputed value instead of zero.  

Unconditional outcome futures are futures contracts that settle to a price in every world, rather than paying only when their outcome occurs and otherwise being cancelled/refunded. Define `impact(t) = price_yes(t) - price_no(t)` and define `impact_TWAP` as a 24-hour TWAP of `impact(t)` over cumulative time where the event-market probability `p_yes(t)` stays in `[5%, 95%]`, ending at `t_end` (the resolution time if the band is never crossed, otherwise the last pre-resolution band exit at `<=5%` or `>=95%`). Settlement then makes the non-occurring outcome self-resolve: if YES occurs, settle YES to the spot asset price at resolution and settle NO to `spot_at_resolution - impact_TWAP`, while if NO occurs settle NO to spot and settle YES to `spot_at_resolution + impact_TWAP`. If `impact_TWAP` is undefined because there is less than 24 hours of in-band time prior to `t_end`, refund both markets.  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@distbit0)](https://twitter.com/distbit0) or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
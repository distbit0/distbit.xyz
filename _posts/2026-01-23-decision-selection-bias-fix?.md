---
articleUrl: https://distbit.xyz/decision-selection-bias-fix?
author: distbit
category: blog
date: 2026-01-23 00:00
description: ''
headerImage: false
layout: post
tag: []
title: Decision selection bias fix?
---




1) Unconditional outcome futures, also described as unconditional conditionals or unconditional outcome markets, are scalar outcome contracts that settle to a price in every world, rather than paying only when their outcome occurs and going to zero otherwise. In the impact-futures design, define `impact(t) = price_yes(t) - price_no(t)` and define `impact_TWAP` as a 24-hour TWAP of `impact(t)` over cumulative time where the event-market probability `p_yes(t)` stays in `[5%, 95%]`, ending at `t_end` (the resolution time if the band is never crossed, otherwise the last pre-resolution band exit at `<=5%` or `>=95%`). Settlement then makes the non-occurring outcome self-resolve: if YES occurs, settle YES to the spot asset price at resolution and settle NO to `spot_at_resolution - impact_TWAP`, while if NO occurs settle NO to spot and settle YES to `spot_at_resolution + impact_TWAP`. If `impact_TWAP` is undefined because there is less than 24 hours of in-band time prior to `t_end`, refund both markets.  

2) Decision selection bias occurs when a market both guides the choice and only pays out if that choice is made. That makes the market price track the conditional expectation “impact given this option gets chosen,” not the unconditional expectation “impact of this option.” This is problematic because the decision rule selects options more often in states where their impact is high, so selection is correlated with impact and the conditional expectation is biased upward by an amount that increases with that correlation. The price then reflects both expected impact and a correlation term that is not relevant to comparing options on impact. Unconditional outcome futures remove this by making each option’s contract settle to a value even when it is not chosen, so prices track unconditional impact rather than “impact in the worlds where it gets picked.”  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@distbit0)](https://twitter.com/distbit0) or [schedule a 20 min call](https://cal.com/distbit/20min)
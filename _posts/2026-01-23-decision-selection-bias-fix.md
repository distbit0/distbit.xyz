---
articleUrl: https://distbit.xyz/decision-selection-bias-fix?
author: distbit
category: blog
date: 2026-01-23 00:00
description: ''
gist_url: https://gist.github.com/0263d017c78742811c501cd46939429f
headerImage: false
hidden: true
layout: post
live: true
published: false
tag: []
title: Decision selection bias fix
---




# Decision selection bias fix  

## Current status: superseded  

The proposed “unconditional outcome futures” settlement does not fix decision selection bias and is not a valid impact oracle. It defined `impact_TWAP` from the same two prices whose terminal spread it set, creating a continuum of self-consistent fixed points rather than identifying one impact value. actually-impact-futures#Why the endogenous two-market version fails gives the correction.  

A separate impact-spread future can settle from independently formed conditional prices without that circularity. It still does not remove decision selection bias: paying the conditional spread does not make an unchosen outcome observable or undo the correlation between the decision rule and the state in which an option is selected. Identifying an unconditional causal effect requires an exogenous decision or another identification design; changing the settlement payoff alone is insufficient.  

## Historical reasoning retained  

The original argument identified a real selection problem. When a market both guides which option is chosen and pays only for the chosen option, its price can track `E[impact | option selected]` rather than unconditional expected impact. If the decision rule selects an option more often in states where its impact is high, selection and impact are correlated, so the conditional estimate includes a correlation term that does not belong in an unconditional option comparison.  

The rejected proposal claimed that settling both outcome contracts in every world would turn this conditional estimate into unconditional impact. The mistake was treating an imputed payoff for the unchosen branch as an observation of its counterfactual outcome. The selection-bias diagnosis remains useful; the settlement change does not supply the missing causal identification.  

### Original mechanism specification  

The proposal assumed a binary event, an underlying asset with a spot market, and two markets for the asset price conditional on YES and NO. It used `p_yes(t)` for the event-market YES price, `price_yes(t)` and `price_no(t)` for the conditional asset prices, and `spot_at_resolution` for the spot asset price when the event resolved. It defined `impact(t) = price_yes(t) - price_no(t)`.  

“In-band time” meant periods when `p_yes(t)` was within `[5%, 95%]`. `t_end` was the resolution time if the probability never left that band, or otherwise the final pre-resolution crossing outside it. `impact_TWAP` was the time-weighted average of `impact(t)` over 24 cumulative in-band hours ending at `t_end`.  

The proposed “unconditional outcome futures” settled both branches rather than cancelling the branch that did not occur:  

- after YES, YES settled to `spot_at_resolution` and NO to `spot_at_resolution - impact_TWAP`;  
- after NO, NO settled to `spot_at_resolution` and YES to `spot_at_resolution + impact_TWAP`;  
- with fewer than 24 cumulative in-band hours, both markets refunded their collateral.  

In the proposal's terminology, “settle” meant redeem at a final value, “refund” meant return collateral without resolving to a price, and “self-resolve” meant impute a nonzero value for the branch that did not occur. These definitions and rules are retained as rejected design history; they are not the current recommendation.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
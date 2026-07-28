---
articleUrl: https://distbit.xyz/actually-impact-futures
author: distbit
category: blog
date: 2026-02-03 00:00
description: ''
gist_url: https://gist.github.com/1906750660be85a0f69290899104bb11
headerImage: false
hidden: true
layout: post
live: false
published: false
tag: []
title: Actually impact futures
---




# Actually Impact Futures  

Impact is how much the market expects an event to change an asset’s price.  

It is the market-implied delta between the asset’s price if the event occurs and the asset’s price if it does not occur.  

Standard conditional futures do not isolate impact. A long YES and short NO position becomes a bet on which outcome occurs, because one leg settles to the spot price and the other leg settles to 0. Impact exposure instead targets the conditional spread `price_yes - price_no` through a separate cash-settled spread future. Its oracle must read independently formed conditional prices; defining settlement from prices whose own settlement depends on that value is circular.  

## Definitions  

Let an event have two outcomes, YES and NO. Let `price_yes(t)` be the asset price conditional on YES, and let `price_no(t)` be the asset price conditional on NO. Define `impact(t)` as `price_yes(t) - price_no(t)`.  

Impact exposure means profit and loss (PnL) depends on the value of `impact`, not on the event outcome and not on the event probability. A trader can go long impact or short impact. Long impact is a position whose payoff increases when `impact` increases. Short impact is a position whose payoff increases when `impact` decreases.  

## The core problem with “two conditional legs”  

In standard conditional token designs, one outcome leg becomes worthless at settlement. That property makes a “long one outcome, short the other outcome” position outcome-dependent. Once the payoff depends on which outcome occurs, the position is exposed to event probability in pricing and risk and one half of the position becomes worthless at resolution.  

## A separate impact-spread future  

Keep the two standard conditional markets, and add a third cash-settled future. Let `I = impact_TWAP`, a pre-resolution time-weighted average of `impact(t) = price_yes(t) - price_no(t)` over an eligibility window. The third future settles to `I` regardless of which event outcome occurs.  

The oracle inputs must come from the separate conditional markets rather than the impact future itself. If the conditional products are outcome claims rather than prices already expressed in conditional asset units, the oracle also needs an explicit conversion; it cannot treat raw claim prices as `price_yes` and `price_no`.  

## Why a separate market is necessary  

The impact-spread future has terminal value `I`. A long entered at futures price `F_0` earns `I - F_0`, while a short earns `F_0 - I`. Neither PnL depends on which event outcome occurs. The ordinary conditional markets continue to settle under their existing rules, so the impact future does not determine the prices used by its own oracle.  

Making both outcome legs settle in both worlds is not sufficient. If their settlement values are defined using a spread measured from those same two market prices, the rule becomes self-referential.  

## How `impact_TWAP` is defined  

Impact settlement needs a stable estimate of `impact(t) = price_yes(t) - price_no(t)`.  

When `p_yes(t)` is near 0% or 100%, the low-probability conditional market often becomes thin. A probability band excludes that extreme regime, but probability alone does not establish liquidity or make the spread manipulation-resistant.  

Eligible observations must satisfy both the probability band and a separately specified minimum-depth or quote-quality rule for the conditional markets. The liquidity rule remains an open design requirement.  

It defines `p_yes(t)` as the YES price in the event market and “in-band time” as time where `p_yes(t) ∈ [5%, 95%]`.  

It defines an end time `t_end` as the event resolution time if `p_yes(t)` never leaves the band before resolution. Otherwise it defines `t_end` as the last time before resolution that `p_yes(t)` leaves the band. This ends the measurement window before the one-sided regime.  

It computes `impact_TWAP` as a 24-hour TWAP of `impact(t)` over 24 hours of cumulative eligible time ending at `t_end`.  

If there is less than 24 hours of cumulative eligible time prior to `t_end`, it refunds the impact-spread future so settlement does not depend on an underspecified observation window. The two conditional markets retain their ordinary settlement rules.  

## Why the endogenous two-market version fails  

An earlier version set both outcome legs to nonzero values and defined their settlement spread as `I`, while also defining `I` as a TWAP of those same two market prices. The payoff difference was algebraically `I` in either outcome, but that did not identify a unique value for `I`.  

The settlement rule made the two prices depend on `I`, while the oracle made `I` depend on the two prices. Under simple no-arbitrage pricing, every constant spread within feasible payoff bounds is a fixed point, and other self-consistent paths may exist. A probability band does not remove this circularity. A separate spread future avoids it because its settlement input comes from conditional markets whose settlement rules do not depend on the spread future.  

## Historical details from the rejected proposal  

The rejected version also specified that reversing the legs, short YES and long NO, would pay `-I`. Its worked example used `S = 100,000` and `I = +10,000`: the terminal YES-minus-NO difference was `+10,000` whether the legs settled to `100,000` and `90,000` after YES or `110,000` and `100,000` after NO.  

It proposed refunding both outcome markets when fewer than 24 hours of in-band observations existed. These details are retained as design history, not as the current mechanism. They show why the payoff identity looked compelling once `I` was assumed, while leaving unanswered how the markets could identify one value of `I` without circularity.  

## Why standard conditional futures do not give impact exposure  

Standard conditional futures can also be described using multiverse or universe token language. A deposit creates two outcome claims, and at settlement only the claim for the outcome that occurs redeems to the spot asset price, while the other redeems to 0.  

A long YES position and a short NO position of equal size therefore does not settle to impact. The winning conditional future settles to `S`, and the losing conditional future settles to 0. If YES occurs, the position settles to `+S`. If NO occurs, it settles to `-S`. The position is a directional bet on the outcome and on the spot level, not a bet on the pre-event spread `price_yes - price_no`.  

Defining impact as `price_yes - spot` also does not isolate impact. If spot is priced as a probability-weighted average of conditional prices, `spot(t) = p_yes(t)·price_yes(t) + (1-p_yes(t))·price_no(t)`, then `price_yes(t) - spot(t) = (1-p_yes(t))·(price_yes(t) - price_no(t))`. The multiplier `(1-p_yes(t))` collapses as `p_yes(t)` approaches 1, so this definition collapses toward 0 as one outcome becomes near-certain.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
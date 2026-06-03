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

Standard conditional futures do not isolate impact. A long YES and short NO position becomes a bet on which outcome occurs, because one leg settles to the spot price and the other leg settles to 0. Impact exposure instead targets the conditional spread `price_yes - price_no`. Unconditional outcome futures isolate that spread by making both legs settle to prices in both outcomes, so long YES and short NO settles to `impact_TWAP` regardless of which outcome occurs.   

## Definitions  

Let an event have two outcomes, YES and NO. Let `price_yes(t)` be the asset price conditional on YES, and let `price_no(t)` be the asset price conditional on NO. Define `impact(t)` as `price_yes(t) - price_no(t)`.  

Impact exposure means profit and loss (PnL) depends on the value of `impact`, not on the event outcome and not on the event probability. A trader can go long impact or short impact. Long impact is a position whose payoff increases when `impact` increases. Short impact is a position whose payoff increases when `impact` decreases.  

## The core problem with “two conditional legs”  

In standard conditional token designs, one outcome leg becomes worthless at settlement. That property makes a “long one outcome, short the other outcome” position outcome-dependent. Once the payoff depends on which outcome occurs, the position is exposed to event probability in pricing and risk and one half of the position becomes worthless at resolution.  

## Unconditional outcome futures: impact exposure using two markets  

This mechanism replaces “one leg becomes worthless” with a settlement rule where both outcome markets always settle to a price. It uses `S = spot_at_resolution`, which is the spot asset price at resolution, and it uses `I = impact_TWAP`, which is a pre-resolution time-weighted average of `impact(t) = price_yes(t) - price_no(t)` over an eligibility window.  

If YES occurs, the YES leg settles to `S`, and the NO leg settles to `S - I`. If NO occurs, the NO leg settles to `S`, and the YES leg settles to `S + I`. This makes both legs settle in both outcomes, and it pins the YES-NO spread to `I`.  

## Why long YES and short NO pays impact  

Consider the position “long one YES unit and short one NO unit”. If YES occurs, the payoff is `settle_yes - settle_no = S - (S - I) = I`. If NO occurs, the payoff is `settle_yes - settle_no = (S + I) - S = I`. So “long YES, short NO” pays `I` regardless of which outcome occurs. That is impact exposure by construction.  

Reversing the legs gives short impact. “Short YES, long NO” pays `-I` regardless of which outcome occurs.  

## Worked examples  

Let `S = 100,000` and let `I = +10,000`. If YES occurs, then `settle_yes = 100,000` and `settle_no = 90,000`, so long YES and short NO pays `+10,000`. If NO occurs, then `settle_yes = 110,000` and `settle_no = 100,000`, so long YES and short NO pays `+10,000`.  

## How `impact_TWAP` is defined  

Impact settlement needs a stable estimate of `impact(t) = price_yes(t) - price_no(t)`.  

Using conditional prices when the market becomes one-sided does not give a stable estimate. When `p_yes(t)` is near 0% or 100%, the low-probability conditional market becomes thin. Low liquidity and low depth make its price cheap to move. A settlement rule that reads that price makes `impact` easy to manipulate and makes the settled spread unreliable.  

The design therefore measures impact only during time where both outcomes have non-trivial probability and both conditional markets carry meaningful liquidity.  

It defines `p_yes(t)` as the YES price in the event market and “in-band time” as time where `p_yes(t) ∈ [5%, 95%]`.  

It defines an end time `t_end` as the event resolution time if `p_yes(t)` never leaves the band before resolution. Otherwise it defines `t_end` as the last time before resolution that `p_yes(t)` leaves the band. This ends the measurement window before the one-sided regime.  

It computes `impact_TWAP` as a 24-hour TWAP of `impact(t)` over 24 hours of cumulative in-band time ending at `t_end`.  

If there is less than 24 hours of cumulative in-band time prior to `t_end`, it refunds both outcome markets so settlement does not depend on a short, manipulable window.  

## Why standard conditional futures do not give impact exposure  

Standard conditional futures can also be described using multiverse or universe token language. A deposit creates two outcome claims, and at settlement only the claim for the outcome that occurs redeems to the spot asset price, while the other redeems to 0.  

A long YES position and a short NO position of equal size therefore does not settle to impact. The winning conditional future settles to `S`, and the losing conditional future settles to 0. If YES occurs, the position settles to `+S`. If NO occurs, it settles to `-S`. The position is a directional bet on the outcome and on the spot level, not a bet on the pre-event spread `price_yes - price_no`.  

Defining impact as `price_yes - spot` also does not isolate impact. If spot is priced as a probability-weighted average of conditional prices, `spot(t) = p_yes(t)·price_yes(t) + (1-p_yes(t))·price_no(t)`, then `price_yes(t) - spot(t) = (1-p_yes(t))·(price_yes(t) - price_no(t))`. The multiplier `(1-p_yes(t))` collapses as `p_yes(t)` approaches 1, so this definition collapses toward 0 as one outcome becomes near-certain.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
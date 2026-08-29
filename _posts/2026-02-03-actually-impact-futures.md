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

## Conditional futures  

A prediction market asks whether an event will happen. A conditional market asks what another asset or metric will be worth if that event happens.  

Consider the event “Republicans lose control of Congress in the next US midterm elections.” A pair of Bitcoin conditional markets could price:  

- the expected Bitcoin price if Republicans lose control; and  
- the expected Bitcoin price if they retain control.  

If the two conditional prices are `$110,000` and `$100,000`, the market is pricing a `$10,000` difference between those two possible political outcomes. This difference can be useful even to someone with no view on which outcome is more likely.  

Conditional markets already exist in practice. [MetaDAO](https://docs.metadao.fi/governance/markets) runs pass and fail markets that price a project’s token conditional on whether a governance proposal passes. [Proof](https://www.proof.trade/) describes “Multiverse Markets” that price assets such as BTC, ETH, gold, and crude oil in the worlds where an event does and does not occur.  

A conditional market deposit creates two outcome claims, and at settlement only the claim for the outcome that occurs redeems to the spot asset price, while the other redeems to 0.  

For the midterm example, a `BTC | Republicans lose` claim pays according to Bitcoin’s price if Republicans lose. The corresponding `BTC | Republicans retain control` claim pays in the other outcome. Throughout this article, `price_yes(t)` and `price_no(t)` refer to the branch-normalised forecasts of Bitcoin’s price.  

## Why impact exposure is useful  

The difference between the two conditional prices is the event’s market-implied counterfactual impact spread on the asset:  

`impact(t) = price_yes(t) - price_no(t)`  

It is counterfactual because only one outcome will occur. The market can observe Bitcoin’s eventual price in the realised world, but it can never observe Bitcoin’s price at the same time in the unrealised world. Conditional markets allow traders to estimate both sides before the event occurs.  

Suppose the market prices Bitcoin at `$110,000` if Republicans lose and `$100,000` if they retain control, implying a `+$10,000` impact spread. A trader who expects a Republican loss to cause larger institutional reallocations into Bitcoin than the market currently prices may estimate the spread at `+$15,000`, while having no view on whether Republicans will actually lose. Impact exposure lets them trade that disagreement without betting on the election result or Bitcoin’s unrelated price movements.  

This instrument prices how the market expects the event to affect the asset. It does not reveal the event’s objectively true causal effect, because the unrealised counterfactual cannot be observed.  

## Why ordinary conditional futures are not impact futures  

A long YES position and a short NO position of equal size does not settle to impact. The winning conditional future settles to the asset’s spot price `S`, and the losing conditional future settles to 0. If YES occurs, the combined position settles to `+S`. If NO occurs, it settles to `-S`. The position is a directional bet on the outcome and on the spot level, not a bet on the pre-event spread `price_yes - price_no`.  

The trader can exit before resolution, but the position remains exposed to changes in event probability and to asset-price movements unrelated to the event until it is closed. For a long-running election market, a Bitcoin move caused by interest rates, regulation, or a large exchange failure can dominate the PnL of a trader who only intended to speculate on the election’s impact.  

Defining impact as `price_yes - spot` also does not isolate impact. Spot reflects the probability-weighted average of the conditional prices,  

`spot(t) = p_yes(t) · price_yes(t) + (1-p_yes(t)) · price_no(t)`,  

then:  

`price_yes(t) - spot(t) = (1-p_yes(t)) · (price_yes(t) - price_no(t))`.  

The multiplier `(1-p_yes(t))` collapses as `p_yes(t)` approaches 1. The conditional-to-spot difference therefore approaches 0 as YES becomes near-certain, even if the counterfactual spread between YES and NO remains large.  

## The first design: make both outcome legs settle  

The first impact-futures design tried to repair the ordinary long-YES, short-NO position without creating a third derivative. Its goal was to make both conditional legs retain a value in either outcome, so their difference would pay the impact spread regardless of which outcome occurred.  

Let `I` be a pre-resolution time-weighted average of:  

`price_yes(t) - price_no(t)`.  

The proposed settlement rule was:  

- if YES occurs, settle YES to the spot price `S` and NO to `S - I`;  
- if NO occurs, settle NO to `S` and YES to `S + I`.  

For example, if `S = $100,000` and `I = +$10,000`, the YES-minus-NO difference would be `+$10,000` in both outcomes. After YES, the two legs would settle to `$100,000` and `$90,000`. After NO, they would settle to `$110,000` and `$100,000`.  

This looked like a way to turn the two conditional markets themselves into an impact instrument. It retained a direct long-YES, short-NO trade and avoided adding another market that needed collateral and liquidity.  

## Why the first design is circular  

The design defines `I` from the pre-resolution spread between the YES and NO prices. It then uses `I` to determine the terminal values of those same two claims. The prices determine `I`, while `I` determines the values that the prices anticipate.  

Suppose traders coordinate on an expected spread of `$10,000`. The settlement rule then gives the two claims a `$10,000` terminal spread, which validates prices with a `$10,000` spread, so the oracle reports `I = $10,000`.  

The same loop works for `$5,000`, `$20,000`, or any other feasible constant spread. Each expected value can make itself correct because the settlement rule turns that expectation into the claims’ terminal payoff difference. Nothing outside the two markets selects one of those values as the event’s impact.  

The design therefore has many self-consistent fixed points rather than one market-discovered value. Making both legs settle in both worlds solves the outcome-dependent payoff problem only after `I` is known; it does not provide a non-circular way to determine `I`.  

## A separate impact-spread future  

The circularity disappears if the conditional markets retain settlement rules that do not depend on `I`, while a separate derivative settles from their independently formed price spread.  

Keep the ordinary YES and NO conditional markets. Define:  

`I = impact_TWAP`,  

where `impact_TWAP` is a pre-resolution time-weighted average of `price_yes(t) - price_no(t)` over an eligible observation window. Add a separate cash-settled impact future whose terminal value is `I` regardless of which event outcome occurs.  

A long entered at impact-futures price `F_0` earns `I - F_0`. A short earns `F_0 - I`. If a trader buys at `$10,000` and the final impact TWAP is `$15,000`, the long earns `$5,000` whether Republicans lose or retain control.  

The payoff provides direct exposure to how the market will come to price the event’s counterfactual effect on the asset. It is a claim on the final market-implied distance between the two possible worlds, rather than a claim on which world occurs.  

The separate future does not determine the settlement values of its source markets. The conditional prices therefore provide an external input to the impact future instead of being determined by the value they are supposed to measure. Within this architecture, the third derivative is what breaks the circularity.  

## Measuring the impact spread  

The baseline design defines `p_yes(t)` as the YES price in the event prediction market. It counts an observation as eligible when `p_yes(t)` lies between 5% and 95% and both conditional markets satisfy a separate minimum-depth or execution-quality rule.  

Extreme probabilities make the low-probability conditional price unreliable. When YES has a 1% probability, the YES conditional market is unlikely to settle and informed traders receive little expected compensation for committing capital to correct its price. Liquidity and the cost of moving its quoted price can therefore be much lower than in the likely-outcome market.  

The impact future creates an additional manipulation incentive. A trader with a large impact-futures position can profit by moving the low-probability conditional price used in `I`, even when that conditional outcome is unlikely to occur. The impact future settles from the quoted spread regardless of which event outcome occurs, so the manipulation profit need not depend on the manipulated branch becoming real. A probability band excludes the most one-sided regimes, but it cannot replace a separate liquidity and manipulation-resistance requirement.  

The baseline observation rule sets `t_end` to the event resolution time if probability remains in-band. If probability leaves the band, `t_end` is the final pre-resolution exit from the band. It then calculates `impact_TWAP` from 24 hours of cumulative eligible observations ending at `t_end`.  

If fewer than 24 eligible hours exist, the impact future refunds. The ordinary event and conditional markets retain their own settlement rules. The 5% and 95% thresholds, 24-hour duration, and market-quality requirement are design parameters rather than universal constants.  

## The capital-efficiency limitation  

The separate impact future fixes circularity, but the baseline source-market design requires more capital than necessary. The initial split into event-outcome claims can share one deposit. The duplication arises when each outcome branch contains its own fully collateralised long-and-short asset-price market. Each branch can then require a separate dollar of collateral for every dollar of conditional notional, and the impact derivative requires its own collateral.  

Most of the branch collateral is idle when an outcome is improbable. If Republicans have only a 5% probability of losing, capital committed to a fully collateralised `BTC | Republicans lose` market is locked even though that market has only a 5% chance of becoming the realised branch. This makes low-probability conditionals expensive to supply precisely when they are most differentiated from ordinary spot exposure.  

## A capital-efficient long-only conditional layer  

The conditional layer can instead adapt the shared-collateral design in pm-for-highly-improbable-events. Create only a long conditional claim for each mutually exclusive event outcome and back those claims from one shared pool. Because only one outcome can occur, only that outcome’s long claim pays. The same collateral can therefore support the long claims for every branch rather than funding a separate complete long-and-short set inside each branch.  

The traded price of a long-only claim is not yet the branch-normalised conditional asset price. Let `joint_yes(t)` be the price of a claim that pays according to the asset price if YES occurs and pays 0 otherwise. Ignoring discounting and differences in risk premia:  

`joint_yes(t) = p_yes(t) · price_yes(t)`.  

The conditional price can therefore be recovered as:  

`price_yes(t) = joint_yes(t) / p_yes(t)`.  

Likewise:  

`price_no(t) = joint_no(t) / (1-p_yes(t))`.  

The impact oracle can derive:  

`impact(t) = joint_yes(t) / p_yes(t) - joint_no(t) / (1-p_yes(t))`.  

Consider a market that prices a 10% chance that Republicans lose. Suppose Bitcoin is priced at `$120,000` conditional on losing and `$100,000` conditional on retaining control. The corresponding long-only joint claims are priced at `$12,000` and `$90,000`. Dividing each joint price by its outcome probability recovers the two conditional prices and the `$20,000` impact spread.  

One shared unit of underlying or bounded settlement collateral can support the mutually exclusive long claims because they cannot both pay. The design avoids depositing a full unit of collateral in a low-probability conditional market that will almost always be the unrealised branch. The impact future remains a separate derivative, but the conditional markets supplying its oracle become much more capital efficient.  

This design has constraints:  

- The outcomes must be mutually exclusive and collectively cover the event. If several claims can pay together, shared collateral can become insufficient and winning claims need a haircut, insurance, or additional backing.  
- The prediction market probabilities and long-only conditional prices must use compatible expiries, collateral, and pricing conventions.  
- Dividing by a very small probability magnifies pricing errors. Shared collateral reduces capital requirements but does not make a 1% conditional estimate reliable.  
- The event, spot, and conditional markets need enough liquidity and cross-market arbitrage to keep their prices consistent.  
- A cash-settled implementation needs explicit payout bounds so one realised branch cannot owe more than the shared collateral.  

When one branch is much more liquid, spot and the reliable conditional price provide another consistency relation:  

`spot(t) = p_yes(t) · price_yes(t) + (1-p_yes(t)) · price_no(t)`.  

This can infer the other branch, but dividing a small residual by a small probability also magnifies errors. It is a cross-check or fallback only when the source prices satisfy a strong quality standard.  

## Does this apply to futarchy or only event-conditional markets?  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders and hedgers want exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

Decision markets have a different timing constraint. The mechanism chooses when to make the decision, so it can keep the trading period brief. MetaDAO, for example, currently describes a three-day conditional trading period. A shorter period reduces the probability that unrelated asset-price shocks occur while the trader holds the position. It concentrates the decision’s expected impact relative to other sources of volatility.  

Fast decision markets work best when traders can react quickly and expect the market to incorporate their information quickly. AI agents can make this more practical because they can monitor, analyse, trade, and update quotes with lower latency than human-only markets.  

Under those conditions, an ordinary long-one-branch, short-the-other conditional position can approximate impact exposure over the brief trading period. The trader can profit as the relative conditional prices incorporate the information, while common asset-price movement contributes little noise before the position is closed.  

This approximation fails when the market needs a long time to understand why a trader acted. A trader may need to hold the position beyond the intended decision time before other participants price in the information. During that delay, interest rates, market-wide volatility, or asset-specific news can dominate the trade’s PnL and make the original information trade less attractive.  

Impact futures do not solve slow post-decision information incorporation. They depend on two live counterfactual conditional prices and therefore end when the decision is made and one branch becomes unrealised. They cannot continue providing isolated exposure to the decision’s counterfactual impact after the decision has occurred.  

Impact futures therefore have no clear role in a decision market when a short market duration is feasible and prices update within that period. They become useful if the decision market must remain open long enough for unrelated asset volatility to become material, for example because traders react slowly, proposals require extended evaluation, or liquidity develops gradually. They isolate the conditional spread during that longer pre-decision period. They do not solve decision-selection bias or make the unrealised outcome observable after the decision.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
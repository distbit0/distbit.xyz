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

The circularity disappears if the conditional markets retain settlement rules that do not depend on `I`, while a separate derivative derives the spread from independently formed market prices. Keep the ordinary YES and NO conditional markets, but use only one of their prices in each oracle observation.  

The oracle uses the spot asset price, the event probability, and one conditional asset price. The relationship between them is:  

`spot(t) = p_yes(t) · price_yes(t) + (1-p_yes(t)) · price_no(t)`.  

If the YES conditional price is used, the implied impact spread is:  

`impact(t) = (price_yes(t) - spot(t)) / (1-p_yes(t))`.  

If the NO conditional price is used, it is:  

`impact(t) = (spot(t) - price_no(t)) / p_yes(t)`.  

At each observation, the oracle uses the conditional price for the highest-probability available outcome. Traders have stronger incentives to correct that price because its claim is more likely to pay, which generally makes the market deeper and harder to manipulate than the low-probability branch.  

Define `I = impact_TWAP`, where `impact_TWAP` is a pre-resolution time-weighted average of this implied spread over an eligible observation window. Add a separate cash-settled impact future whose terminal value is `I` regardless of which event outcome occurs.  

A long entered at impact-futures price `F_0` earns `I - F_0`. A short earns `F_0 - I`. If a trader buys at `$10,000` and the final impact TWAP is `$15,000`, the long earns `$5,000` whether Republicans lose or retain control.  

The payoff provides direct exposure to how the market will come to price the event’s counterfactual effect on the asset. It is a claim on the final market-implied distance between the two possible worlds, rather than a claim on which world occurs.  

The separate future does not determine the settlement values of its source markets. The spot, event-probability, and selected conditional prices therefore provide external inputs to the impact future. The oracle does not subtract the two conditional-market prices directly. Within this architecture, the third derivative is what breaks the circularity.  

## Measuring the impact spread  

The baseline design defines `p_yes(t)` as the YES price in the event prediction market. It counts an observation as eligible when `p_yes(t)` lies between 5% and 95% and the event, spot, and selected conditional markets satisfy separate minimum-depth or execution-quality rules.  

Extreme probabilities make both the event probability and the low-probability conditional price unreliable. In a standard fully collateralised prediction market, correcting a 5% YES price downward requires buying NO for about `$0.95` to earn at most `$0.05`. Buying YES requires only `$0.05`. As YES approaches 0%, betting against it locks increasingly more capital relative to the available profit. This weakens downward correction and allows the prices of genuinely improbable events to remain too high. Near 100%, the same problem applies to the NO outcome.  

The low-probability conditional market has a related problem: traders receive little expected compensation for committing capital to correct a claim that is unlikely to settle. The oracle therefore uses the higher-probability conditional price when it is available.  

This avoids relying directly on the least liquid conditional market, but it does not remove the extreme-probability problem. When NO is almost certain, `price_no` lies very close to spot, and the oracle divides that small difference by `p_yes`. Pricing or manipulation errors in spot, event probability, or the selected conditional price are therefore magnified.  

The impact future gives its holders an incentive to manipulate any of those inputs. Using the highest-probability conditional market increases the capital required to manipulate the selected conditional price, while the probability band excludes observations where the derivation is most sensitive to small errors. Neither measure replaces explicit liquidity and manipulation-resistance requirements.  

The baseline observation rule sets `t_end` to the event resolution time if probability remains in-band. If probability leaves the band, `t_end` is the final pre-resolution exit from the band. It then calculates `impact_TWAP` from 24 hours of cumulative eligible observations ending at `t_end`.  

If fewer than 24 eligible hours exist, the impact future refunds. The ordinary event and conditional markets retain their own settlement rules. The 5% and 95% thresholds, 24-hour duration, and market-quality requirement are design parameters rather than universal constants.  

## The capital-efficiency limitation  

The separate impact future fixes circularity, but the baseline source-market design still requires one dollar of collateral per dollar of conditional notional for each event or decision. The YES and NO branches of a single event are mutually exclusive and already share that dollar. The inefficiency is therefore not duplicated collateral between branches. It is the need to fully collateralise each separate event or decision, while the impact derivative also requires its own collateral.  

Across many markets, most of this collateral can remain idle. Ten separate one-dollar conditional positions across ten events require ten dollars of collateral even if their selected outcomes are all improbable and few are expected to occur. This makes a portfolio of low-probability conditional markets expensive to supply.  

## A capital-efficient long-only conditional layer  

The conditional layer can instead adapt the [shared-collateral design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/). Bundle selected low-probability outcomes from multiple events or decisions, create only one long conditional market for each selected outcome, and back them from a shared pool rather than fully collateralising every event separately. The efficiency comes from the number of markets exceeding the number expected to pay, not from sharing collateral between the mutually exclusive branches of one event.  

The impact oracle applies the same spot-and-probability derivation used in the previous design. It prefers the conditional price for the highest-probability outcome. If that price is unavailable and only the other long conditional market has a usable price, the oracle uses the available price instead.  

Consider a market that prices a 10% chance that Republicans lose and a spot Bitcoin price of `$102,000`. If the shared pool provides only a YES conditional price of `$120,000`, the implied impact is:  

`($120,000 - $102,000) / 90% = $20,000`.  

If a usable NO conditional price of `$100,000` is also available, the oracle prefers that higher-probability branch and obtains the same spread:  

`($102,000 - $100,000) / 10% = $20,000`.  

Across a portfolio of these markets, one shared collateral pool can support conditional notional for multiple events or decisions instead of requiring a separate fully collateralised unit for each. The impact future remains a separate derivative, but the conditional layer supplying its oracle becomes more capital efficient.  

This capital efficiency directly addresses those pricing failures. Shared collateral lets traders bet against several improbable event outcomes without locking almost one dollar separately behind each small potential profit. It also reduces the capital tied up by corrective trades in the conditional markets. Traders can therefore make larger corrections to both the event probability and the conditional price with the same capital. The resulting depth makes both inputs more accurate, improves the impact oracle, and raises the cost of manipulation.  

This design has constraints:  

- The selected outcomes across different events are not necessarily mutually exclusive. If more resolve true than the pool can fund, winning claims need a disclosed haircut, insurance, margining, or additional backing.  
- The efficiency gain requires the number of markets sharing collateral to exceed the number expected to pay. It does not improve capital efficiency for a trader taking exposure to only one event.  
- The prediction market probability and long-only conditional prices must use compatible expiries, collateral, and pricing conventions.  
- The oracle should use the highest-probability conditional price when it is available. If only the lower-probability price is available, it needs stricter market-quality checks.  
- The derivation divides by the probability of the unobserved branch. Extreme probabilities therefore magnify errors even when the higher-probability conditional price is used.  
- The event, spot, and conditional markets need enough liquidity and cross-market arbitrage to keep their prices consistent.  
- A cash-settled implementation needs explicit payout bounds and a rule for any aggregate shortfall.  

## Does this apply to futarchy or only event-conditional markets?  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders and hedgers want exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

Decision markets have a different timing constraint. The mechanism chooses when to make the decision, so it can keep the trading period brief. MetaDAO, for example, currently describes a three-day conditional trading period. A shorter period reduces the probability that unrelated asset-price shocks occur while the trader holds the position. It concentrates the decision’s expected impact relative to other sources of volatility.  

Fast decision markets work best when traders can react quickly and expect the market to incorporate their information quickly. AI agents can make this more practical because they can monitor, analyse, trade, and update quotes with lower latency than human-only markets.  

Under those conditions, an ordinary long-one-branch, short-the-other conditional position can approximate impact exposure over the brief trading period. The trader can profit as the relative conditional prices incorporate the information, while common asset-price movement contributes little noise before the position is closed.  

This approximation fails when the market needs a long time to understand why a trader acted. A trader may need to hold the position beyond the intended decision time before other participants price in the information. During that delay, interest rates, market-wide volatility, or asset-specific news can dominate the trade’s PnL and make the original information trade less attractive.  

Impact futures do not solve slow post-decision information incorporation. They depend on two live counterfactual conditional prices and therefore end when the decision is made and one branch becomes unrealised. They cannot continue providing isolated exposure to the decision’s counterfactual impact after the decision has occurred.  

Impact futures therefore have no clear role in a decision market when a short market duration is feasible and prices update within that period. They become useful if the decision market must remain open long enough for unrelated asset volatility to become material, for example because traders react slowly, proposals require extended evaluation, or liquidity develops gradually. They isolate the conditional spread during that longer pre-decision period. They do not solve decision-selection bias or make the unrealised outcome observable after the decision.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
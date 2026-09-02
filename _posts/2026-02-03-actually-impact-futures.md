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
live: true
published: false
tag: []
title: Actually impact futures
---




# Actually Impact Futures  

## Conditional futures  

A prediction market prices which of several mutually exclusive outcomes a question will resolve to. A conditional market asks what another asset or metric will be worth under each outcome.  

Consider the next US midterm elections, with two relevant outcomes. A pair of Bitcoin conditional markets could price:  

- the expected Bitcoin price under outcome A, in which Republicans lose control of Congress; and  
- the expected Bitcoin price under outcome B, in which they retain control.  

If the two conditional prices are `$110,000` and `$100,000`, the market is pricing a `$10,000` difference between those two possible political outcomes. This difference can be useful even to someone with no view on which outcome is more likely.  

Conditional markets already exist in practice. [MetaDAO](https://docs.metadao.fi/governance/markets) runs pass and fail markets that price a project’s token under each proposal outcome. [Proof](https://www.proof.trade/) describes “Multiverse Markets” that price assets such as BTC, ETH, gold, and crude oil under different outcomes.  

The article assumes a separate asset-futures market for each outcome, collateralised by claims that pay `$1` only if that outcome occurs. The future associated with the realised outcome settles at the asset's nominal price, while the other becomes worthless. Throughout, `price_a(t)` denotes the asset-futures quote conditional on outcome A at observation time `t`; `price_b(t)` denotes the corresponding quote conditional on outcome B.   

## Why impact exposure is useful  

The difference between the two conditional prices is the market-implied event spread, used here as the event's impact estimate:  

`impact(t) = price_a(t) - price_b(t)`  

Only one outcome will be realised, but conditional markets let traders price both possible worlds beforehand.   

Suppose the market prices Bitcoin at `$110,000` if Republicans lose and `$100,000` if they retain control, implying a `+$10,000` event spread. A trader who expects the market near the election to price the outcomes `$15,000` apart could trade the change in that gap directly. Because the payoff is indexed to the difference between the conditional prices rather than either price level, it eliminates undesired payoff variance from Bitcoin movements due to factors unrelated to the event in question.  

The primary use developed below is hedging event-related price exposure: offsetting changes in the event spread while retaining exposure to the asset's other price movements.  

## Why ordinary conditional futures do not provide this hedge  

Ordinary conditional asset futures cannot provide this hedge because their payoff does not isolate the event spread. Suppose a trader goes long the asset through a future conditional on outcome A and shorts an equal amount through one conditional on outcome B. Only the future associated with the realised outcome settles, while the other settles to zero. The pair therefore pays `+settlement_spot` under outcome A and `-settlement_spot` under outcome B. Its value depends on which outcome occurs and on the asset's full price level, rather than offsetting changes in the pre-resolution spread `price_a - price_b` while leaving the holder's other asset exposure intact.  

The trader can exit before resolution, but the position remains exposed to changes in outcome probabilities and to asset-price movements unrelated to the event until it is closed. For a long-running election market, a Bitcoin move caused by interest rates, regulation, or macro conditions can dominate the PnL of a trader who only intended to speculate on the event spread.  

A trader might instead buy the asset in the outcome-A conditional market and short an equal amount in the spot market. The resulting spread, `price_a - spot`, still does not isolate the event spread. Let `probability_a(t)` be the market-implied probability of outcome A. Under the pricing assumption used throughout this article, spot reflects the probability-weighted average of the conditional prices:  

`spot(t) = probability_a(t) · price_a(t) + (1-probability_a(t)) · price_b(t)`.  

It follows that:  

`price_a(t) - spot(t) = (1-probability_a(t)) · (price_a(t) - price_b(t))`.  

The multiplier `(1-probability_a(t))` collapses as outcome A approaches certainty. The conditional-to-spot difference therefore approaches zero even if the counterfactual spread between outcomes A and B remains large.  

## The first design: make both outcome legs settle  

The first impact-futures design tried to repair this paired conditional-asset trade without creating a third derivative. Its goal was to make both conditional legs retain a value under either outcome, so their difference would pay the event spread regardless of the resolution.  

Let `endogenous_spread_TWAP` be a pre-resolution time-weighted average of:  

`price_a(t) - price_b(t)`.  

The proposed settlement rule was:  

- under outcome A, settle the A leg to `settlement_spot` and the B leg to `settlement_spot - endogenous_spread_TWAP`;  
- under outcome B, settle the B leg to `settlement_spot` and the A leg to `settlement_spot + endogenous_spread_TWAP`.  

For example, if `settlement_spot = \\(100,000` and `endogenous_spread_TWAP = +\\)10,000`, the A-minus-B difference would be `+$10,000` under both outcomes. Under outcome A, the two legs would settle to `$100,000` and `$90,000`. Under outcome B, they would settle to `$110,000` and `$100,000`.  

This looked like a way to turn the two conditional markets themselves into an impact instrument. It retained the paired conditional-asset trade and avoided adding another market.  

## Why the first design is circular  

The design defines `endogenous_spread_TWAP` from the pre-resolution spread between the A and B prices. It then uses that average to determine the terminal values of those same two claims. The prices determine the average, while the average determines the values that the prices anticipate.  

Suppose traders coordinate on an expected spread of `$10,000`. The settlement rule then gives the two claims a `$10,000` terminal spread, which validates prices with a `\\(10,000` spread, so the oracle reports an `endogenous_spread_TWAP` of `\\)10,000`.  

The same loop works for `$5,000`, `$20,000`, or any other feasible constant spread. Each expected value can make itself correct because the settlement rule turns that expectation into the claims’ terminal payoff difference. Nothing outside the two markets selects one of those values as the event spread.  

The design therefore has many self-consistent fixed points rather than one market-discovered value. Making both legs settle in both worlds solves the outcome-dependent payoff problem only after the spread is known; it does not provide a non-circular way to determine it.  

## An independent impact-spread index  

The circularity disappears if the conditional markets retain independent settlement rules while an oracle derives an event-spread index from their prices. This index can settle a distinct impact future instrument without feeding back the values of its source markets. The oracle uses spot, outcome probability, and whichever conditional quotes are available.  

If the outcome-A conditional price is used, its implied event-spread estimate is:  

`outcome_a_implied_spread(t) = (price_a(t) - spot(t)) / (1-probability_a(t))`.  

If the outcome-B conditional price is used, its estimate is:  

`outcome_b_implied_spread(t) = (spot(t) - price_b(t)) / probability_a(t)`.  

Under the pricing identity above, these are two estimates of the same event spread. When both quotes are available, the oracle always combines the estimates according to a disclosed rule that weights their relative reliability. Weighting the outcome-A-derived estimate by `1-probability_a` and the outcome-B-derived estimate by `probability_a` exactly produces the direct difference `price_a - price_b`, but those mechanical weights need not be best when one conditional quote is much less reliable than the other. If only one quote is available, the oracle can use an impact estimate derived from that quote, spot, and probability.  

Probability amplification is the main conceptual trade-off. At `probability_a = 5%`, the outcome-B-derived estimate divides its input difference by `0.05`, so a `$1` input error becomes a `$20` spread error. The outcome-A-derived estimate divides by `0.95`, but its source quote comes from the lower-probability outcome and can be harder to price accurately. The reliability weighting balances these two sources of error rather than selecting an outcome mechanically. Its exact specification is out of scope.  

The baseline accepts observations only while `probability_a(t)` is between 5% and 95%. This is the permitted probability band. An eligible observation is a synchronous sample of probability, spot, and at least one conditional quote taken while probability is in-band. In particular, the spot used for the final eligible observation must be sampled at the same time as its probability, not at a later time.  

The oracle uses the most recent 24 cumulative eligible hours before resolution. Ineligible periods are skipped, and later eligible observations after re-entry displace older ones. If fewer than 24 eligible hours exist, contracts using the index refund. The exact safeguards governing disconnected or stale observations remain implementation details to be worked out.  

Define `impact_TWAP` as the pre-resolution time-weighted average of the combined implied spread over that eligible observation window. The spot, outcome-probability, and selected conditional prices are external inputs, so the index does not create the settlement fixed point of the first design.  

## Why an unconditional impact future is not a hedge  

The simplest derivative on the index would be an unconditional impact future. A long entered at `entry_price` would earn `impact_TWAP - entry_price` whichever outcome is realised, while a short would earn the inverse. This gives traders a direct way to speculate on how the market-implied event spread will change.  

It does not hedge an asset holder's event-related price exposure. If the A-minus-B spread widens, the asset becomes more valuable under outcome A relative to outcome B. A hedge must therefore lose value under outcome A and gain value under outcome B. An unconditional long or short pays in the same direction under both outcomes, so it cannot offset both sides of this exposure.  

## Outcome-conditional impact futures  

The solution is to create one impact future for each outcome. Each uses the matching outcome claim as collateral and settlement numeraire. If that outcome is realised, a long earns `impact_TWAP - entry_price` and a short earns the inverse. Under the other outcome, the collateral claim and both positions pay zero.  

An asset holder can then short the impact future conditional on outcome A and long the one conditional on outcome B. When the event spread widens, the short reduces the holder's relative gain under outcome A, while the long offsets the relative loss under outcome B. When the spread narrows, the payoffs reverse. The pair therefore isolates changes in the event-related difference between the two asset prices while leaving price movements common to both outcomes unhedged.  

For one unit of asset exposure, a `$1` widening of the spread creates a `$1` increase in the difference between the outcome-A and outcome-B asset values. Each unit short under outcome A removes `$1` from the A side of that change, while each unit long under outcome B adds `$1` to the B side. The two hedge notionals must therefore add to one unit. Half a unit in each market treats the outcomes symmetrically.  

The pricing identity above gives a spot-centred allocation: short `1-probability_a` units under outcome A and long `probability_a` units under outcome B. This follows because `price_a - spot = (1-probability_a) · impact` and `spot - price_b = probability_a · impact`. The weights can be rebalanced as probability changes. A full unit in each market would total two units and reverse the exposure rather than cancel it.  

Because each future pays only the change from its entry price, the hedge locks the event spread at entry rather than erasing the spread already priced then. Its dollar value also depends on outcome probability, since each leg pays only under one outcome, and settlement retains basis risk because it tracks the market's pre-resolution estimate rather than the holder's realised loss.  

## Deriving the unconditional impact future  

The unconditional instrument does not need its own market. A wrapper can bundle matched same-direction positions in the two outcome-conditional impact futures with the same entry price and notional. Exactly one leg pays after resolution, so a long bundle earns `impact_TWAP - entry_price` under either outcome. A short bundle earns the inverse.  

This creates a speculative prediction market on the event spread from the contracts already used for hedging. A separate unconditional order book would duplicate the same payoff and split liquidity across markets.  

## The capital-efficiency limitation  

The independent index fixes circularity, but the baseline source-market design still requires one dollar of collateral per dollar of conditional notional for each market question or decision. The two outcome claims are mutually exclusive and already share that dollar. The inefficiency is therefore not duplicated collateral between outcomes, but rather is the need to fully collateralise each separate question or decision, while positions in the conditional asset and impact markets lock outcome collateral separately.  

Across many markets, much of this collateral can remain idle. Ten separate one-dollar conditional positions across ten questions require ten dollars of collateral even if they use low-probability outcomes and few are expected to be realised. This makes a portfolio of low-probability conditional markets expensive to supply.  

## Portfolio-insured collateral for low-probability outcomes  

The [shared-collateral design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) illustrates the problem with pooling claims for rare outcomes directly. If several bundled rare outcomes are realised, each associated token pays one divided by the number realised. Its raw price is therefore not the probability of its associated outcome, a conditional market collateralised by it inherits the same multiplicity exposure, and the bundle cannot settle until every included question has resolved. These claims cannot enter the ordinary two-outcome oracle unchanged.  

Instead, [portfolio-insured minting](https://distbit.xyz/insured-prediction-market-minting/) keeps each outcome claim isolated and moves diversification to an insurance provider's balance sheet. The provider issues undercollateralised claims for selected low-probability outcomes across a risk-assessed portfolio. Each claim pays one dollar when its market resolves to its associated outcome and zero under the alternative outcome, regardless of resolutions elsewhere, so different markets can resolve independently.  

The conditional-asset market remains separate and simply uses the insured outcome claim as collateral. The impact oracle takes `probability_a(t)` from the secondary-market price of the outcome-A claim, not the provider's fee-inclusive mint quote. Because the claims retain standard payoffs, the ordinary two-outcome decomposition applies without a cross-market multiplicity adjustment.  

Across a portfolio, insured minting can supply these claims without locking a separate fully collateralised dollar behind every low-probability outcome. It reduces the capital cost of betting against overpriced low-probability claims and therefore, ceteris paribus, improves their pricing accuracy. It also makes more outcome claims available as collateral for conditional impact futures. These improvements support a wider eligible probability band than the separately fully collateralised design, and reduce hedging costs.  

## Is this relevant to futarchy (decision markets) or only outcome-conditional markets?  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders may want event-spread exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

Decision markets can instead choose a sufficiently short trading interval. MetaDAO, for example, describes a three-day conditional trading period. Over a short enough interval, exogenous asset-price movement is negligible relative to proposal-related repricing, so a trader can simply take an unhedged position in the conditional market they believe is wrong. Ceteris paribus, AI agents make this approximation more practical by analysing information and updating prices faster.  

Under those conditions, a dedicated impact future has no clear role. It becomes useful if evaluation must remain open long enough for unrelated asset movement to become material. It isolates the event spread during that longer pre-decision period, but it cannot continue after the decision makes one outcome unrealised, solve decision-selection bias, or make the counterfactual observable.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
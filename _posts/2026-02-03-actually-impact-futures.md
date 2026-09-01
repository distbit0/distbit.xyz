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

A prediction market prices which of several mutually exclusive outcomes a question will resolve to. A conditional market asks what another asset or metric will be worth under each outcome.  

Consider the next US midterm elections, with two relevant outcomes. A pair of Bitcoin conditional markets could price:  

- the expected Bitcoin price under outcome A, in which Republicans lose control of Congress; and  
- the expected Bitcoin price under outcome B, in which they retain control.  

If the two conditional prices are `$110,000` and `$100,000`, the market is pricing a `$10,000` difference between those two possible political outcomes. This difference can be useful even to someone with no view on which outcome is more likely.  

Conditional markets already exist in practice. [MetaDAO](https://docs.metadao.fi/governance/markets) runs pass and fail markets that price a project’s token under each proposal outcome. [Proof](https://www.proof.trade/) describes “Multiverse Markets” that price assets such as BTC, ETH, gold, and crude oil under different outcomes.  

A simple abstraction is to run a standard asset-futures market for each outcome and collateralise it with the matching `$1` outcome claim. The future associated with the realised outcome settles at the asset's nominal price, while the other becomes worthless. Throughout this article, `price_a(t)` and `price_b(t)` refer to those conditional futures quotes. Outcomes A and B are arbitrary labels, not value judgements or shorthand for occurrence and non-occurrence.  

## Why impact exposure is useful  

The difference between the two conditional prices is the market-implied event spread, used here as the event's impact estimate:  

`impact(t) = price_a(t) - price_b(t)`  

Only one outcome will be realised, but conditional markets let traders price both possible worlds beforehand. Swapping the A and B labels reverses the sign of the spread without changing its economic meaning.  

Suppose the market prices Bitcoin at `$110,000` if Republicans lose and `$100,000` if they retain control, implying a `+$10,000` event spread. A trader who expects the market near the election to price the outcomes `$15,000` apart could trade the change in that gap directly. Because the payoff is indexed to the difference between the conditional prices rather than either price level, it eliminates undesired payoff variance from Bitcoin movements due to factors unrelated to the event in question.  

This spread is not automatically an identified causal effect: common causes can affect both the event and the asset. It is the price difference that traders expect the spot market to incorporate between the two outcomes. Because the same participants can trade the conditional and spot markets using the same information, there is a direct reason for the estimate to track the price effect those participants would incorporate into spot in either world.  

The primary use is hedging event-related price exposure. An asset holder can combine opposite positions in the two conditional impact futures to offset changes in the event spread while retaining exposure to the asset's other price movements. An outcome-independent version can instead be constructed by bundling same-direction positions in the same contracts, creating a speculative prediction market on the event spread rather than a hedging product.  

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

## A realised-anchor two-instrument alternative  

The circularity can be removed by averaging an externally determined realised payoff rather than the instruments' own spread. At every observation within a predefined probability band, record `probability_a(t)` and `spot(t)` simultaneously. After the market resolves, record `resolution_spot` at the first predefined observation after resolution. For each such time, calculate:  

- under outcome A, `anchor_slice(t) = (resolution_spot - spot(t)) / probability_a(t)`;  
- under outcome B, `anchor_slice(t) = -(resolution_spot - spot(t)) / (1-probability_a(t))`.  

Set the terminal A-minus-B spread to the time-weighted average of these `anchor_slice` values. The corresponding settlement values can then be constructed in the same way as in the first design: one leg settles to `resolution_spot` and the other is offset by the realised anchor TWAP.  

At each observation, probability-weighting the outcome-A payoff gives `price_a(t) - spot(t)`, while probability-weighting the outcome-B payoff gives `-(price_b(t) - spot(t))`. Their sum is therefore:  

`price_a(t) - price_b(t)`.  

This gives every observation an externally anchored expected value equal to the event spread. The payout slices themselves must be averaged; separately averaging their inputs would not preserve this relationship because the inverse-probability terms are nonlinear.  

The anchor should determine the full terminal spread. Mixing it with a TWAP of the instruments' own quoted spread would reintroduce the dynamic attenuation that the anchor is meant to remove. The cost is outcome-dependent payoff variance, especially near extreme probabilities. The independently measured index below is therefore the simpler and lower-variance baseline.  

## An independent impact-spread index  

The circularity also disappears if the conditional markets retain independent settlement rules while an oracle derives an event-spread index from their prices. This index can settle a distinct impact future instrument without feeding back the values of its source markets. The oracle uses spot, outcome probability, and whichever conditional quotes are available.  

If the outcome-A conditional price is used, its implied event-spread estimate is:  

`outcome_a_implied_spread(t) = (price_a(t) - spot(t)) / (1-probability_a(t))`.  

If the outcome-B conditional price is used, its estimate is:  

`outcome_b_implied_spread(t) = (spot(t) - price_b(t)) / probability_a(t)`.  

Under the pricing identity above, these are two estimates of the same event spread. When both quotes are available, the oracle always combines the estimates according to a disclosed rule that weights their relative reliability. Weighting the outcome-A-derived estimate by `1-probability_a` and the outcome-B-derived estimate by `probability_a` exactly produces the direct difference `price_a - price_b`, but those mechanical weights need not be best when one conditional quote is much less reliable than the other. If only one quote is available, the oracle can use the estimate derived from that quote, spot, and probability.  

Probability amplification is the main conceptual trade-off. At `probability_a = 5%`, the outcome-B-derived estimate divides its input difference by `0.05`, so a `$1` input error becomes a `$20` spread error. The outcome-A-derived estimate divides by `0.95`, but its source quote comes from the lower-probability outcome and can be harder to price accurately. The reliability weighting balances these two sources of error rather than selecting an outcome mechanically. Its exact specification is an implementation detail.  

The baseline accepts observations only while `probability_a(t)` is between 5% and 95%. This is the probability band. An eligible observation is a synchronous sample of probability, spot, and at least one conditional quote taken while probability is in-band. In particular, the spot used for the final eligible observation must be sampled at the same time as its probability, not at a later time.  

The oracle uses the most recent 24 cumulative eligible hours before resolution. Ineligible periods are skipped, and later eligible observations after re-entry displace older ones. If fewer than 24 eligible hours exist, contracts using the index refund. The exact safeguards governing disconnected or stale observations remain implementation details to be worked out.  

Define `impact_TWAP` as the pre-resolution time-weighted average of the combined implied spread over that eligible observation window. The spot, outcome-probability, and selected conditional prices are external inputs, so the index does not create the settlement fixed point of the first design.  

## Outcome-conditional impact futures  

The basic instruments are impact futures conditional on each outcome. Each uses the same outcome-claim type as collateral and settlement numeraire as the corresponding conditional asset market. If the market resolves to that outcome, a long earns `impact_TWAP - entry_price` and a short earns the inverse. Under the other outcome, the collateral claim and both impact positions pay zero.  

A single conditional leg suits exposure concentrated in one outcome. For example, a treasury that wants protection against a fall in the A-minus-B spread specifically under outcome A can short the outcome-A conditional impact future. The position gains as the spread falls and pays only under outcome A. An absolute-dollar spread naturally matches a hedge for a fixed quantity of the asset.  

Because a claim for a low-probability outcome is worth less in dollar terms than unconditional collateral, the trader can fully collateralise the position in outcome claims without locking the same dollar value. The design also avoids introducing another collateral-token type. It still requires a separate impact market, and claims locked in one market cannot simultaneously collateralise another.  

The trade-off is outcome-probability exposure: the position’s dollar price reflects both the expected spread and the probability of the selected outcome. It also retains basis risk because settlement tracks the market's pre-resolution estimate rather than the holder's realised loss.  

### Hedging exposure under both outcomes  

A holder of one unit of the asset under either outcome needs a hedge that also settles under either outcome. Let `short_notional_a` denote the short notional in the outcome-A conditional impact future and `long_notional_b` the long notional in the outcome-B conditional impact future. For a change in the event spread, the remaining difference between the two outcome-dependent portfolio changes is:  

`(1 - short_notional_a - long_notional_b) · change_in_impact`.  

Any allocation satisfying `short_notional_a + long_notional_b = 1` therefore hedges changes in the asset-price difference between the outcomes. Equal half-unit positions treat the outcomes symmetrically. Under the pricing identity above, the spot-centred allocation shorts `1-probability_a` units under outcome A and longs `probability_a` units under outcome B: at a given probability, these match the asset's respective impact sensitivities around the probability-weighted spot price. The weights use the probability at hedge inception and can be rebalanced as it changes. Because each future pays the change from its entry price, the hedge locks the event spread at entry rather than erasing the spread already priced then.  

The hedge uses one unit of total notional, not one unit in each conditional market. A full-unit short under outcome A combined with a full-unit long under outcome B reverses the asset's sensitivity to changes in the event spread instead of cancelling it. These opposite-direction positions also differ from the same-direction bundle below, which pays the same impact-future PnL under either outcome and therefore does not offset outcome-specific asset movements.  

### Optional outcome-independent bundle  

An outcome-independent impact contract would mainly be a speculative prediction market on the event's impact, rather than a risk-transfer instrument. It need not have an independent market. A wrapper can bundle matched same-direction outcome-A and outcome-B conditional impact futures with the same entry price and notional. One leg pays under each outcome, so a long bundle earns `impact_TWAP - entry_price` regardless of the resolution. It has no direct dependence on which outcome is realised, although outcome probabilities still affect the underlying index.  

Where hedging demand is concentrated in one outcome, the impact future conditional on the other outcome will likely attract little demand in isolation, although two-outcome hedgers still use it as part of the offsetting position above. Bundling both legs reuses the conditional contracts, whereas creating a separate outcome-independent order book would duplicate the payoff and unnecessarily split their liquidity. A scale-invariant bundle could instead use conditional contracts defined on `log(price_a / price_b)`, but it would not consolidate trading with the dollar-denominated contracts used for hedging.  

## The capital-efficiency limitation  

The independent index fixes circularity, but the baseline source-market design still requires one dollar of collateral per dollar of conditional notional for each market question or decision. The two outcome claims are mutually exclusive and already share that dollar. The inefficiency is therefore not duplicated collateral between outcomes, but rather is the need to fully collateralise each separate question or decision, while positions in the conditional asset and impact markets lock outcome collateral separately.  

Across many markets, much of this collateral can remain idle. Ten separate one-dollar conditional positions across ten questions require ten dollars of collateral even if they use low-probability outcomes and few are expected to be realised. This makes a portfolio of low-probability conditional markets expensive to supply.  

## Portfolio-insured collateral for low-probability outcomes  

The [shared-collateral design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) illustrates the problem with pooling claims for rare outcomes directly. If several bundled rare outcomes are realised, each associated token pays one divided by the number realised. Its raw price is therefore not the probability of its associated outcome, a conditional market collateralised by it inherits the same multiplicity exposure, and the bundle cannot settle until every included question has resolved. These claims cannot enter the ordinary two-outcome oracle unchanged.  

Instead, [portfolio-insured minting](https://distbit.xyz/insured-prediction-market-minting/) keeps each outcome claim isolated and moves diversification to an insurance provider's balance sheet. The provider issues undercollateralised claims for selected low-probability outcomes across a risk-assessed portfolio. Each claim pays one dollar when its market resolves to its associated outcome and zero under the alternative outcome, regardless of resolutions elsewhere, so different markets can resolve independently.  

The conditional-asset market remains separate and simply uses the insured outcome claim as collateral. The impact oracle takes `probability_a(t)` from the secondary-market price of the outcome-A claim, not the provider's fee-inclusive mint quote. Because the claims retain standard payoffs, the ordinary two-outcome decomposition applies without a cross-market multiplicity adjustment.  

Across a portfolio, insured minting can supply these claims without locking a separate fully collateralised dollar behind every low-probability outcome. It reduces the capital cost of betting against overpriced low-probability claims and therefore, ceteris paribus, improves their pricing accuracy. It also makes more outcome claims available as collateral for conditional futures. These improvements support a wider eligible probability band than the separately fully collateralised design.  

## Is this relevant to futarchy (decision markets) or only outcome-conditional markets?  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders may want event-spread exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

Decision markets can instead choose a sufficiently short trading interval. MetaDAO, for example, describes a three-day conditional trading period. Over a short enough interval, exogenous asset-price movement is negligible relative to proposal-related repricing, so a trader can simply take an unhedged position in the conditional market they believe is wrong. Ceteris paribus, AI agents make this approximation more practical by analysing information and updating prices faster.  

Under those conditions, a dedicated impact future has no clear role. It becomes useful if evaluation must remain open long enough for unrelated asset movement to become material. It isolates the event spread during that longer pre-decision period, but it cannot continue after the decision makes one outcome unrealised, solve decision-selection bias, or make the counterfactual observable.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
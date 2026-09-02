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

If the two conditional prices are `$110,000` and `$100,000`, the market is pricing a `$10,000` difference between those two possible political outcomes.   

Conditional markets already exist in practice. [MetaDAO](https://docs.metadao.fi/governance/markets) runs pass and fail markets that price a project’s token under each proposal outcome. [Proof](https://www.proof.trade/) describes “Multiverse Markets” that price assets such as BTC, ETH, gold, and crude oil under different outcomes.  

The article assumes a separate asset-futures market for each outcome, collateralised by claims that pay `$1` only if that outcome occurs. The future associated with the realised outcome settles at the asset's nominal price, while the other becomes worthless. Throughout, `price_a(t)` denotes the asset-futures quote conditional on outcome A at observation time `t`; `price_b(t)` denotes the corresponding quote conditional on outcome B.   

## What an impact future is and why it is useful  

An impact future is a derivative whose underlying is the market-implied event spread: the difference between the asset's conditional prices under two outcomes. This spread is used here as the event's impact estimate:  

`impact(t) = price_a(t) - price_b(t)`  

There are two main use cases: hedging and speculation.  

For hedging, consider someone who holds one Bitcoin and wants their payoff to be independent of the election outcome. Let the terminal event spread be `terminal_impact`. One minimal hedge is to short one unit of a full-spread contract conditional on outcome A. The holder's payoff is then:  

- under outcome A, `price_a - terminal_impact`; and  
- under outcome B, `price_b`.  

Because `terminal_impact = price_a - price_b`, both expressions equal `price_b`. Buying one unit of the full-spread contract conditional on outcome B provides the equivalent hedge while making both expressions equal `price_a`. Either position cancels the outcome-contingent difference on the market's pre-resolution estimates. For a larger holding, its size scales with the number of asset units being hedged.  

The hedge is indexed to the market's final pre-resolution impact estimate. If that estimate rises from `$10,000` to `$20,000`, its outcome-contingent payment doubles automatically rather than leaving the holder with a fixed `$10,000` hedge. This keeps the protection aligned with the market-implied welfare difference between outcomes without requiring the holder to keep resizing it.  

For speculation, an outcome-independent impact future gives direct exposure to changes in the spread. Suppose the market prices Bitcoin at `$110,000` under outcome A and `$100,000` under outcome B. A trader who expects the spread to rise from `$10,000` to `$15,000` can trade that view without also taking a position on Bitcoin's full price level. A Bitcoin movement that adds the same amount to both conditional prices cancels from the spread.  

The event spread is a market-implied comparison between outcomes, not by itself an identified causal effect. It measures the price difference traders expect the asset market to reflect near the event.  

## Why prediction-market positions require rebalancing  

An ordinary prediction-market position can approximate the hedge by fixing a payment for one outcome. After observing a `$10,000` event spread in the conditional markets, a holder of one Bitcoin could short `10,000` outcome-A claims or buy `10,000` outcome-B claims, assuming each claim pays `$1`. These alternatives differ only by a payment that is the same under both outcomes, so splitting the hedge between them is unnecessary. The problem is that the number of claims remains fixed while the estimated impact can change.  

Suppose the position is sized for a `$10,000` event spread. If new information later raises the spread to `$20,000`, the original position covers only half of the exposure. The holder must trade again at the new outcome-claim prices. This becomes costly or unreliable when outcome probabilities move materially before the impact estimate changes, or when the impact changes too suddenly to rebalance before resolution.  

This approach is adequate when impact volatility is small, or when most uncertainty about the impact is resolved within a short final interval in which the hedge can be resized once. Impact estimates can instead remain volatile when an election's expected policy consequences change with projected governing margins, a court case's expected remedy changes during proceedings, or analysis of a protocol proposal reveals a bug or previously missed economic interaction.  

An impact-indexed contract adjusts its terminal payment with the spread, avoiding repeated rebalancing and the risk that a sudden revision leaves the holder underhedged. It also gives speculators a direct way to profit from forecasting the impact estimate, allowing them to supply the other side of trades demanded by hedgers.  

## Why ordinary conditional futures do not provide this exposure  

An ordinary conditional asset future has a different underlying: the asset's price under one outcome, not the difference between its prices under two outcomes. Combining ordinary conditional futures therefore does not reproduce an impact future's exposure.  

Suppose a trader goes long the asset through a future conditional on outcome A and shorts an equal amount through one conditional on outcome B. Only the future associated with the realised outcome settles, while the other settles to zero. The pair therefore pays `+settlement_spot` under outcome A and `-settlement_spot` under outcome B, rather than the pre-resolution spread `price_a - price_b`. Its value depends on which outcome occurs and on the asset's full price level. It consequently neither isolates the event spread for speculation nor cancels an asset holder's outcome-contingent value difference while preserving their other price exposure.  

The trader can exit before resolution, but the position remains exposed to changes in outcome probabilities and to asset-price movements unrelated to the event until it is closed. For a long-running election market, a Bitcoin move caused by interest rates, regulation, or macro conditions can dominate the PnL of a trader who only intended to speculate on the event spread.  

Nor does pairing one conditional future with spot solve the problem. A trader might buy the asset in the outcome-A conditional market and short an equal amount in the spot market, but the resulting difference, `price_a - spot`, still does not isolate the event spread. Let `probability_a(t)` be the market-implied probability of outcome A. Under the pricing assumption used throughout this article, spot reflects the probability-weighted average of the conditional prices:  

`spot(t) = probability_a(t) · price_a(t) + (1-probability_a(t)) · price_b(t)`.  

It follows that:  

`price_a(t) - spot(t) = (1-probability_a(t)) · (price_a(t) - price_b(t))`.  

The multiplier `(1-probability_a(t))` collapses as outcome A approaches certainty. The conditional-to-spot difference therefore approaches zero even if the counterfactual spread between outcomes A and B remains large.  

## The first design: make both outcome legs settle  

The first impact-futures design tried to turn the paired conditional-asset trade into an outcome-independent spread position without creating a third derivative. A trader would go long the asset future conditional on outcome A and short the asset future conditional on outcome B. If both legs retained a terminal value under either outcome, their difference could equal the event spread regardless of the resolution. This would support speculation on the spread, but not hedging: the pair would have the same directional payoff under both outcomes rather than offsetting the asset holder's gain in one and loss in the other.  

Let `endogenous_spread_TWAP` be a pre-resolution time-weighted average of:  

`price_a(t) - price_b(t)`.  

The proposed settlement rule was:  

- under outcome A, settle the A leg to `settlement_spot` and the B leg to `settlement_spot - endogenous_spread_TWAP`;  
- under outcome B, settle the B leg to `settlement_spot` and the A leg to `settlement_spot + endogenous_spread_TWAP`.  

These are synthetic contract values, not different settlement prices for Bitcoin. The leg matching the realised outcome is anchored to the observed spot price. Because the other outcome is not observed, the design assigns its leg a synthetic value offset by the spread. The two legs therefore cease to be ordinary conditional futures: each has a terminal value under both outcomes. For example, with `settlement_spot = \\(100,000` and `endogenous_spread_TWAP = +\\)10,000`, outcome A gives the A and B legs values of `$100,000` and `$90,000`; outcome B gives them values of `$110,000` and `$100,000`. The A-minus-B position is worth `+$10,000` in either case.  

## Why the first design is circular  

The design defines `endogenous_spread_TWAP` from the pre-resolution spread between the A and B prices. It then uses that average to determine the terminal values of those same two claims. The prices determine the average, while the average determines the values that the prices anticipate.  

Suppose traders coordinate on an expected spread of `$10,000`. The settlement rule then gives the two claims a `$10,000` terminal spread, which validates prices with a `\\(10,000` spread, so the oracle reports an `endogenous_spread_TWAP` of `\\)10,000`.  

The same loop works for `$5,000`, `$20,000`, or any other feasible constant spread. Each expected value can make itself correct because the settlement rule turns that expectation into the claims’ terminal payoff difference. Nothing outside the two markets selects one of those values as the event spread.  

The design therefore has many self-consistent fixed points rather than one market-discovered value. Making both legs settle in both worlds solves the outcome-dependent payoff problem only after the spread is known; it does not provide a non-circular way to determine it.  

## An independent impact-spread index  

An oracle can derive an event-spread index from independently settled conditional markets. It uses spot, outcome probability, and whichever conditional quotes are available.  

If the outcome-A conditional price is used, its implied event-spread estimate is:  

`outcome_a_implied_spread(t) = (price_a(t) - spot(t)) / (1-probability_a(t))`.  

If the outcome-B conditional price is used, its estimate is:  

`outcome_b_implied_spread(t) = (spot(t) - price_b(t)) / probability_a(t)`.  

Under the pricing identity above, these are two estimates of the same event spread. When both quotes are available, the oracle always combines the estimates according to a disclosed rule that weights their relative reliability. Weighting the outcome-A-derived estimate by `1-probability_a` and the outcome-B-derived estimate by `probability_a` exactly produces the direct difference `price_a - price_b`, but those mechanical weights need not be best when one conditional quote is much less reliable than the other. If only one quote is available, the oracle can use an impact estimate derived from that quote, spot, and probability.  

Probability amplification is the main conceptual trade-off. Suppose `probability_a = 5%` and the true event spread is `\\(10`. The difference `spot - price_b` is only `\\)0.50`, so the outcome-B-derived estimate recovers `$10` by dividing by `0.05`. A `$1` error in either input therefore becomes a `$20` error in the estimated spread.  

The outcome-A calculation has much less amplification: `price_a - spot` is `$9.50`, and dividing by `0.95` again produces `$10`, while a `$1` input error changes the estimate by only about `$1.05`. Its weakness is the source market. A claim paying `$1` under the 5% outcome is worth only about `$0.05`, so the same nominal liquidity commits much less economically valuable capital than it does under the 95% outcome. This makes the quote less robust. The reliability weighting balances the economic value of each source market's liquidity against the error amplification in its estimator. Its exact specification is out of scope.  

The baseline accepts observations only while `probability_a(t)` is between `minimum_probability` and `maximum_probability`. This is the permitted probability band. An eligible observation samples probability, spot, and at least one conditional quote at the same timestamp while probability is within that band.  

The oracle uses the most recent `observation_duration` of cumulative eligible time before resolution. Ineligible periods are skipped, and later eligible observations after re-entry displace older ones. If the eligible time totals less than `observation_duration`, contracts using the index refund. The exact safeguards governing disconnected or stale observations remain implementation details to be worked out.  

Define `impact_TWAP` as the pre-resolution time-weighted average of the combined implied spread over that eligible observation window.  

## Why an unconditional impact future is not a hedge  

The simplest derivative on the index would be an unconditional impact claim that settles to `impact_TWAP` whichever outcome is realised. Traders could buy or short it to speculate on the market-implied event spread.  

It cannot implement the hedge calculated above. That hedge requires a spread payment under one outcome but not the other. An unconditional position has the same directional payoff under both outcomes, so adding it to the asset does not make the holder's combined payoff outcome-independent.  

## Outcome-conditional impact claims  

The hedging implementation offers one linear impact claim for each outcome. Each settles to the full `impact_TWAP` if its outcome is realised and to zero otherwise. A hedger needs only one: shorting the outcome-A claim preserves the outcome-B asset value, while buying the outcome-B claim preserves the outcome-A value. Settling to the full spread keeps the chosen offset aligned with the estimated exposure and makes the combined asset-and-hedge payoff independent of the outcome.  

The claims' market values before resolution still depend on outcome probability. Settlement also retains basis risk because it follows the market's final pre-resolution estimate rather than the holder's realised loss.  

## Deriving the unconditional impact future  

The unconditional instrument does not need its own market. A wrapper can bundle matched same-direction positions in the two outcome-conditional impact claims. Exactly one claim pays after resolution, so a long bundle settles to `impact_TWAP` under either outcome. A short bundle has the inverse payoff.  

This creates a speculative prediction market on the event spread from the contracts already used for hedging. A separate unconditional order book would duplicate the same payoff and split liquidity across markets.  

## The capital-efficiency limitation  

The independent index fixes circularity, but the baseline source-market design still requires one dollar of collateral per dollar of conditional notional for each market question or decision. The two outcome claims are mutually exclusive and already share that dollar. The inefficiency is therefore not duplicated collateral between outcomes, but rather is the need to fully collateralise each separate question or decision, while positions in the conditional asset and impact markets lock outcome collateral separately.  

Across many markets, much of this collateral can remain idle. Ten separate one-dollar conditional positions across ten questions require ten dollars of collateral even if they use low-probability outcomes and few are expected to be realised. This makes a portfolio of low-probability conditional markets expensive to supply.  

## Portfolio-insured collateral for low-probability outcomes  

The [shared-collateral design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) illustrates the problem with pooling claims for rare outcomes directly. If several bundled rare outcomes are realised, each associated token pays one divided by the number realised. Its raw price is therefore not the probability of its associated outcome, a conditional market collateralised by it inherits the same multiplicity exposure, and the bundle cannot settle until every included question has resolved. These claims cannot enter the ordinary two-outcome oracle unchanged.  

Instead, [portfolio-insured minting](https://distbit.xyz/insured-prediction-market-minting/) keeps each outcome claim isolated and moves diversification to an insurance provider's balance sheet. The provider issues undercollateralised claims for selected low-probability outcomes across a risk-assessed portfolio. Each claim pays one dollar when its market resolves to its associated outcome and zero under the alternative outcome, regardless of resolutions elsewhere, so different markets can resolve independently.  

The conditional-asset market remains separate and simply uses the insured outcome claim as collateral. The impact oracle takes `probability_a(t)` from the secondary-market price of the outcome-A claim, not the provider's fee-inclusive mint quote. Because the claims retain standard payoffs, the ordinary two-outcome decomposition applies without a cross-market multiplicity adjustment.  

Across a portfolio, insured minting can supply these claims without locking a separate fully collateralised dollar behind every low-probability outcome. It reduces the capital cost of betting against overpriced low-probability claims and therefore, ceteris paribus, improves their pricing accuracy. It also makes more outcome claims available as collateral for conditional impact contracts. These improvements support a wider eligible probability band than the separately fully collateralised design, and reduce hedging costs.  

## Is this relevant to futarchy (decision markets) or only outcome-conditional markets?  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders may want event-spread exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

Decision markets can instead choose a sufficiently short trading interval. MetaDAO, for example, describes a three-day conditional trading period. Over a short enough interval, exogenous asset-price movement is negligible relative to proposal-related repricing, so a trader can simply take an unhedged position in the conditional market they believe is wrong. Ceteris paribus, AI agents make this approximation more practical by analysing information and updating prices faster.  

Under those conditions, a dedicated impact future has no clear role. It becomes useful if evaluation must remain open long enough for unrelated asset movement to become material. It isolates the event spread during that longer pre-decision period, but it cannot continue after the decision makes one outcome unrealised, solve decision-selection bias, or make the counterfactual observable.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
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

One simple abstraction is to run a standard asset-futures market for each outcome and collateralise it with the matching `$1` event claim. The winning-branch future settles at the asset's nominal price, while the other branch unwinds or pays zero. Implementations differ in mechanics—MetaDAO reverts the losing-branch trades, while Proof converts the winning branch into perpetual exposure and unwinds the other—but both can expose an ordinary nominal asset-price quote conditional on each outcome. Throughout this article, `price_yes(t)` and `price_no(t)` refer to those conditional futures quotes.  

## Why impact exposure is useful  

The difference between the two conditional prices is the market-implied event spread, used here as the event's impact estimate:  

`impact(t) = price_yes(t) - price_no(t)`  

Only one outcome will occur, but conditional markets let traders price both possible worlds beforehand. The unrealised branch need not later become observable because the target is the market's estimate, not a retrospectively scored counterfactual.  

Suppose the market prices Bitcoin at `$110,000` if Republicans lose and `$100,000` if they retain control, implying a `+$10,000` event spread. An impact future would let a trader who expects the market near the election to price the outcomes `$15,000` apart trade that disagreement without a direct binary payoff on the election result.  

This spread is not automatically an identified causal effect: common causes can affect both the event and the asset. It is the price difference that traders expect the spot market to incorporate between the two outcomes. Because the same participants can trade the conditional and spot markets using the same information, there is a direct reason for the estimate to track the price effect those participants would incorporate into spot in either world.  

Outcome-independent exposure to this spread is useful for speculating on an event's expected consequences without also betting on whether it happens, comparing the priced consequences of different events, and expressing separate views about event probability and event magnitude. Event-contingent hedging requires a conditional variant described below.  

## Why ordinary conditional futures are not impact futures  

A long YES position and a short NO position of equal size does not settle to the event spread. The winning conditional future settles to the asset’s spot price, and the losing conditional future settles to zero. If YES occurs, the combined position settles to `+settlement_spot`. If NO occurs, it settles to `-settlement_spot`. The position is a directional bet on the outcome and on the spot level, not a bet on the pre-event spread `price_yes - price_no`.  

The trader can exit before resolution, but the position remains exposed to changes in event probability and to asset-price movements unrelated to the event until it is closed. For a long-running election market, a Bitcoin move caused by interest rates, regulation, or macro conditions can dominate the PnL of a trader who only intended to speculate on the event spread.  

A trader might instead buy the asset in the YES-conditional market and short an equal amount in the spot market. The resulting spread, `price_yes - spot`, still does not isolate the event spread. Under the pricing assumption used throughout this article, spot reflects the probability-weighted average of the conditional prices:  

Let `p_yes(t)` be the YES probability implied by the event market. Then:  

`spot(t) = p_yes(t) · price_yes(t) + (1-p_yes(t)) · price_no(t)`,  

then:  

`price_yes(t) - spot(t) = (1-p_yes(t)) · (price_yes(t) - price_no(t))`.  

The multiplier `(1-p_yes(t))` collapses as `p_yes(t)` approaches 1. The conditional-to-spot difference therefore approaches 0 as YES becomes near-certain, even if the counterfactual spread between YES and NO remains large.  

## The first design: make both outcome legs settle  

The first impact-futures design tried to repair the ordinary long-YES, short-NO position without creating a third derivative. Its goal was to make both conditional legs retain a value in either outcome, so their difference would pay the event spread regardless of which outcome occurred.  

Let `endogenous_spread_TWAP` be a pre-resolution time-weighted average of:  

`price_yes(t) - price_no(t)`.  

The proposed settlement rule was:  

- if YES occurs, settle YES to `settlement_spot` and NO to `settlement_spot - endogenous_spread_TWAP`;  
- if NO occurs, settle NO to `settlement_spot` and YES to `settlement_spot + endogenous_spread_TWAP`.  

For example, if `settlement_spot = \\(100,000` and `endogenous_spread_TWAP = +\\)10,000`, the YES-minus-NO difference would be `+$10,000` in both outcomes. After YES, the two legs would settle to `$100,000` and `$90,000`. After NO, they would settle to `$110,000` and `$100,000`.  

This looked like a way to turn the two conditional markets themselves into an impact instrument. It retained a direct long-YES, short-NO trade and avoided adding another market.  

## Why the first design is circular  

The design defines `endogenous_spread_TWAP` from the pre-resolution spread between the YES and NO prices. It then uses that average to determine the terminal values of those same two claims. The prices determine the average, while the average determines the values that the prices anticipate.  

Suppose traders coordinate on an expected spread of `$10,000`. The settlement rule then gives the two claims a `$10,000` terminal spread, which validates prices with a `\\(10,000` spread, so the oracle reports an `endogenous_spread_TWAP` of `\\)10,000`.  

The same loop works for `$5,000`, `$20,000`, or any other feasible constant spread. Each expected value can make itself correct because the settlement rule turns that expectation into the claims’ terminal payoff difference. Nothing outside the two markets selects one of those values as the event spread.  

The design therefore has many self-consistent fixed points rather than one market-discovered value. Making both legs settle in both worlds solves the outcome-dependent payoff problem only after the spread is known; it does not provide a non-circular way to determine it.  

## A realised-anchor two-instrument alternative  

The circularity can be removed by averaging an externally determined realised payoff rather than the instruments' own spread. At every observation admitted by the settlement rule, record `p_yes(t)` and `spot(t)` simultaneously. After the event resolves, record `resolution_spot` at the first predefined observation after resolution. For each admitted time, calculate:  

- after YES, `anchor_slice(t) = (resolution_spot - spot(t)) / p_yes(t)`;  
- after NO, `anchor_slice(t) = -(resolution_spot - spot(t)) / (1-p_yes(t))`.  

Set the terminal YES-minus-NO spread to the time-weighted average of these `anchor_slice` values. The corresponding settlement values can then be constructed in the same way as in the first design: one leg settles to `resolution_spot` and the other is offset by the realised anchor TWAP.  

At each observation, the expected spot-relative YES payoff is `price_yes(t) - spot(t)`, while the expected spot-relative NO payoff is `-(price_no(t) - spot(t))`. Their sum is therefore:  

`price_yes(t) - price_no(t)`.  

This gives every observation an externally anchored expected value equal to the event spread. It does not rely on a static fixed-point argument, and using a probability and spot sample from every admitted observation avoids concentrating the calculation in one final probability quote. The payout slices themselves must be averaged; separately averaging their inputs would not preserve this relationship because the inverse-probability terms are nonlinear.  

The anchor should determine the full terminal spread. Mixing it with a TWAP of the instruments' own quoted spread would reintroduce the dynamic attenuation that the anchor is meant to remove. The cost is outcome-dependent payoff variance, especially near extreme probabilities. The separate future below is therefore the simpler and lower-variance baseline.  

## A separate impact-spread future  

The circularity also disappears if the conditional markets retain independent settlement rules while a separate derivative derives the event spread from their prices. The oracle uses spot, event probability, and whichever conditional quotes are available.  

If the YES conditional price is used, its implied event-spread estimate is:  

`yes_implied_spread(t) = (price_yes(t) - spot(t)) / (1-p_yes(t))`.  

If the NO conditional price is used, its estimate is:  

`no_implied_spread(t) = (spot(t) - price_no(t)) / p_yes(t)`.  

Under the pricing identity above, these are two estimates of the same event spread. When both quotes are available, the oracle always combines the estimates according to a disclosed rule that weights their relative reliability. Weighting the YES-derived estimate by `1-p_yes` and the NO-derived estimate by `p_yes` exactly produces the direct difference `price_yes - price_no`, but those mechanical weights need not be best when one conditional quote is much less reliable than the other. If only one quote is available, the oracle can use the estimate derived from that quote, spot, and probability.  

Probability amplification is the main conceptual trade-off. At `p_yes = 5%`, the NO-derived estimate divides its input difference by `0.05`, so a `$1` input error becomes a `$20` spread error. The YES-derived estimate divides by `0.95`, but its source quote comes from the rare branch and can be harder to price accurately. The reliability weighting balances these two sources of error rather than selecting a branch mechanically. Its exact specification is an implementation detail.  

The baseline accepts observations only while `p_yes(t)` is between 5% and 95%. This is the probability band. An eligible observation is a synchronous sample of probability, spot, and at least one conditional quote taken while probability is in-band. In particular, the spot used for the final eligible observation must be sampled at the same time as its probability, not at a later time.  

The oracle uses the most recent 24 cumulative eligible hours before resolution. Ineligible periods are skipped, and later eligible observations after re-entry displace older ones. If fewer than 24 eligible hours exist, the impact future refunds. The exact safeguards governing disconnected or stale observations remain implementation details to be worked out.  

Define `impact_TWAP` as the pre-resolution time-weighted average of the combined implied spread over that eligible observation window. Add a separate cash-settled impact future whose terminal value is `impact_TWAP` regardless of which event outcome occurs.  

A long entered at `entry_price` earns `impact_TWAP - entry_price`. A short earns `entry_price - impact_TWAP`. If a trader buys at `$10,000` and the final impact TWAP is `$15,000`, the long earns `$5,000` whether Republicans lose or retain control.  

The payoff provides direct exposure to the market’s final pre-resolution estimate of the event spread. A trader profits only if the source markets come to price the outcomes farther apart than the entry price; the instrument does not score the unrealised counterfactual.  

An absolute-dollar spread is useful when the contract will be made event-conditional to hedge a fixed quantity of the asset. For outcome-independent speculation, `log(price_yes / price_no)` has better invariance: it is unchanged when an unrelated factor multiplies both prices by the same amount, and swapping YES and NO simply reverses its sign.  

The outcome-independent payoff is useful for pure event-magnitude speculation, relative-value comparisons between events, and separating a view about consequences from a view about probability. It is not the appropriate instrument for hedging a loss that occurs only in one outcome; the event-conditional version below is.  

The payoff has no direct binary dependence on which outcome occurs, but it is not free of probability exposure. Event probability affects estimator weighting and amplification, observation eligibility, and refund risk.  

The separate future does not determine the settlement values of its source markets. The spot, event-probability, and selected conditional prices therefore provide external inputs to the impact future. Within this architecture, the third derivative is what breaks the circularity.  

## The capital-efficiency limitation  

The separate impact future fixes circularity, but the baseline source-market design still requires one dollar of collateral per dollar of conditional notional for each event or decision. The YES and NO branches of a single event are mutually exclusive and already share that dollar. The inefficiency is therefore not duplicated collateral between branches, but rather is the need to fully collateralise each separate event or decision, while the impact derivative also requires its own collateral.  

Across many markets, much of this collateral can remain idle. Ten separate one-dollar conditional positions across ten events require ten dollars of collateral even if their included branches are all improbable and few are expected to occur. This makes a portfolio of low-probability conditional markets expensive to supply.  

## Portfolio-insured collateral for low-probability branches  

The [shared-collateral design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) illustrates the problem with pooling rare branches directly. If several bundled events occur, each triggered YES token pays `1 / winner_count`. Its raw price is therefore not the probability of that event, a conditional market collateralised by it inherits the same multiplicity exposure, and the bundle cannot settle until its final winner count is known. These claims cannot enter the ordinary binary oracle unchanged.  

Instead, [portfolio-insured minting](https://distbit.xyz/insured-prediction-market-minting/) keeps each event branch as an isolated binary claim and moves diversification to an insurance provider's balance sheet. The provider issues undercollateralised YES claims across a risk-assessed portfolio. Each claim pays one dollar if its own branch occurs and zero otherwise, regardless of other outcomes, so different event markets can resolve independently.  

The conditional-asset market remains separate and simply uses the insured branch claim as collateral. The impact oracle takes `p_yes(t)` from the event claim's secondary-market price, not the provider's fee-inclusive mint quote. Because the branch claims retain standard payoffs, the ordinary binary decomposition applies without a `winner_count` adjustment.  

Across a portfolio, insured minting can supply these claims without locking a separate fully collateralised dollar behind every low-probability branch. It reduces the capital cost of betting against overpriced low-probability claims and therefore, ceteris paribus, improves their pricing accuracy. It also makes more branch claims available as collateral for conditional futures. These improvements support a wider eligible probability band than the separately fully collateralised design.  

## Event-conditional impact futures  

The impact future itself can also be conditional on the selected event branch. It uses the same branch-token type as collateral and settlement numeraire as the corresponding conditional asset market. If the branch occurs, a long earns `impact_TWAP - entry_price` and a short earns the inverse. If the complementary branch occurs, the branch token and both impact positions pay zero.  

This is the hedging-relevant form of the instrument because it suits holders who face a loss only if the event occurs. For example, a DeFi treasury that expects ETH to be lower in the depeg outcome than the market implies could short the depeg-conditional impact future. A more negative event spread increases the short’s payoff, and the hedge pays only if the depeg occurs.  

Because an improbable branch token is worth less in dollar terms than unconditional collateral, the trader can fully collateralise the position in branch tokens without locking the same dollar value. The design also avoids introducing another collateral-token type. It still requires a separate impact market, and tokens locked in one market cannot simultaneously collateralise another.  

The trade-off is renewed exposure to event probability: the position’s dollar price reflects both the expected spread and the chance that the branch occurs. It also retains basis risk because settlement tracks the market's pre-resolution estimate rather than the holder's realised loss. It is therefore less suitable for traders who want outcome-independent spread exposure.  

## Is this relevant to futarchy (decision markets) or only event-conditional markets?  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders may want event-spread exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

Decision markets can instead choose a sufficiently short trading interval. MetaDAO, for example, describes a three-day conditional trading period. Over a short enough interval, exogenous asset-price movement is negligible relative to proposal-related repricing, so a trader can simply take an unhedged position in the conditional market they believe is wrong. Ceteris paribus, AI agents make this approximation more practical by analysing information and updating prices faster.  

Under those conditions, a separate impact future has no clear role. It becomes useful if evaluation must remain open long enough for unrelated asset movement to become material. It isolates the event spread during that longer pre-decision period, but it cannot continue after the decision makes one branch unrealised, solve decision-selection bias, or make the counterfactual observable.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
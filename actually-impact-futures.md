---
layout: page
title: "Actually impact futures"
description: "A separate derivative on the final pre-resolution market-implied spread between event-conditioned asset prices, with its oracle and collateral limits."
permalink: /actually-impact-futures/
---

# Actually impact futures

## Conditional futures

A prediction market prices whether an event will happen. A conditional market prices another asset or metric in the world where that event does or does not happen.

Consider “Republicans lose control of Congress in the next US midterm elections.” A pair of Bitcoin conditional markets might price Bitcoin at `$110,000` if Republicans lose control and `$100,000` if they retain it. The `$10,000` difference is useful even to someone with no view on which outcome is more probable.

Conditional markets already exist. [MetaDAO](https://docs.metadao.fi/governance/markets) runs pass and fail markets whose trades revert when their condition is not selected. [Proof](https://www.proof.trade/) describes event-conditioned markets where the matching branch converts into perpetual exposure and the other unwinds.

Those implementations do not create identical claims. This article therefore uses `price_yes(t)` and `price_no(t)` for branch-normalised forecasts at one common future observation time. The event claim, conditional asset claim and unconditional asset or forward must share a state-price measure, numeraire, maturity, settlement source, discounting and carry convention, with an exact replication relationship between them. A stand-alone probability market and independently margined conditional venues need not satisfy this identity; their cross-market basis then enters the measured spread. Where current spot appears below, it means spot adjusted to the common horizon, or a maturity-matched forward.

## What the instrument would price

The market-implied scenario spread is:

`spread(t) = price_yes(t) - price_no(t)`

This is an association between two priced scenarios, not a causal effect by construction. A common cause can both change the event probability and move Bitcoin. If the branch worlds differ only through the event mechanism relevant to the asset, and sufficiently liquid conditional and spot markets draw on the same informed traders, the spread should approach those traders' best estimate of the event's effect. The shared trader set helps the same information enter both prices; it does not remove confounding or make the unrealised counterfactual observable.

The product settles to the market's estimate near the event, not to an objectively scored counterfactual. A trader is rewarded for anticipating the final pre-resolution market estimate. They are not rewarded merely for being right about an effect the source markets never price.

The payoff unit is also a product choice. An absolute-dollar spread matches the loss on a fixed number of BTC and is useful for hedging. A percentage spread such as `price_yes / price_no - 1`, or a log-price difference, is more useful for speculation when unrelated asset moves act multiplicatively. If both conditional prices double for an unrelated reason, the dollar spread doubles while the percentage and log spreads remain unchanged.

## Why ordinary conditional positions do not isolate the spread

An equal long-YES and short-NO position does not settle to `price_yes - price_no`. If the selected branch becomes spot exposure while the other unwinds, the position is both an outcome bet and an asset-level bet. A common move in Bitcoin can dominate the PnL before the position closes.

Buying the YES-conditional asset and shorting the unconditional asset also leaves a probability-scaled exposure. Under the compatible-pricing assumptions above:

`base(t) = p_yes(t) * price_yes(t) + (1-p_yes(t)) * price_no(t)`

so:

`price_yes(t) - base(t) = (1-p_yes(t)) * spread(t)`

The difference collapses as YES approaches certainty even when the scenario spread remains large.

## Why the first impact-futures design is circular

An earlier design tried to make both conditional legs retain value in either outcome. It defined `I` as a pre-resolution average of their price difference, then settled their terminal difference to `I` regardless of the outcome.

That makes the prices determine `I` while `I` determines the values those prices anticipate. A `$5,000`, `$10,000`, or `$20,000` spread can each validate itself. Making both legs settle in both worlds removes outcome dependence only after the spread is known; it does not identify the spread.

## A separate scenario-spread future

The direct circularity disappears if the conditional markets retain settlement rules independent of the spread and a third derivative reads their prices.

The YES branch implies:

`spread_yes(t) = (price_yes(t) - base(t)) / (1-p_yes(t))`

The NO branch implies:

`spread_no(t) = (base(t) - price_no(t)) / p_yes(t)`

When both branches are usable, the oracle should combine them with weights chosen to minimise estimated post-normalisation error, including covariance because both estimators share `base` and `p_yes`. The relevant inputs include executable depth, bid-ask spread, source-oracle error, cross-market basis and the probability divisor. Raw liquidity alone is not enough: at `p_yes = 5%`, a `$1` error in `base - price_no` becomes a `$20` error in `spread_no`, while the YES estimator divides by `95%`. A hard switch to the higher-probability branch can therefore choose the noisier estimator and creates a discontinuity near 50%.

If only one branch is usable, its derived estimate should qualify only when its amplified error and manipulation bound fit a predeclared limit. The oracle then time-weights qualifying observations into `spread_TWAP`.

A separate cash-settled future pays the change from its entry price to `spread_TWAP`, regardless of which event outcome occurs. A long entered at `$10,000` earns `$5,000` if the final spread is `$15,000`; a short earns the inverse. This removes a direct binary outcome payoff, but not every form of probability exposure. Event probability still changes the estimator weights, error amplification, observation eligibility and the chance of a void settlement.

A deployable contract also needs finite settlement bounds, a multiplier, margin or fully collateralised scalar tokens, and explicit treatment of invalid source markets. An unbounded linear claim on an unbounded asset cannot be fully collateralised by a fixed deposit.

## Observation and settlement rules

The probability band excludes regimes where a small source-price error is heavily amplified. It should not substitute for an execution-quality rule. Each observation needs an error and manipulation bound derived from executable depth, spread, source disagreement and the impact future's open interest and maximum payoff.

The window rule should tolerate re-entry rather than freezing at an obsolete excursion. One implementation is:

- enter the eligible regime only after probability and market quality remain inside their thresholds for a dwell period;
- exit only after a sustained breach of a wider outer threshold;
- if the event resolves in an eligible regime, end the window at resolution;
- otherwise end it at the start of the final sustained exit; and
- require a contiguous eligible window, rather than joining observations from different market regimes.

If the required window is unavailable, the contract follows a predeclared void or neutral-settlement rule. “Refund” is not enough for a traded future because participants entered at different prices.

The probability band is a design parameter, not a universal 5% to 95% constant. A wider band is justified only when observed source-market precision supports the larger amplification. Better tail-market capital efficiency can make that possible, but the collateral design must preserve the claims used in the oracle identity.

## Tail-event collateral does not come for free

Fully collateralising each event fragments capital across many low-probability markets. The [pooled design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) reduces this lockup by changing the claims: if several bundled events occur, each corresponding YES token pays `1 / winner_count`. Its YES price is therefore not the marginal probability of that event, and a pooled conditional asset claim is not an ordinary full-payoff conditional claim. The binary decomposition used above cannot be applied to it unchanged.

A compatible tail-market design must preserve full-payoff event and conditional claims. Portfolio margin can do this when joint outcomes are logically restricted. [Insurance-backed issuance](https://distbit.xyz/insured-prediction-market-minting/) can add one-sided supply across non-exclusive events, but then capital efficiency comes from accepting a bounded provider-default risk in omitted or underfunded joint tail states. It is insurance, not deterministic collateral compression.

Either approach can support a wider probability band only after live depth, spreads and derived-estimator error improve enough to pass the oracle threshold. The mechanism does not make extreme prices accurate by assumption.

## Event-conditional impact futures

The separate future can itself pay only if a chosen branch occurs. This is useful when a hedger suffers a loss only in that branch. A DeFi treasury could short a depeg-conditional spread future and receive more when the market's estimated depeg effect becomes more negative.

The position costs fewer dollars because its payoff is also contingent on the event. It does not provide the same unconditional protection with less capital. Its mark-to-market value depends directly on event probability, so it is unsuitable for a trader seeking outcome-independent spread exposure.

## A two-instrument anchored alternative

Another design mixes the self-referential spread with an outcome-dependent anchor. Fix an independent `anchor_probability` at one snapshot. An anchor that pays `spot / anchor_probability` after YES and `-spot / (1-anchor_probability)` after NO has expected value equal to the scenario spread at that snapshot, under the same pricing assumptions.

A positive anchor weight can remove the constant fixed-point multiplicity. It does not guarantee that the resulting unique equilibrium equals the evolving scenario spread. Once event probability moves away from the snapshot, the anchor's expected value changes with it. The design therefore trades a third instrument for snapshot dependence, outcome variance, larger collateral needs and a manipulation-sensitive probability input.

## Decision markets

Long-running event markets create the clearest use case because unrelated asset moves can dominate an ordinary conditional position over months. Decision markets can keep trading periods short. [MetaDAO's current process](https://docs.metadao.fi/governance/markets) uses three days.

Short duration reduces common-factor variance; it does not turn an asset-level position into a spread position. An unhedged conditional trade approximates spread exposure only when the expected common move and cross-market basis during the holding period are small relative to the expected correction in the conditional price. When those conditions fail, a separate spread future can isolate the final pre-decision market estimate.

It still cannot observe the unrealised branch after the decision, establish causal impact, or solve decision-selection bias. Those are separate identification and mechanism-design problems.

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20).

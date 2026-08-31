---
layout: page
title: "Actually impact futures"
description: "A separate derivative on the final pre-resolution market-implied spread between event-conditioned asset prices."
permalink: /actually-impact-futures/
---

# Actually impact futures

## Conditional futures

A prediction market prices whether an event will happen. A conditional market prices another asset or metric in the world where that event does or does not happen.

Consider “Republicans lose control of Congress in the next US midterm elections.” A pair of Bitcoin conditional markets might price Bitcoin at `$110,000` if Republicans lose control and `$100,000` if they retain it. The `$10,000` difference is useful even to someone with no view on which outcome is more probable.

Conditional markets already exist. [MetaDAO](https://docs.metadao.fi/governance/markets) runs pass and fail markets whose trades revert when their condition is not selected. [Proof](https://www.proof.trade/) describes event-conditioned markets where the matching branch converts into perpetual exposure and the other unwinds.

Throughout, `price_yes(t)` and `price_no(t)` are branch-normalised forecasts at a common horizon. Assume the conditional claims and the spot-adjusted or maturity-matched base use the same numeraire, discounting and carry, so the base price is their probability-weighted average.

## What the instrument would price

The market-implied scenario spread is:

`spread(t) = price_yes(t) - price_no(t)`

This is an association between two priced scenarios, not a causal effect by construction. A common cause can both change the event probability and move Bitcoin. Absent such confounding, sufficient liquidity should make the spread close to the price impact eventually incorporated into spot, since the same informed traders can trade on the same information in both markets.

The product settles to the market's estimate near the event, not to an objectively scored counterfactual. A trader is rewarded for anticipating the final pre-resolution market estimate. They are not rewarded merely for being right about an effect the source markets never price.

The payoff unit is also a product choice. An absolute-dollar spread matches the loss on a fixed number of BTC and is useful for hedging. A percentage spread such as `price_yes / price_no - 1`, or a log-price difference, is likely more useful for speculation when unrelated asset moves act multiplicatively. If both conditional prices double for an unrelated reason, the dollar spread doubles while the percentage and log spreads remain unchanged.

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

## Observation and settlement rules

The probability band excludes regimes where source-price errors are heavily amplified. An observation is eligible only while the probability and source markets satisfy the band and execution-quality requirements. `spread_TWAP` uses the most recent 24 cumulative eligible hours before resolution. Ineligible periods are skipped, and later eligible observations after re-entry displace earlier ones rather than leaving the window frozen at an obsolete exit.

The probability band is a design parameter. The portfolio-insured design below can support a wider band than separately collateralised markets if its claims produce measurably better prices near the extremes.

## Portfolio-insured collateral for improbable events

The [pooled design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) illustrates the problem with pooling rare branches directly. If several bundled events occur, each triggered YES token pays `1 / winner_count`. Its raw price is therefore not the probability of that event, a conditional market collateralised by it inherits the same multiplicity exposure, and the bundle cannot settle until its final winner count is known. These claims cannot enter the ordinary binary oracle unchanged.

Instead, [portfolio-insured minting](https://distbit.xyz/insured-prediction-market-minting/) keeps each event branch as an isolated binary claim and moves diversification to an insurance provider's balance sheet. The provider issues undercollateralised YES claims across a risk-assessed portfolio. Each claim pays one dollar if its own branch occurs and zero otherwise, regardless of other outcomes, so different event markets can resolve independently.

The conditional-asset market remains separate and uses the insured branch claim as collateral. The impact oracle takes `p_yes(t)` from the event claim's executable secondary-market price, not the provider's fee-inclusive mint quote. Because the branch claims retain standard payoffs, the ordinary binary decomposition applies without a `winner_count` adjustment.

Across a portfolio, insured minting can supply these claims without locking a separate fully collateralised dollar behind every low-probability branch. The same provider capital can support more event-market supply and more branch collateral for corrective positions in the separate conditional markets. The resulting depth can improve both inputs to the impact oracle, support a wider probability band, and raise the cost of manipulation.

## Event-conditional impact futures

The impact future itself can also be conditional on the selected event branch. It uses the same branch-token type as collateral and settlement numeraire as the corresponding conditional asset market. If the branch occurs, a long earns `spread_TWAP - entry_price` and a short earns the inverse. If the complementary branch occurs, the branch token and both impact positions pay zero.

This structure suits hedgers who face a loss only if the event occurs. A DeFi treasury that expects ETH to be lower in the depeg scenario than the market implies could short the depeg-conditional impact future. A more negative spread increases the short's payoff, and the hedge pays only if the depeg occurs.

Because an improbable branch token is worth less in dollar terms than unconditional collateral, the trader can fully collateralise the position in branch tokens without locking the same dollar value. The design also avoids introducing another collateral-token type. It still requires a separate impact market, and tokens locked in one market cannot simultaneously collateralise another.

The trade-off is renewed exposure to event probability: the position's dollar price reflects both the expected spread and the chance that the branch occurs. It is therefore less suitable for traders who want outcome-independent spread exposure.

## A two-instrument anchored alternative

Another approach keeps the original two outcome instruments and anchors part of their terminal spread to a realised payoff. The numerical `anchor_probability` is not fixed when the instrument opens. The oracle reads it once from the final eligible pre-resolution observation in the independent event market, using the same probability band and market-quality requirements as `spread_TWAP`. It then reads `anchor_spot` once at the first predefined observation immediately after resolution, minimising unrelated movement while allowing the event to affect the asset price. Neither input is continuously reset.

The realised anchor pays `anchor_spot / anchor_probability` after YES and `-anchor_spot / (1-anchor_probability)` after NO. At the probability observation, its expected value is `price_yes - price_no`. Sampling spot at that pre-resolution observation instead would make the spot already known and the anchor's expected value zero.

Set the terminal YES-minus-NO spread to:

`(1-anchor_weight) * spread_TWAP + anchor_weight * realised_anchor`.

Under simple no-arbitrage pricing, any positive `anchor_weight` makes the conditional spread the unique fixed point, so no third instrument is required.

The anchor reintroduces outcome risk. A larger weight reduces the influence of the self-referential TWAP and corrects mispricing more strongly, but increases payoff variance and collateral requirements. A smaller weight more closely preserves the original outcome-independent payoff but provides a weaker practical anchor. Restricting the probability input to eligible observations also prevents inverse-probability payouts from being calculated in the excluded extreme-probability regimes.

## Decision markets

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders and hedgers plausibly desire impact exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.

Decision markets have a different timing constraint. The mechanism chooses when to make the decision, so it can keep the trading period brief. [MetaDAO's current process](https://docs.metadao.fi/governance/markets) uses three days. A shorter period reduces the probability that unrelated asset-price shocks occur while the trader holds the position and concentrates the proposal-related signal relative to other sources of volatility.

Fast decision markets work best when traders can react quickly and expect the market to incorporate their information quickly. AI agents can make this more practical because they can monitor, analyse, trade, and update quotes with lower latency than human-only markets.

Under those conditions, a trader can take an unhedged position in whichever conditional market they believe is mispriced, going long if its price is too low or short if it is too high. The brief trading period makes a material unrelated move in the underlying asset unlikely, so hedging with the other branch is unnecessary. The position therefore approximates impact exposure because its PnL should mainly reflect correction of the conditional price rather than unrelated spot movement.

This approximation fails when the market needs a long time to understand why a trader acted. A trader may need to hold the position beyond the intended decision time before other participants price in the information that led them to trade. During that delay, interest rates, market-wide volatility, or asset-specific news can dominate the trade's PnL and make the original information trade less attractive.

Impact futures do not solve slow post-decision information incorporation. They depend on live conditional prices and therefore end when the decision is made and one branch becomes unrealised. They cannot continue providing isolated exposure to the scenario spread after the decision.

Impact futures therefore have no clear role in a decision market when a short market duration is feasible. They become useful if the market must remain open long enough for unrelated asset volatility to become material, for example because traders react slowly, proposals require extended evaluation, or liquidity develops gradually. They isolate the conditional spread during that longer pre-decision period. They do not solve decision-selection bias or make the unrealised outcome observable after the decision.

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20).

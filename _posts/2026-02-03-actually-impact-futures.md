---
articleUrl: https://distbit.xyz/actually-impact-futures
author: distbit
category: blog
date: 2026-02-03 00:00
description: ''
gist_url: https://gist.github.com/1906750660be85a0f69290899104bb11
headerImage: false
hidden: false
layout: post
live: false
published: true
tag: []
title: Actually impact futures
---




# (Actually) impact futures  

## Event-conditional futures  

A prediction market prices which of several mutually exclusive outcomes a question will resolve to. An event-conditional market asks what another asset or metric will be worth under each outcome.  

Consider the next US midterm elections, with two relevant outcomes. A pair of Bitcoin conditional markets could price:  

- the expected Bitcoin price under outcome A, in which Republicans lose control of Congress; and  
- the expected Bitcoin price under outcome B, in which they retain control.  

If the two conditional prices are `$110,000` and `$100,000`, the market is pricing a `$10,000` difference between those two possible political outcomes.   

Several platforms have offerings which permit trading in markets conditional on different event outcomes. [Butter](https://butter.markets/) has previously deployed such markets while [Proof](https://www.proof.trade/),  [if.market](https://www.if.market/), [Lightcone](https://lightcone.xyz/), and [Branchpoint](https://www.branchpoint.xyz/) are building or piloting similar markets. [MetaDAO](https://docs.metadao.fi/governance/markets) applies the design specifically to governance proposals.  

The article assumes a separate asset-futures market for each outcome, collateralised by claims that pay `$1` only if that outcome occurs. The future associated with the realised outcome settles at the asset's nominal price, while the other becomes worthless. Throughout, `price_a(t)` denotes the asset-futures quote conditional on outcome A at observation time `t`; `price_b(t)` denotes the corresponding quote conditional on outcome B.   

## What an impact future is and why it is useful  

An impact future is a derivative whose underlying is the market-implied event spread: the difference between the asset's conditional prices under two outcomes. This spread is used here as the event's impact estimate:  

`impact(t) = price_a(t) - price_b(t)`  

For the instruments developed here, the two direct financial uses are hedging and speculation.  

For hedging, consider someone who holds one Bitcoin and wants their payoff to be independent of the election outcome. Let the terminal event spread be `terminal_impact`. One minimal hedge is to short one unit of a full-spread contract conditional on outcome A. The holder's payoff is then:  

- under outcome A, `price_a - terminal_impact`; and  
- under outcome B, `price_b`.  

Because `terminal_impact = price_a - price_b`, both expressions equal `price_b`. Buying one unit of the full-spread contract conditional on outcome B provides the equivalent hedge while making both expressions equal `price_a`. Either position cancels the outcome-contingent difference on the market's pre-resolution estimates. For a larger holding, its size scales with the number of asset units being hedged.  

The hedge is indexed to the market's final pre-resolution impact estimate. If that estimate rises from `$10,000` to `$20,000`, its outcome-contingent payment doubles automatically rather than leaving the holder with a fixed `$10,000` hedge. This keeps the protection aligned with the market-implied welfare difference between outcomes without requiring the holder to keep resizing it.  

For speculation, an outcome-independent impact future gives direct exposure to changes in the spread. Suppose the market prices Bitcoin at `$110,000` under outcome A and `$100,000` under outcome B. A trader who expects the spread to rise from `$10,000` to `$15,000` can trade that view without also taking a position on Bitcoin's full price level. A Bitcoin movement that adds the same amount to both conditional prices cancels from the spread.  

The event spread is a market-implied comparison between outcomes, not by itself an identified causal effect. It measures the price difference traders expect the asset market to reflect near the event.  

### Example applications  

Impact futures are most useful when an event remains unresolved for long enough that its estimated impact changes while unrelated asset-price movements obscure that signal. Examples include:  

- **Concentrated company exposure:** employees and founders can hedge the event-specific component of their equity and human-capital exposure without selling their general exposure to the company.  
- **Customer and supplier concentration:** a business can hedge the effect of losing a major customer, suffering a supplier failure, or having an important contract renewed or cancelled.  
- **Mergers and acquisitions:** shareholders can trade the effect of approval, prohibition, or revised terms on the target, acquirer, competitors, and suppliers without taking general market exposure.  
- **Clinical development:** investors can isolate how a trial result or drug approval affects its sponsor and competing treatments rather than combining that view with the event's probability.  
- **Litigation and regulation:** shareholders, creditors, and affected businesses can hedge the estimated effect of a court judgment, patent ruling, licence decision, or regulatory classification.  
- **Protocol and infrastructure events:** tokenholders can hedge a protocol upgrade, governance proposal, stablecoin depeg, bridge failure, exploit, or restoration of exchange withdrawals while retaining their other crypto exposure.  
- **Labour and supply-chain disruptions:** firms can hedge the effect of a strike, port closure, export restriction, factory outage, or shipping-chokepoint disruption on their assets or input prices.  
- **Political and macro events:** traders can isolate how elections, governing coalitions, tariffs, sanctions, central-bank decisions, or ceasefires affect currencies, bonds, commodities, or sector portfolios.  
- **Adaptive contingent claims:** acquisition consideration, insurance cover, and project-finance protection can scale with the market's changing estimate of a milestone or adverse event's economic effect instead of fixing the amount in advance.  
- **Risk and resilience mapping:** trading the same event against many assets can identify expected winners, losers, contagion channels, and which firms or protocols are most resilient to a common shock.  

## Why prediction-market positions require rebalancing  

An ordinary prediction-market position can approximate the hedge by fixing a payment for one outcome. After observing a `$10,000` event spread in the conditional markets, a holder of one Bitcoin could short `10,000` outcome-A claims or buy `10,000` outcome-B claims, assuming each claim pays `$1`.   

Standard conditional markets are therefore highly complementary with event markets even when the expected impact is stable enough that a fixed event-market position requires little rebalancing. The event market supplies the outcome-contingent payment, while the conditional spread supplies a market-informed hedge ratio for a given amount of asset exposure. Without that spread, the holder must guess the event's expected impact or infer it from historical co-movement between the asset price and outcome probability. The latter is noisy; when the expected impact changes, it is also backward-looking and cannot reflect the revision until it appears in enough new joint price history.  

The required number of claims changes with the impact estimate, not with outcome probability alone. If the position remains sized for a `$10,000` spread after the estimate rises to `$20,000`, it leaves `$10,000` of residual outcome exposure. This difference between the current exposure and the fixed hedge amount is the hedge's rebalancing basis.  

Probability changes while the impact estimate remains stable require no rebalance and create no such basis. Impact changes at a stable probability can be corrected at roughly unchanged prediction-market prices, so the basis can be kept small at little cost apart from spreads, fees, and the delay before the trade. The prediction-market substitute becomes less effective when the impact estimate and outcome probability change together: the required hedge amount changes while the price of correcting it also changes. Its rebalancing cost and risk therefore depend on impact turnover and how strongly impact changes coincide with probability changes.  

This approach is adequate when impact volatility is small, or when material impact revisions occur during periods of low probability volatility. Impact estimates can remain volatile when an election's expected policy consequences change with projected governing margins, a court case's expected remedy changes during proceedings, or analysis of a protocol proposal reveals a bug or previously missed economic interaction.  

An impact-indexed contract removes this rebalancing basis at settlement by adjusting its payment with the spread. It also gives speculators a direct way to profit from forecasting the impact estimate, allowing them to supply the other side of trades demanded by hedgers.  

## Why ordinary conditional futures do not provide this exposure  

An ordinary conditional asset future has a different underlying: the asset's price under one outcome, not the difference between its prices under two outcomes. Combining ordinary conditional futures therefore does not reproduce an impact future's exposure.  

Suppose a trader goes long the asset through a future conditional on outcome A and shorts an equal amount through one conditional on outcome B. Only the future associated with the realised outcome settles, while the other settles to zero. The pair therefore pays `+settlement_spot` under outcome A and `-settlement_spot` under outcome B, rather than the pre-resolution spread `price_a - price_b`. Its value depends on which outcome occurs and on the asset's full price level. It consequently neither isolates the event spread for speculation nor cancels an asset holder's outcome-contingent value difference while preserving their other price exposure.  

The trader can exit before resolution, but the position remains exposed to changes in outcome probabilities and to asset-price movements unrelated to the event until it is closed. For a long-running election market, a Bitcoin move caused by interest rates, regulation, or macro conditions can dominate the PnL of a trader who only intended to speculate on the event spread.  

Nor does pairing one conditional future with spot solve the problem. A trader might buy the asset in the outcome-A conditional market and short an equal amount in the spot market, but the resulting difference, `price_a - spot`, still does not isolate the event spread. Let `probability_a(t)` be the market-implied probability of outcome A. Under the pricing assumption used throughout this article, spot reflects the probability-weighted average of the conditional prices:  

`spot(t) = probability_a(t) · price_a(t) + (1-probability_a(t)) · price_b(t)`.  

It follows that:  

`price_a(t) - spot(t) = (1-probability_a(t)) · (price_a(t) - price_b(t))`.  

The multiplier `(1-probability_a(t))` collapses as outcome A approaches certainty. The conditional-to-spot difference therefore approaches zero even if the counterfactual spread between outcomes A and B remains large.  

## Is this relevant to futarchy (decision-markets) or only to passive event markets?  

The three broad applications of event-related markets are speculation, hedging, and information production for decisions, often called InfoFi. The preceding sections principally concern speculation and hedging. Impact futures are more applicable to those financial uses than to InfoFi.  

Long-duration event markets create the clearest demand for impact futures. An election, court judgment, war, or protocol upgrade may remain unresolved for months. Traders may want event-spread exposure during that period, while unrelated moves in the underlying asset add noise to an ordinary conditional position.  

In the decision-market form of InfoFi, markets can instead use a sufficiently short trading interval and read the conditional comparison at the decision cutoff. MetaDAO, for example, describes a three-day conditional trading period. Over a short enough interval, exogenous asset-price movement is negligible relative to proposal-related repricing, so a trader can simply take an unhedged position in the conditional market they believe is wrong. Ceteris paribus, AI agents make this approximation more practical by analysing information and updating prices faster.  

Under those conditions, a dedicated impact future has no clear role. It becomes useful if evaluation must remain open long enough for unrelated asset movement to become material. It isolates the event spread during that longer pre-decision period, but it cannot continue after the decision makes one outcome unrealised, hence can not provide traders with proposal-specific exposure beyond the decision deadline.  

## The first design: make both outcome legs settle  

The first impact-futures design tried to turn the paired conditional-asset trade into an outcome-independent spread position without creating a third derivative. A trader would go long the asset future conditional on outcome A and short the asset future conditional on outcome B. If both legs retained a terminal value under either outcome, their difference could equal the event spread regardless of the resolution. This would support speculation on the spread, but not hedging: the pair would have the same directional payoff under both outcomes rather than offsetting the asset holder's gain in one and loss in the other.  

Let `endogenous_spread_TWAP` be a pre-resolution time-weighted average of:  

`price_a(t) - price_b(t)`.  

The proposed settlement rule was:  

- under outcome A, settle the A leg to `settlement_spot_a` and the B leg to `settlement_spot_a - endogenous_spread_TWAP`;  
- under outcome B, settle the B leg to `settlement_spot_b` and the A leg to `settlement_spot_b + endogenous_spread_TWAP`.  

The leg matching the realised outcome is anchored to that outcome's observed spot price. Because the other outcome is not observed, the design assigns its leg a synthetic value offset by the spread. The two legs therefore cease to be ordinary conditional futures: each has a terminal value under both outcomes. For example, suppose Bitcoin settles at `$110,000` if A occurs and at `$100,000` if B occurs, consistent with a `+$10,000` spread. Under A, the A leg is anchored to `$110,000` and the B leg is assigned `$100,000`. Under B, the B leg is anchored to `$100,000` and the A leg is assigned `$110,000`. The A-minus-B position is worth `+$10,000` in either case.  

## Why the first design is circular  

The design defines `endogenous_spread_TWAP` from the pre-resolution spread between the A and B prices. It then uses that average to determine the terminal values of those same two claims. The prices determine the average, while the average determines the values that the prices anticipate.  

Suppose traders coordinate on an expected spread of `$10,000`. The settlement rule then gives the two claims a `$10,000` terminal spread, which validates prices with a `\\(10,000` spread, so the oracle reports an `endogenous_spread_TWAP` of `\\)10,000`.  

The same loop works for `$5,000`, `$20,000`, or any other feasible constant spread. Each expected value can make itself correct because the settlement rule turns that expectation into the claims’ terminal payoff difference. Nothing outside the two markets selects one of those values as the event spread.  

The design therefore has many self-consistent fixed points rather than one market-discovered value. Making both legs settle in both worlds solves the outcome-dependent payoff problem only after the spread is known; it does not provide a non-circular way to determine it.  

## An independent impact-spread index from conditional markets  

An oracle can derive an event-spread index from independently settled conditional markets. It uses spot, outcome probability, and whichever conditional quotes are available. These quotes are forward-looking market prices for the quantity being indexed. Unlike a mechanical estimate from a short series of probability and spot changes, they aggregate traders' forecasts without requiring settlement to extract the spread from a small number of observations. Their main practical cost is the need to create and maintain a separate sufficiently liquid conditional-asset market for each event.  

If the outcome-A conditional price is used, its implied event-spread estimate is:  

`outcome_a_implied_spread(t) = (price_a(t) - spot(t)) / (1-probability_a(t))`.  

If the outcome-B conditional price is used, its estimate is:  

`outcome_b_implied_spread(t) = (spot(t) - price_b(t)) / probability_a(t)`.  

Under the pricing identity above, these are two estimates of the same event spread. When both quotes are available, the oracle always combines the estimates according to a disclosed rule that weights their relative reliability. If only one quote is available, the oracle can use an impact estimate derived from that quote, spot, and probability.  

Probability error amplification is the primary trade-off. Suppose `probability_a = 5%` and the true event spread is `\\(10`. The difference `spot - price_b` is only `\\)0.50`, so the outcome-B-derived estimate recovers `$10` by dividing by `0.05`. A `$1` error in either input therefore becomes a `$20` error in the estimated spread.  

The outcome-A calculation has much less amplification: `price_a - spot` is `$9.50`, and dividing by `0.95` again produces `$10`, while a `$1` input error changes the estimate by only about `$1.05`. Its weakness is the source market. A claim paying `$1` under the 5% outcome is worth only about `$0.05`, so the same nominal liquidity commits much less economically valuable capital than it does under the 95% outcome. This makes the quote less robust. The reliability weighting balances the economic value of each source market's liquidity against the error amplification in its estimator. Its exact specification is out of scope.  

The baseline accepts observations only while `probability_a(t)` is between `minimum_probability` and `maximum_probability`. This is the permitted probability band. The band excludes near-extreme probabilities because event-market prices can become unreliable there and therefore unsuitable for impact settlement. An eligible observation samples probability, spot, and at least one conditional quote at the same timestamp while probability is within that band.  

The oracle uses the most recent `observation_duration` of cumulative eligible time before resolution. Ineligible periods are skipped, and later eligible observations after re-entry displace older ones. If the eligible time totals less than `observation_duration`, contracts using the index refund. The exact safeguards governing disconnected or stale observations remain implementation details to be worked out.  

Define `impact_TWAP` as the pre-resolution time-weighted average of the combined implied spread over that eligible observation window.  

## A self-contained index from event beta  

Conditional-asset quotes are not the only possible independent input. An oracle can instead estimate impact from joint changes in the event probability and the spot price. Over a short interval in which the two conditional asset values remain stable, the spot-pricing identity implies:  

`change_spot(t) ≈ event_impact(t) · change_probability_a(t)`.  

The slope of that relationship can be estimated as:  

`event_beta = covariance(change_probability_a, change_spot) / variance(change_probability_a)`.  

Beta, rather than correlation, is the relevant quantity because it retains units of asset-price change per unit probability change. This index requires an event-probability market and a spot oracle, but no separate conditional-asset market. It can therefore supply the settlement input for both unconditional speculative claims and outcome-conditional hedging claims when creating liquid conditional-asset markets would be uneconomic.  

This estimate is associational. It recovers the event spread insofar that the observed correlation regime persists and the probability and spot observations are synchronised. A market settlement rule that reduces random variance cannot remove bias caused by violations of these assumptions.  

### Freshness versus measurement variance  

A longer beta window contains more observations and reduces sampling variance, but it estimates the time-weighted average relationship across the regimes in that window. It is not a market forecast of the relationship that will prevail near resolution. If traders anticipate a change in the beta regime as the event approaches, a precisely measured historical beta can still be systematically wrong for the event spread they want to trade.  

A short window close to resolution better targets the event-specific regime, but contains fewer probability changes and gives unrelated spot movements more influence. This creates a measurement-level bias-variance trade-off: freshness reduces historical-regime bias while increasing random manipulation-induced bias and noise-induced measurement variance. The settlement rules described below can reduce the effect of this noise-induced variance, allowing the index to rely more heavily on fresh observations and less on data from older, less relevant regimes. Whether an implementation measures beta using the final resolution jump, a short pre-resolution beta window, or a disclosed combination is out of scope.  

## Variance-reduced settlement from forecast errors  

The event beta can determine settlement directly, but that transmits all of its measurement noise into the payoff. It can instead act as an external error signal for the impact market's own forecast. Let `market_impact_TWAP` be the pre-resolution full-spread estimate implied by the impact claims themselves. Together with the pre-event spot and probability, it implies the following branch forecasts:  

`forecast_price_a = pre_event_spot + (1-probability_a) · market_impact_TWAP`.  

`forecast_price_b = pre_event_spot - probability_a · market_impact_TWAP`.  

If outcome A occurs, define `oriented_forecast_error` as `settlement_spot - forecast_price_a`. If outcome B occurs, define it as `forecast_price_b - settlement_spot`. The reversed sign under B makes a positive error mean that `market_impact_TWAP` understated the spread under either outcome.   

Suppose outcome A has 90% probability, pre-event spot is `\\(100`, and `market_impact_TWAP` is zero. If the true conditional values are `\\)101` under A and `$91` under B, their probability-weighted average is `$100` and their spread is `$10`. The oriented forecast error is `$1` under A and `$9` under B. The following rules allocate that error differently.  

### Choosing the correction rule  

Full statewise correction divides the A error by `1-probability_a` and the B error by `probability_a`, producing the direct resolution-jump beta. In the example, the A settlement correction is `$1 / 10% = $10`, while the B correction is `$9 / 90% = $10`. Either outcome therefore produces the correct impact in conditional expectation.  

When A was already 90% likely, its resolution increases its probability by only 10 percentage points, from 90% to 100%. A `$10` error in the estimated impact therefore appears as only a `$1` error in the predicted A-conditional asset price: 90% of A's effect was already incorporated into spot. To recover the full `$10` spread error from that `$1` observation, the statewise rule divides it by the remaining 10% probability change.  

The division also scales unrelated movements. If news, noise, or manipulation adds another `$1` to the observed A price, the inferred impact becomes `$20` rather than `$10`: the extra `$1` becomes a `$10` impact-estimation error under the outcome that occurs 90% of the time. Under B, the same `$1` of noise changes the estimate by only about `$1.11`, because the observed price delta is divided by a 90-percentage-point probability move. Statewise correction supports an outcome-specific hedge, but gives the greatest leverage to the common outcome's lowest-signal observation.  

Reliability-weighted unconditional correction instead divides the A error by `probability_a` and the B error by `1-probability_a`. In the example, settlement is corrected by about `$1.11` under A and `$90` under B, whose probability-weighted average is `$10`. This shifts leverage away from the small, relatively noisy price delta observed when an already-likely outcome resolves. When absolute residual noise is equal across outcomes and the market TWAP is close to the target, this weighting minimises the additive-noise contribution to ex ante variance among linear rules whose unconditional expected settlement equals the target impact.  

Probability is only one reliability heuristic. Liquidity, observed volatility, oracle dispersion, and time synchronisation can imply different weights. The contract must specify its rule in advance rather than derive a weight from the realised error magnitude. Even with an appropriate rule, reliability weighting creates rare, extreme settlements and does not make each outcome's conditional expected settlement correct. It is therefore better suited to an unconditional speculative claim than to a hedge that depends on accuracy in one specified outcome.  

Unweighted low-gain correction adds `oriented_forecast_error` directly to `market_impact_TWAP`, without dividing it by either probability:  

`terminal_impact_index = market_impact_TWAP + oriented_forecast_error`.  

In the example, the correction is `$1` under A and `$9` under B, so its expected value is only `$1.80`. More generally:  

`expected_correction = 2 · probability_a · (1-probability_a) · (true_impact - market_impact_TWAP)`.  

This rule does not make settlement's conditional or unconditional expected value equal the correct impact whenever the market TWAP is wrong. It instead gives the market a low-gain external error signal without amplifying random oracle noise or creating deliberately extreme tail corrections. Under the pricing assumptions above, it still makes the true impact the unique frictionless fixed point while both outcomes have nonzero probability, although market frictions can overwhelm the weak alignment incentive near extreme probabilities.  

A related [self-resolving prediction market design](https://arxiv.org/abs/2306.04305) could settle to the market's own TWAP in most cases and directly to the noisy external calculation in randomly selected cases. That also adds an external anchor, but concentrates the oracle's variance in the selected settlements. The unweighted rule instead uses the external observation every time at low gain, spreading its influence across all settlements without rare full-oracle resolution. This comparison assumes that obtaining the external observation for every settlement is feasible.  

The choice is therefore between statewise accuracy with common-state noise amplification, exact unconditional anchoring with rare tails, and low-variance partial anchoring. No rule simultaneously guarantees exact expected-value anchoring, low ordinary variance, and limited rare-state corrections.  

These rules reduce non-adversarial measurement noise; they are not manipulation-resistance mechanisms. A manipulator can influence `market_impact_TWAP` and may also influence the probability or spot inputs. The choice of oracle safeguards remains a separate problem.  

## Deriving the unconditional impact future  

An unconditional impact future is a claim that settles to `terminal_impact_index` whichever outcome is realised. It provides a direct way to speculate on the direction and magnitude of the market-implied event spread, but is not useful for transferring the outcome-contingent risk described above.  

The instrument does not need its own market. A wrapper can bundle matched same-direction positions in the two outcome-conditional impact claims. Exactly one claim pays after resolution, so a long bundle settles to `terminal_impact_index` under either outcome. A short bundle has the inverse payoff. The sum of the two claims' contemporaneous quotes supplies the full-spread market estimate used to calculate `market_impact_TWAP`. This creates the unconditional instrument and its quote from the contracts already used for hedging; a separate order book would duplicate the same payoff and split liquidity across markets.  

## The capital-efficiency limitation  

Regardless of its index, a hedge still uses outcome-conditional impact claims. Under full collateralisation, the two claims for one event can share collateral, but that collateral cannot back claims for other events. A self-contained beta index removes the need for liquid conditional-asset source markets, not this collateral requirement.  

This is especially costly for rare events with large potential impact, such as a stablecoin depeg, protocol exploit, or material court judgment. A claim with one dollar of maximum payout still locks one dollar when its outcome trades at five cents; ten such markets lock ten dollars even though few are expected to pay.  

## Portfolio-insured collateral for low-probability outcomes  

The [shared-collateral design for highly improbable events](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) illustrates the problem with pooling claims for rare outcomes directly. If several bundled rare outcomes are realised, each associated token pays one divided by the number realised. Its raw price is therefore not the probability of its associated outcome, a conditional market collateralised by it inherits the same multiplicity exposure, and the bundle cannot settle until every included question has resolved. These claims cannot enter the ordinary two-outcome oracle unchanged.  

Instead, [portfolio-insured minting](https://distbit.xyz/insured-prediction-market-minting/) keeps each outcome claim isolated and moves diversification to an insurance provider's balance sheet. The provider issues undercollateralised claims for selected low-probability outcomes across a risk-assessed portfolio. Each claim pays one dollar when its market resolves to its associated outcome and zero under the alternative outcome, regardless of resolutions elsewhere, so different markets can resolve independently.  

Portfolio-insured outcome claims can collateralise the outcome-conditional impact claims and, in the conditional-market index design, the conditional-asset source market; the self-contained design does not require the latter. The impact oracle takes `probability_a(t)` from the secondary-market price of the outcome-A claim, not the provider's premium-inclusive mint quote. Because the claims retain standard payoffs, the ordinary two-outcome decomposition applies without the cross-market multiplicity adjustment required by the shared-collateral design.  

Across a portfolio, insured minting can supply these claims without locking a separate fully collateralised dollar behind every low-probability outcome. It reduces the capital cost of betting against overpriced low-probability claims and therefore, ceteris paribus, improves their pricing accuracy. It also makes more outcome claims available as collateral for conditional impact contracts and, when used, conditional-asset source markets. These improvements support a wider eligible probability band than the separately fully collateralised design, and reduce hedging costs.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
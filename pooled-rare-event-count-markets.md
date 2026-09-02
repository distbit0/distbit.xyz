---
layout: page
title: "Pooling rare-event prediction markets creates a hidden count bet"
description: "Shared collateral makes rare-event claims depend on how many events occur. A count market prices that hidden exposure and supports fixed-divisor or tranched coverage."
permalink: /pooled-rare-event-count-markets/
---

# Pooling rare-event prediction markets creates a hidden count bet

Prediction markets are expensive to supply near zero or one. Selling a `$1` claim on a one-percent event can lock almost a dollar until resolution for only a small expected return. Repeating that structure across many rare events fragments collateral even when few claims are expected to pay.

[Vitalik Buterin proposed](https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280/) pooling many rare events against one dollar. The design lets one complete set support a `NO TO ALL` token and one token for each rare event. If no event occurs, `NO TO ALL` receives the dollar. If one event occurs, its token receives the dollar. If several occur, their tokens divide the dollar equally.

That pooling creates real capital efficiency. It also turns every event token into a bet on the number of other events that occur. The missing instrument is therefore a market on the winner count.

All pricing equalities below use one common pricing measure and ignore discounting, fees, and risk premia. An underwriter still charges for variance, tail risk, liquidity, and locked capital.

## The pooled token is not a binary event claim

Let `x_i` equal one when event `i` occurs and zero otherwise. Let `K` be the number of events that occur across a basket of `N` events.

In the pooled design, event token `i` pays:

`x_i / K`

when `K` is positive. If only event `i` occurs, the token pays `$1`. If two events occur, each winning token pays `$0.50`. If five occur, each pays `$0.20`.

Its price is therefore:

`b_i = E[x_i / K]`

This is not the event probability `E[x_i]`. A holder is long event `i` and short co-occurrence with every other event. News that raises another event's probability can reduce the token's value even when the probability of event `i` is unchanged.

The dependence also prevents independent early settlement. Paying `$1` when event `i` occurs can exhaust collateral that later has to be shared with other winners. Waiting until every event resolves preserves solvency but keeps capital locked until the basket's last expiry.

## The original prices do not reveal the multiplicity premium

Two baskets can produce identical pooled-token prices while requiring different insurance premiums.

Consider two events, A and B. In the first distribution:

- nothing occurs with probability `0.50`;
- only A occurs with probability `0.25`;
- only B occurs with probability `0.25`.

In the second:

- nothing occurs with probability `0.50`;
- A and B both occur with probability `0.50`.

Both distributions price `NO TO ALL` at `$0.50`. Both price the pooled A and B tokens at `$0.25` each. In the second distribution, each event token pays `$0.50` in the joint state, so its expected payout remains `$0.25`.

The required fixed-payout insurance differs completely. Conditional on at least one event occurring, the winner count is one in the first distribution and two in the second. Topping every winning token up to `$1` costs nothing in the first case and has an expected aggregate cost of `$0.50` in the second.

The pooled claims price who receives the existing dollar. They do not identify how much the winners would receive if each had an independent fixed payout.

## One scalar count market identifies the expected transfer

Add a fully collateralised count claim that pays `K / N`. Let its price be `s`. Its complement pays `1 - K / N`, so one dollar backs the pair. The count price identifies the expected number of winners:

`E[K] = N * s`

Let `z` be the price of `NO TO ALL`. Then `1 - z` is the price of at least one event occurring. The expected number of winners conditional on a non-empty winning set is:

`D_par = N * s / (1 - z)`

This value supplies a par fixed divisor. Replace each realised token's variable payout `1 / K` with the fixed payout `1 / D_par`. Across all winning tokens, the target payout becomes `K / D_par` instead of one dollar. An underwriter receives the surplus when `K / D_par` is below one and pays the shortfall when it is above one.

The aggregate transfer from the underwriter is:

`K / D_par - 1`

whenever at least one event occurs. Its expected value is zero by construction. The count market therefore identifies the expected transfer without assuming that the events are independent or choosing a copula.

This fixed-divisor token is not a standard `$1` binary claim. It pays the same `1 / D_par` whenever its event occurs, regardless of other outcomes. Scaling it to pay `$1` transfers a larger liability to the underwriter.

## A fixed one-dollar payout recreates the insurance problem

Topping every realised event token up from `1 / K` to `$1` costs `K - 1` dollars whenever `K` is positive. The count price identifies the expected top-up:

`expected top-up = N * s - (1 - z)`

That is an expected-loss price, not a solvency rule. Fully collateralising `$1` for every possible winning token requires `N` dollars in the worst case, which is the same terminal collateral requirement as `N` independent binary claims. Using less collateral requires an insurer, margin and liquidation, a recovery waterfall, or an explicit haircut state.

The count market still adds value. It separates the expected cost of multiplicity from the capital and tail-risk charge demanded by whoever bears it. Without the count claim, those quantities are confounded with the original event-token prices.

## A categorical count market prices tranches

The scalar claim reveals `E[K]`, but not the tail of the count distribution. A categorical market over `K = 0, 1, ..., N` supplies that missing information. Let `q_k` be the price of outcome `K = k`.

Suppose coverage guarantees full `$1` payouts while no more than `c` events occur. If more than `c` occur, the basket pays `c / K` to each winner. The insurer's aggregate top-up is:

`min(K - 1, c - 1)`

and its expected loss is:

`sum(q_k * min(k - 1, c - 1))`

over `k = 2` through `N`.

The same categorical prices expose each tail threshold. The price of `K >= r` is the sum of `q_k` from `r` through `N`. An underwriter can quote separate layers for the second winner, third winner, and later winners instead of hiding all multiplicity risk in one fee.

## Permissionless event addition creates adverse selection

A count market prices disclosed beliefs about co-occurrence. It does not make bundle composition safe.

An attacker can propose an event that appears rare but that they privately control or know will occur. They buy its pooled token cheaply, trigger the outcome, and claim part of the shared dollar. Every other winning token receives a larger haircut. The attacker is not only trading against an inaccurate event probability; they are imposing a loss on claims elsewhere in the basket.

A fixed basket, common expiry, explicit inclusion standard, delayed activation, proposer stake, and an underwriter veto can assign this risk. No mechanical formula removes the private-information problem. Permissionless addition must identify who absorbs the loss from a malicious or misclassified event.

## How this differs from Polymarket's current combinatorial products

[Polymarket's negative-risk adapter](https://github.com/Polymarket/neg-risk-ctf-adapter) unifies binary markets when exactly one outcome can resolve true. In count notation, `K` is fixed at one, so multiplicity risk disappears.

[Polymarket Combos](https://help.polymarket.com/en/articles/15458600-what-are-combos) bundle several positions into an all-legs-win claim quoted through a request-for-quote flow. A combo prices one selected joint state. It does not price how many events across a basket resolve true. Polymarket's [deployed combinatorial contracts](https://docs.polymarket.com/resources/contracts) show that combinatorial settlement is now a live product surface, but the count payoff is a different instrument.

The smallest test is a fixed, same-expiry rare-event basket with three visible prices:

- the chance that no event occurs;
- the expected fraction of events that occur;
- the distribution of the total winner count when tail tranches matter.

Those prices make the pooled claims interpretable and let an underwriter quote fixed-divisor or capped coverage. They do not eliminate the trade-off. Shared collateral saves capital by making payouts depend on other outcomes. A count market makes that dependence priced; fixed `$1` payouts still require someone to bear the multiplicity risk.

*Published 2 September 2026. This is a mechanism analysis, not a claim of novelty or deployment readiness.*

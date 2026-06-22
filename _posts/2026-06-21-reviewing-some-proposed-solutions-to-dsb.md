---
articleUrl: https://distbit.xyz/reviewing-some-proposed-solutions-to-dsb
author: distbit
category: blog
date: 2026-06-21 00:00
description: ''
headerImage: false
layout: post
tag: []
title: Reviewing some proposed solutions to dsb
---


 

# Decision selection bias  

Decision selection bias appears when a market both informs a decision and pays conditional on that same decision.  

The price no longer answers "how good is this proposal?" It answers "how good is this proposal in the worlds where the decision rule selects it?"  

Selection is correlated with impact, because the proposal is disproportionately selected in states where the market later learns that it is beneficial. That correlation pushes the price upward.  

## TWAP Timing  

Now add a TWAP. Suppose the market can learn proposal-relevant information during the measurement window. The information can be positive or negative.  

Before it is revealed, the market is in the pre-reveal state. After it is revealed and priced in, the market is in the post-reveal state.  

The bias is in the pre-reveal prices. Before the reveal, traders know that the proposal is more likely to be selected in worlds where the future reveal makes it look good.  

The pre-reveal price is not estimating the proposal's unconditional EV. It is partly pricing the proposal conditional on passing through a future selection filter.  

Post-reveal prices behave differently. Once the relevant information has been revealed, the market can price the proposal using that information.  

If the reveal resolves the relevant uncertainty, the post-reveal price is not biased through this DSB channel. It may be high because the reveal was favorable, but that is an update, not a bias.  

A TWAP is contaminated when it mixes the two regimes. The post-reveal price changes the recommendation, while the pre-reveal price remains inside the average.  

The decision then depends on accurate post-reveal information and stale pre-reveal samples inflated by selection effects.  

## Reset Rule  

A reset rule addresses this by requiring a full TWAP window under one stable recommendation. If the recommendation changes during the window, discard the current TWAP and start over.  

A recommendation change shows that the old TWAP contains pre-reveal prices, exactly the samples that should not select the decision. Post-reveal prices should affect the decision only after they have accumulated for a fresh full window.  

## Residual bias  

That reset reduces DSB by 75%. Without the reset rule, as in ordinary futarchy designs, the two DSB conditions can be satisfied together with probability 100%.  

Information can be revealed late enough that biased pre-reveal prices remain in the TWAP, and early enough that the post-reveal price changes the recommendation before resolution. The same reveal both selects the proposal and leaves the biased pre-reveal samples inside the decision rule.  

With the reset rule, the two conditions work against each other. Suppose a proposer has information about their proposal and can choose whether to reveal it during the TWAP window.  

Because DSB biases the proposal's forecast upward, the proposer has an incentive to maximize the amount of DSB that survives into the final decision.  

Let p be the probability, chosen by the proposer and known to the market, that they reveal recommendation-changing information before the TWAP window ends.  

For example, p = 1/2 means that the proposer reveals the information during the TWAP window only 50% of the time.  

That p creates the DSB component in the pre-reveal price. Before any reveal occurs, traders know there is a p chance that information will arrive and make the proposal look better, causing it to be selected.  

The pre-reveal price incorporates the expected value of that future selection opportunity.  

Under the reset rule, a recommendation-changing reveal has opposing effects. Traders need to believe that a reveal can occur for the pre-reveal price to become selection-biased.  

But if the reveal occurs before the window ends, the TWAP resets and the biased pre-reveal samples are discarded.  

For DSB to survive into the final resolving TWAP, two things have to happen at once:  

- Traders must expect a possible reveal, which occurs with probability p.  
- No recommendation-changing reveal can occur before the window ends, which occurs with probability 1 - p.  

The surviving DSB weight is:  

p * (1 - p)  

This measures how much DSB remains after the reset rule.  

Since DSB benefits the proposer by biasing the proposal's forecast upward, a proposer who wants to exploit DSB chooses the p that maximizes this expression.  

The expression is maximized at:  

p = 1/2  

giving:  

1/2 * 1/2 = 1/4  

The optimal strategy is neither always reveal nor never reveal.  

If the proposer never reveals (p = 0), traders do not expect a future selection event, so there is no DSB.  

If the proposer always reveals (p = 1), traders expect the reveal, but the reveal always triggers a reset, so the biased pre-reveal samples never survive into the final TWAP.  

The maximum surviving DSB occurs in the middle, when the proposer reveals during the TWAP window only 50% of the time.  

Even under the best strategy for a proposer trying to exploit DSB, the surviving DSB weight is only 1/4.  

Equivalently, the reset rule reduces the maximum probability that the DSB conditions are jointly satisfied from 1 to 1/4. That is a 75% reduction in decision selection bias.  

Since DSB is mediated through biased pre-reveal prices, cutting the probability that those biased prices survive into the resolving TWAP from 100% to 25% proportionally reduces the expected DSB component traders price into the market.  

## Complete elimination  

Why does the reset not reduce DSB to zero? The remaining 1/4 case exists because traders can expect a possible recommendation-changing reveal even when no reveal occurs in the resolving window.  

That expectation is enough to bias the pre-reveal price.  

Eliminating that case requires more than resetting the TWAP. The protocol would need to refund or cancel the conditional markets whenever a recommendation-changing reveal occurs during the TWAP.  

Trades made before the reveal would not pay out in reveal worlds, so traders would have no reason to price the pre-reveal market as exposure to those worlds. The selection-contingent component would be removed rather than capped.  

That breaks the usefulness of the market during the TWAP window. Consider the currently lower-priced, losing outcome.  

It can become the selected outcome only if the recommendation changes. If a recommendation change cancels the markets, that outcome has no real path to settlement: whenever it becomes decision-relevant, the market is reverted instead of resolved.  

Its price stops being a reliable estimate of the value of that outcome.  

Refunding on reveal can reduce DSB to zero only by destroying the reliability of the conditional markets. A useful TWAP requires both outcomes to have some chance of eventually settling.  

Resetting the TWAP preserves that property while discarding biased pre-reveal samples whenever a recommendation-changing reveal occurs. That is why this fix reduces DSB by 75%, not 100%.  

An intermediate approach may still be feasible.  

## Stable-Recommendation TWAP  

Operationally, this means using a stable-recommendation TWAP. At each update, compute the recommendation implied by the current market state using the actual decision rule: pass/fail, selected proposal, selected set, or allocation vector.  

Maintain a TWAP accumulator for the current recommendation. If the recommendation is unchanged, keep accumulating.  

If it changes, clear the accumulator, set the new recommendation as active, and restart the clock. The decision resolves only after the active recommendation has persisted for a full TWAP window.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
---
articleUrl: https://distbit.xyz/malicious-futarchy-proposal-strategies
author: distbit
category: blog
date: 2026-05-19 00:00
description: ''
gist_url: https://gist.github.com/db7422f8704b0638eaf9469f1af239cd
headerImage: false
layout: post
live: false
tag: []
title: Malicious futarchy proposal strategies
---




# Malicious Proposal Strategies in Asset Futarchy  

Asset futarchy is hardest to attack when traders can cheaply correct incorrect prices. The proposal strategies below work by weakening that correction mechanism. This is not a comprehensive list of attacks or malicious proposal strategies; it focuses on mechanisms that seem especially relevant to proposal-market correction. Some only help negative-EV proposals. Others also help positive-EV proposals, which makes them more dangerous because they can become normal behavior rather than obvious abuse.  

## Vague Proposal Bluff  

A proposer submits an underspecified proposal, then buys PASS-ASSET.  

This creates adverse selection for skeptics. Selling PASS-ASSET means betting that the proposal is overvalued, but the proposer's vagueness may signal withheld upside. Maybe they are hiding alpha because they want to buy from doubters before revealing details. Maybe the omitted details are weaknesses. The skeptic cannot easily tell.  

This works for both positive-EV and negative-EV proposals.  

A proposer with a positive-EV but incomplete proposal can use vagueness to profit from skeptics: buy PASS-ASSET while others underprice the proposal, then reveal the information later. A proposer with a negative-EV proposal can use the same pattern to blend in with valuable-but-incomplete proposals, reducing the amount of capital willing to countertrade them.  

The weakness is that vagueness is cheap to imitate. If too many negative-EV proposals use it, traders should eventually treat vagueness as negative evidence. The strategy works only while "vague because valuable" remains plausible.  

## (Adversarial) Decision Selection Bias  

Decision selection bias comes from the fact that the market price helps decide whether the proposal executes. If a proposal is more likely to pass in worlds where favorable information arrives, then PASS-ASSET partly prices the proposal conditional on that favorable information.  

A proposer can exploit this by designing a proposal with skewed timing: unresolved catalysts, staged announcements, contingent partnerships, or information expected to arrive during the proposal measurement window. The proposal may be negative-EV unconditionally, but appear positive-EV conditional on passing, because passing is correlated with favorable information arriving in time.  

This applies to both positive-EV and negative-EV proposals, but it is dangerous for different reasons.  

Positive-EV proposals may become more catalyst-driven because that improves passage odds. Negative-EV proposals can use the same structure to pass despite having negative unconditional expected value.  

## Sabotage Commitment  

The proposer commits to making the fail branch worse.  

Example: "If this proposal fails, I will stop supporting the protocol, withdraw liquidity, or otherwise take an action that lowers ASSET's price."  

This can make PASS look better than FAIL even if the proposal itself is negative-EV. The proposal passes not because it creates value, but because rejection has been made costly.  

This works for both positive-EV and negative-EV proposals where two conditions hold: the proposer has a real sabotage vector, and they do not value the reputational cost enough to avoid using it.  

That makes it narrower than the other attacks. New proposers often lack the ability to harm the DAO credibly, and established proposers often care about future business. Still, where the sabotage vector exists, the cost is mostly off-path: if the threat works, the proposer rarely has to carry it out.  

## Knock-In Delivery Buy Wall  

A proposer commits to deliver value only if the market forces them to acquire enough net PASS-ASSET exposure.  

The proposer runs a buy wall that keeps PASS-ASSET above FAIL-ASSET, or above whatever PASS/FAIL spread the decision rule requires. If bearish traders sell PASS-ASSET, the proposer absorbs the flow. If the sell pressure is weak, the proposal can pass without the proposer delivering. If sell pressure is strong, the proposer accumulates enough PASS-ASSET that delivery becomes privately rational. At that point, the earlier PASS-ASSET purchases are no longer wasted manipulation; delivery makes those purchases fair or profitable.  

This is not mainly an adverse-selection attack. It is mechanical reflexivity. Selling PASS-ASSET can trigger delivery. Buying PASS-ASSET too early can prevent delivery by reducing the sell pressure needed to force the proposer over the threshold.  

The strategy is most concerning because it can be attractive even for proposals that would be positive-EV if delivered honestly. Instead of delivering by default, the proposer gets a knock-in obligation: deliver only if the market forces them to internalize enough upside. If no one challenges the proposal, they preserve the option not to deliver.  

The key condition is that the buy wall must be cheaper than delivery until the delivery threshold is reached. Once that condition stops holding, the proposer switches to delivery. This gives the proposer a private cost cap: defend passage without delivering while that is cheaper, then deliver once PASS-ASSET exposure makes delivery rational.  

The buy wall must track the PASS/FAIL spread, not a fixed PASS-ASSET price. Delivery must make the defended PASS-ASSET price justified, not merely less wrong.  

This can be used by any proposal with optional value-creating work, including proposals that are positive-EV if delivered honestly. The harmful version is clearest when the proposal is only positive-EV in the delivery branch. In that case, counter-manipulation either fails to stop passage or helps create the branch where the proposal becomes worth passing.  

## Conditional Exit Squeeze  

A proposer buys enough PASS-ASSET to push the proposal above the passing threshold. The key fact is that selling PASS-ASSET is not just "voting against the proposal." For an ASSET holder, it is a conditional exit from ASSET in the world where the proposal passes.  

That matters because many holders are not choosing between "proposal passes" and "proposal fails" in the abstract. They are choosing between holding ASSET after the proposal passes, or holding USD after the proposal passes. A holder can believe the proposal slightly reduces ASSET value while still preferring the post-passage ASSET exposure to USD.  

Many holders may think:  

"This proposal is slightly negative-EV, but I would still rather hold ASSET after it passes than hold USD."  

So they do not sell PASS-ASSET near the threshold. Their unwillingness to sell is not approval of the proposal. It means the proposal's harm is smaller than their reservation value for staying exposed to ASSET.  

This creates a much thinner supply curve than the spot market cap suggests. The attacker is not buying through the whole market cap. They are buying through the smaller float of holders and traders willing to conditionally exit below the passing threshold.  

The attack works when the proposer's private value from passage exceeds the cost of clearing that conditional float. For example, a proposal that transfers value to the proposer may impose a small loss on every holder, while giving the proposer a concentrated payout. Each holder may rationally refuse to sell PASS-ASSET because the loss is not large enough to justify conditional exit, yet the proposer can profit by buying the limited supply that is available and pushing the market above the threshold.  

This is mainly useful for negative-EV proposals, especially mildly negative ones. If the proposal is strongly negative-EV, more holders prefer USD in the PASS world and sell. If it is only slightly negative-EV, bullish holders may tolerate the harm, leaving too little corrective supply below the pass threshold.  

## Short-Window Squeeze  

This is the simpler version of the conditional exit squeeze.  

Instead of relying on holders' reservation prices, the proposer relies on time. The proposal window is short, attention is scarce, and most holders do not notice or act quickly enough. The proposer buys PASS-ASSET before enough counter-manipulation liquidity arrives.  

This can pass a negative-EV proposal even if holders would have sold PASS-ASSET given enough time. The attack exploits latency in governance attention rather than long-term unwillingness to sell.  

This is mostly useful for negative-EV proposals. A proposer with a positive-EV proposal can also buy PASS-ASSET during a short window, but that is closer to accelerating price discovery than extracting value. The malicious version depends on the market not having enough time to mobilize the correction that would have happened later.  

## Summary  

- Vague proposal bluff: applies to positive-EV and negative-EV proposals.  
- Decision selection bias: applies to positive-EV and negative-EV proposals.  
- Sabotage commitment: applies to positive-EV and negative-EV proposals, but only when sabotage is credible and reputation is not valuable.  
- Knock-in delivery buy wall: applies to proposals with optional value-creating work and enough capital to defend PASS-ASSET until delivery becomes privately rational.  
- Conditional exit squeeze: mainly applies to negative-EV proposals.  
- Short-window squeeze: mainly applies to negative-EV proposals.  

These strategies attack different parts of the correction process. Vagueness makes selling PASS-ASSET feel adverse-selected. Decision selection bias changes what PASS-ASSET is pricing by correlating passage with favorable states. Sabotage changes the fail branch. Knock-in delivery makes selling PASS-ASSET self-negating because enough sell pressure can force the proposer into the value-creating branch. Conditional exit squeeze exploits holders who dislike the proposal but still prefer post-passage ASSET to USD. Short-window squeeze exploits delayed attention. In each case, the failure is not that traders cannot see the proposal market price. The failure is that the trade needed to correct it is made risky, unprofitable, self-negating, or too slow to arrive.  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@distbit0)](https://twitter.com/distbit0) or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
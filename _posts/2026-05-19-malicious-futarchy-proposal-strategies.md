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

Asset futarchy is hardest to attack when traders can cheaply correct incorrect prices. The proposal strategies below work by weakening that correction mechanism. This is not a comprehensive list of attacks or malicious proposal strategies; it focuses on mechanisms that seem especially relevant to proposal-market correction. Some only help -EV proposals. Others also help +EV proposals, which makes them more dangerous because they can become normal behavior rather than obvious abuse.  

By asset futarchy, I mean a governance system where a proposal passes if conditional markets say ASSET will be worth more if the proposal passes than if it fails. PASS-ASSET is ASSET in the world where the proposal passes. FAIL-ASSET is ASSET in the world where it fails. The mechanism need not mean inflating token supply to pay for the proposal; the important feature here is that relative conditional prices decide execution. I use +EV for proposals that increase expected ASSET value and -EV for proposals that decrease it.  

## Vague Proposal Bluff  

A proposer submits an underspecified proposal, then buys PASS-ASSET.  

This is not an ambiguous oracle question like "will it be nice out on Tuesday?" It is a proposal with missing value-relevant details: exact counterparties, scope, rationale, implementation plan or track record demonstration.  

Vagueness reduces participation. As with bad oracle resolution rules, ambiguity makes traders less willing to trade and can reduce liquidity. The proposer then bids up PASS-ASSET while skeptics hesitate to sell, not because they approve of the proposal, but because the missing details create adverse selection.  

The adverse selection matters because +EV proposers can rationally use vagueness too. A proposer with a good proposal may intentionally hide strong details, buy PASS-ASSET while skeptics underprice the proposal, then reveal those details later. That maximizes their decision-market trading returns. A -EV proposer can imitate the same pattern, making missing details look less damning and reducing the amount of capital willing to countertrade them.  

The weakness is that vagueness is cheap to imitate. If too many -EV proposals use it, traders should eventually treat vagueness as negative evidence. The strategy works only while "vague because valuable" remains plausible.  

## (Adversarial) Decision Selection Bias  

Decision selection bias comes from the fact that the market price decides whether the proposal executes. Asset futarchy wants a causal signal: would executing this proposal make ASSET worth more? But the market measures a correlation: in worlds where this proposal passes, is ASSET worth more than in worlds where it fails?  

A proposer can exploit the gap between those two questions by timing the proposal around unresolved information about the proposal itself.  

Example: a proposer asks the DAO to pay for a partnership, but the proposal is submitted before the partnership details have been disclosed. The details will be released during the TWAP window. If the details are strong, PASS-ASSET rises and the proposal passes. If the details are weak, PASS-ASSET falls and the proposal fails. The proposal can be -EV before the details are known, because most possible versions of the partnership are weak. But PASS-ASSET still looks good conditional on passing, because the proposal only passes in the subset of worlds where the released partnership details are strong.  

The problem is not that traders are irrational. They are correctly pricing the conditional branch they are in. The problem is that the decision market needed evidence about the proposal's causal effect before selection, but passage was selected for the favorable version of the proposal.  

This applies to both +EV and -EV proposals. For +EV proposals, it creates an incentive to add artificial uncertainty that resolves during the TWAP window, because unresolved upside can raise PASS-ASSET before the information is revealed. For -EV proposals, the same structure can make a bad proposal pass by selecting for the subset of worlds where favorable proposal-specific information arrives.  

## Sabotage Commitment  

The proposer commits to making the fail branch worse.  

Example: "If this proposal fails, I will stop supporting the protocol, withdraw liquidity, or otherwise take an action that lowers ASSET's price."  

This can make PASS look better than FAIL even if the proposal itself is -EV. The proposal passes not because it creates value, but because rejection has been made costly.  

This works for both +EV and -EV proposals where two conditions hold: the proposer has a real sabotage vector, and they do not value the reputational cost enough to avoid using it.  

That makes it narrower than the other attacks. New proposers often lack the ability to harm the DAO credibly, and established proposers often care about future business. But crypto can make this threat stronger than it looks in normal corporate or political settings. Pseudonymous actors, cross-border entities, and unclear legal recourse can make it harder to punish the attacker socially or legally.  

Where the sabotage vector exists, the cost is mostly off-path: if the threat works, the proposer rarely has to carry it out. A sufficiently credible attacker can reuse the threat across proposals.  

## Knock-In Delivery Buy Wall  

A proposer offers value-creating work, but only intends to perform it if defending the proposal becomes expensive enough that non-delivery no longer pays.  

Example: a proposer asks the DAO to approve a distribution deal. The deal is valuable if they actually recruit the distributor and do the integration work, but costly for the proposer to deliver. Instead of doing the work by default, the proposer runs a buy wall that keeps PASS-ASSET above FAIL-ASSET, or above whatever PASS/FAIL spread the decision rule requires.  

If bearish traders sell only a small amount of PASS-ASSET, the proposer absorbs the flow, the proposal passes, and the proposer can skip the work but gets paid anyway. If bearish traders sell heavily, the proposer keeps buying under the assumption that they will not deliver. They stop defending and switch to delivery once total defense costs would offset the amount they get paid if the proposal passes.  

This is the attacker's benefit. They preserve passage while replacing an unconditional delivery obligation with a knock-in obligation: deliver only after countertraders force defense costs up to the payout threshold. If the proposer is not capital-constrained and can defend the spread, the strategy reduces how often they need to deliver the proposal's offering without reducing passage.  

The key condition is that defending passage without delivery must remain profitable until the delivery threshold is reached. Once total defense costs would offset the futarchy payout, the proposer switches to delivery. This gives the proposer a private cost cap: defend passage without delivering while that is profitable, then deliver when the defended price becomes justified by the work itself.  

The buy wall must track the PASS/FAIL spread, not a fixed PASS-ASSET price. Delivery must make the defended PASS-ASSET price justified, not merely less wrong.  

This can be used by any proposal, including proposals that are +EV if delivered honestly. It is harmful to the futarchy because the proposal is only +EV in the delivery branch. In that case, the proposer gets paid upon passage, while delivering only when the market has forced their defense costs up to the payout threshold.  

## Conditional Exit Squeeze  

A proposer buys enough PASS-ASSET to push the proposal above the passing threshold. The key fact is that selling PASS-ASSET is not just "voting against the proposal." For an ASSET holder, it is a conditional exit from ASSET in the world where the proposal passes.  

That matters because many holders are not choosing between "proposal passes" and "proposal fails" in the abstract. They are choosing between holding ASSET after the proposal passes, or holding USD after the proposal passes. A holder can believe the proposal slightly reduces ASSET value while still preferring the post-passage ASSET exposure to USD.  

Many holders may think:  

"This proposal is slightly -EV, but I would still rather hold ASSET after it passes than hold USD."  

So they do not sell PASS-ASSET near the threshold. Their unwillingness to sell is not approval of the proposal. It means the proposal's harm is smaller than their reservation value for staying exposed to ASSET.  

This creates a much thinner supply curve than the ASSET holder base suggests. The attacker is not buying through every holder. They are buying through the smaller float of holders and traders willing to conditionally exit below the passing threshold.  

The attack works when the proposer's private value from passage exceeds the cost of clearing that conditional float. For example, a proposal that transfers value to the proposer may impose a small loss on every holder, while giving the proposer a concentrated payout. Each holder may rationally refuse to sell PASS-ASSET because the loss is not large enough to justify conditional exit, yet the proposer can profit by buying the limited supply that is available and pushing the market above the threshold.  

This is mainly useful for -EV proposals, especially mildly -EV ones. If the proposal is strongly -EV, more holders prefer USD in the PASS world and sell. If it is only slightly -EV, bullish holders may tolerate the harm, leaving too little corrective supply below the pass threshold.  

If you found this interesting, have feedback or are working on something related, let's chat: [email](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
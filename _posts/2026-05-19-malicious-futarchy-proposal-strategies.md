---
articleUrl: https://distbit.xyz/malicious-futarchy-proposal-strategies
author: distbit
category: blog
date: 2026-05-19 00:00
description: ''
gist_url: https://gist.github.com/db7422f8704b0638eaf9469f1af239cd
headerImage: false
layout: post
live: true
tag: []
title: How to pass your malicious futarchy proposal
---




# Constructing Adversarial Asset Futarchy Proposals  

Asset futarchy is hardest to attack when traders can cheaply correct incorrect prices. The proposal strategies below work by weakening that correction mechanism. Some only help -EV proposals. Others also help +EV proposals, which makes them more dangerous because they can become standard behavior rather than obvious abuse.  

Asset futarchy here means a governance system where a proposal passes if conditional markets predict ASSET will be worth more if the proposal passes than if it fails. PASS-ASSET is ASSET in the world where the proposal passes. FAIL-ASSET is ASSET in the world where it fails. The important feature here is that relative conditional prices decide execution. +EV means a proposal increases expected ASSET value, and -EV means it decreases expected ASSET value. The examples below assume a 2% passage hurdle: PASS-ASSET must trade at least 2% above FAIL-ASSET for the proposal to pass.  

## Resistance-Contingent Delivery  

A proposer promises value-creating work, but treats delivery as the backup plan. Their first choice is to pass the proposal by defending the PASS/FAIL spread, collect the proposal payout, and skip the work.  

Example: a proposer asks the DAO to pay $300k for a wallet distribution partnership. The partnership is +EV to the DAO if they actually secure the wallet partner and complete the integration work, but delivery costs the proposer $180k. Instead of doing the work by default, the proposer runs a buy wall that keeps PASS-ASSET at 1.02 while FAIL-ASSET trades at 1.00. Under non-delivery, the manipulation cost is the $0.02 premium paid for each PASS-ASSET bought.  

If bearish traders sell 4m PASS-ASSET into the wall, manipulation costs 4m * $0.02 = $80k. Because the $300k payout is the same under delivery and non-delivery, the proposer compares the $80k manipulation cost with the $180k delivery cost. Manipulation is cheaper, so the proposer absorbs the flow, the proposal passes, and the proposer can skip the work but gets paid anyway. If bearish traders sell 10m PASS-ASSET, manipulation costs 10m * $0.02 = $200k, which is above the $180k delivery cost. Once non-delivery manipulation would cost more than delivery, the proposer delivers. Delivery then makes the defended PASS-ASSET price justified, so the earlier buy-wall purchases are no longer losses from defending an unjustified price.  

The proposer has converted delivery from a default obligation into a resistance-triggered backstop. Weak opposition lets them pass and get paid without doing the work. Strong opposition forces them to choose the cheaper path: keep manipulating if manipulation costs less than delivery, or deliver if delivery is cheaper. This gives the proposer a private cost cap: preserve passage by paying the lower of manipulation cost or delivery cost. If the proposer has enough capital to defend the spread, this reduces how often they need to deliver without reducing passage.  

The buy wall must track the PASS/FAIL spread, not a fixed PASS-ASSET price. Delivery must make the defended PASS-ASSET price justified, not merely less wrong.  

This can be used by any proposal that is +EV if delivered honestly. The harm is that futarchy approves the proposal as if delivery were unconditional, while the proposer treats delivery as optional. When countertrading is weak, the org pays for work that is not done. When countertrading is strong, delivery happens only because manipulation became more expensive than work.  

## Committed Holder Extraction  

A proposer buys enough PASS-ASSET to push the proposal above the passing threshold. The key fact is that selling PASS-ASSET is not just "voting against the proposal." For an ASSET holder, it is a conditional exit from ASSET in the world where the proposal passes.  

Example: a proposer requests a $1m treasury payment to their own consulting company for routine ecosystem strategy work that the DAO does not need. The proposal is clearly -EV because it transfers value out of the treasury without creating offsetting value for ASSET holders. Suppose skeptics estimate that the payment and runway damage make fair PASS-ASSET 0.98 while FAIL-ASSET trades at 1.00. The 2% passage hurdle requires the proposer to defend PASS-ASSET at 1.02, so the manipulation premium is $0.04 per PASS-ASSET bought. The proposer's private benefit is the $1m transfer, so manipulation costs exceed that benefit only after $1m / $0.04 = 25m PASS-ASSET of corrective selling. If committed holders sell only 10m PASS-ASSET, defense costs 10m * $0.04 = $400k, which is below the $1m private benefit.  

That matters because many holders are not choosing between "proposal passes" and "proposal fails" in the abstract. They are choosing between holding ASSET after the proposal passes, or holding USD after the proposal passes. A holder can believe the proposal slightly reduces ASSET value while still preferring the post-passage ASSET exposure to USD.  

Many holders may think:  

"This proposal is slightly -EV, but I would still rather hold ASSET after it passes than hold USD."  

The attacker is not buying through every holder who thinks the proposal is harmful. They are buying through the subset of holders whose reserve value for ASSET in the pass branch is below the defended PASS-ASSET price. The attack works when that conditional sell flow is too small to make defense cost exceed the proposer's private benefit from passage.  

This is not an arbitrary participation assumption: holders have heterogeneous reserve prices, and many would only sell their ASSET exposure at a material premium to spot. A mildly -EV proposal can reduce their pass-branch valuation without making them prefer conditional exit to continued ASSET exposure.  

For direct transfer proposals, the corrective flow required to block passage can be very large: the proposer internalizes the transfer, while the loss is spread across all holders.  

This is mainly useful for mildly -EV proposals. If the proposal is strongly -EV, more holders prefer USD in the PASS world and sell. If it is only slightly -EV, bullish holders may tolerate the harm, leaving too little corrective supply below the pass threshold.  

## Proposal Convexity Maximisation  

Decision selection bias arises because the market price decides whether the proposal executes. Asset futarchy wants a causal signal: would executing this proposal make ASSET worth more? But the market measures a correlation: in worlds where this proposal passes, is ASSET worth more than in worlds where it fails?  

A proposer can exploit the gap between those two questions by timing the proposal around unresolved information about the proposal itself.  

Example: a proposer asks the DAO to spend $600k on a growth campaign before the key campaign detail is known: whether it includes a major exchange co-marketing slot. If the slot is included, the campaign is worth $1.2m to ASSET holders. If it is not included, it is worth $100k. Suppose the slot has a 20% chance before the detail is known. The true ex ante EV is (20% * $1.2m) + (80% * $100k) - $600k = -$280k, so the proposal is -EV before selection. Conditional on the slot branch, EV is $1.2m - $600k = +$600k. If $300k of proposal value maps to 1% of ASSET price in this market, the true ex ante EV implies PASS-ASSET at 0.9907 while FAIL-ASSET trades at 1.00, but the selected slot branch implies PASS-ASSET at 1.02. The proposer buys PASS-ASSET to defend the 1.02 hurdle during the TWAP window. If the slot is announced, the proposal passes in the selected favorable branch. If no slot is announced, PASS-ASSET falls and the proposal fails.  

The problem is not that traders are irrational. They are correctly pricing the conditional branch they are in. The problem is that the decision market needed evidence about the proposal's causal effect before selection, but passage was selected for the favorable version of the proposal.[^dsb-informed-traders]  

This applies to both +EV and -EV proposals. For +EV proposals, it creates an incentive to add artificial uncertainty that resolves during the TWAP window, because unresolved upside can raise PASS-ASSET before the information is revealed. For -EV proposals, the same structure can make a bad proposal pass by selecting for the subset of worlds where favorable proposal-specific information arrives.  

## Counter-manipulation Deterrence  

A proposer submits an underspecified proposal, then buys PASS-ASSET.  

The proposal has vague/missing value-relevant details: counterparties, scope, rationale, implementation plan or track record demonstration.  

Example: a proposer asks the DAO to approve a $750k exchange liquidity and market-maker package. They say the counterparty, venues, fee terms, and performance commitments are confidential until approval. In reality, the package is clearly -EV: it buys only $150k of real value, so it destroys $750k - $150k = $600k of value. The proposer buys PASS-ASSET to defend the 2% hurdle at 1.02 while FAIL-ASSET trades at 1.00.  

A skeptic considering whether to countertrade faces adverse selection from the missing details. If the package is the bad hidden version, the skeptic maps the $600k loss to fair PASS-ASSET at 0.994, so selling 1m PASS-ASSET at 1.02 has expected profit of 1m * $0.026 = $26k. If the package is an obfuscated +EV version with genuinely valuable venue commitments, the skeptic estimates fair PASS-ASSET at 1.08, so the same trade loses 1m * $0.06 = $60k. If the skeptic assigns a 40% probability to the obfuscated +EV version, the expected trading profit is (60% * $26k) - (40% * $60k) = -$8.4k. The skeptic can believe the visible proposal is more likely bad than good and still decline to sell PASS-ASSET.  

Vagueness reduces participation. As with bad oracle resolution rules, ambiguity makes traders less willing to trade and can reduce liquidity. The proposer then bids up PASS-ASSET while skeptics hesitate to sell, not because they approve of the proposal, but because the missing details create adverse selection.  

The adverse selection matters because +EV proposers can rationally use vagueness too. A proposer with a good proposal may intentionally hide strong details, buy PASS-ASSET while skeptics underprice the proposal, then reveal those details later. That maximizes their decision-market trading returns. A -EV proposer can imitate the same pattern, making missing details look less damning and reducing the amount of capital willing to countertrade them.  

The weakness is that vagueness is cheap to imitate. If too many -EV proposals use it, traders should eventually treat vagueness as negative evidence. The strategy works only while "vague because valuable" remains plausible.  

[^dsb-informed-traders]: Decision selection bias is not fully mitigated by highly informed traders. A trader can understand the proposal better than the market, face little adverse-selection risk, and still prefer buying PASS-ASSET over correcting the bias. If the decision market is liquid and passage is more likely to result from PASS-ASSET rising than FAIL-ASSET falling, a PASS-ASSET purchase includes an exit option. The trader can buy while PASS-ASSET trades below FAIL-ASSET, then place an automatic sell order near the passing threshold. If passage happens through a PASS-led price move, that threshold is crossed before settlement, giving the trader an opportunity to sell above their entry price. Buying PASS-ASSET can therefore be privately attractive even when it reinforces the selection bias. The incentive is strongest when proposal-specific volatility in PASS-ASSET exceeds the ordinary ASSET volatility reflected in FAIL-ASSET. Short trading windows make that condition easier to satisfy: they concentrate trading around proposal-relevant information and reduce unrelated volatility costs for conditional-market traders.  

## Fail-Branch Sabotage  

The proposer commits to making the fail branch worse.  

Example: a liquidity provider asks for a $500k renewal grant that is clearly worth only $100k to the DAO. The proposal itself is -EV. Traders price the overpriced grant and the precedent damage at fair PASS-ASSET 0.985. The liquidity provider also credibly threatens to withdraw liquidity and shut down support if the proposal fails, which knocks FAIL-ASSET from 1.00 to 0.97. With a 2% passage hurdle, the proposer needs PASS-ASSET above 0.97 * 1.02 = 0.9894. They buy PASS-ASSET to 0.99, paying a $0.005 premium over fair PASS-ASSET. The private benefit from the overpayment is $400k, so manipulation costs exceed that benefit only after $400k / $0.005 = 80m PASS-ASSET of corrective selling.  

This can make PASS look better than FAIL even if the proposal itself is -EV. The proposal passes not because it creates value, but because rejection has been made costly.  

This works for both +EV and -EV proposals where two conditions hold: the proposer has a real sabotage vector, and they do not value the reputational cost enough to avoid using it.  

That makes it narrower than the other attacks. New proposers often lack the ability to harm the org credibly, and established proposers often care about future business. But crypto can make this threat stronger than it looks in normal corporate or political settings. Pseudonymous actors, cross-border entities, and unclear legal recourse can make it harder to punish the attacker socially or legally.  

Where the sabotage vector exists, the cost is mostly off-path: if the threat works, the proposer rarely has to carry it out. A sufficiently credible attacker can reuse the threat across proposals.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
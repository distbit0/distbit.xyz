---
articleUrl: https://distbit.xyz/malicious-futarchy-proposal-strategies
author: distbit
category: blog
date: 2026-05-19 00:00
description: ''
gist_url: https://gist.github.com/db7422f8704b0638eaf9469f1af239cd
headerImage: false
hidden: false
layout: post
live: true
published: true
tag: []
title: Futarchy is not secure without a proposal gatekeeper
---




# Adversarial Futarchy Proposal Strategies   

Asset futarchy is attractive because it lets markets compare a proposal's expected effect on token value. That comparison is only reliable when conditional prices track the proposal's causal effect rather than strategic behavior around the decision rule.  

The attacks below describe ways a proposer can make PASS-ASSET trade above FAIL-ASSET without creating commensurate value for ASSET holders. They are defensive mechanism-design examples: each one identifies a coupling failure between the conditional market price and the proposal's true expected effect.  

The mitigations also imply a current limitation: robust asset futarchy cannot be fully permissionless and autonomous. Manual gating requires reviewers, and some penalties require them to judge whether proposal terms were abusive. That review layer becomes a trusted governance surface: reviewers can allow their own malicious proposals to pass while blocking counter-proposals. The defenses below therefore replace some market attacks with a centralisation assumption rather than removing governance risk.  

Asset futarchy here means a governance system where a proposal passes if conditional markets predict ASSET will be worth more if the proposal passes than if it fails. PASS-ASSET is ASSET in the world where the proposal passes. FAIL-ASSET is ASSET in the world where it fails. The important feature here is that relative conditional prices decide execution. +EV means a proposal increases expected ASSET value, and -EV means it decreases expected ASSET value. The examples below assume a 2% passage hurdle: PASS-ASSET must trade at least 2% above FAIL-ASSET for the proposal to pass.  

## Resistance-Contingent Delivery  

A proposer promises value-creating work, but treats delivery as the backup plan. Their first choice is to pass the proposal by defending the PASS/FAIL spread, collect the proposal payout, and skip the work.  

Example: a proposer asks the DAO to pay $300k for a wallet distribution partnership. The partnership is +EV to the DAO if they actually secure the wallet partner and complete the integration work, but delivery costs the proposer $180k. Instead of doing the work by default, the proposer runs a buy wall that keeps PASS-ASSET at 1.02 while FAIL-ASSET trades at 1.00. Under non-delivery, the manipulation cost is the gap between the defended price and fair PASS-ASSET under non-delivery, not the premium over FAIL-ASSET. If non-delivery makes fair PASS-ASSET 0.99, defending 1.02 costs $0.03 per PASS-ASSET bought.  

If bearish traders sell 4m PASS-ASSET into the wall, manipulation costs 4m * $0.03 = $120k. Because the $300k payout is the same under delivery and non-delivery, the proposer compares the $120k manipulation cost with the $180k delivery cost. Manipulation is cheaper, so the proposer absorbs the flow, the proposal passes, and the proposer can skip the work but gets paid anyway. If bearish traders sell 10m PASS-ASSET, non-delivery manipulation would cost 10m * $0.03 = $300k, which is above the $180k delivery cost. The proposer delivers instead. Delivery makes the defended PASS-ASSET price justified, so the earlier buy-wall purchases are no longer a separate manipulation loss. The proposer pays the lower of manipulation cost or delivery cost, not both.  

If the proposal fails before passage, the proposer owes no delivery and realizes no pass-conditional manipulation loss. Their downside is the proposal creation/submission cost. Ignoring capital costs, the attacker has a privately dominant strategy because weak resistance gives upside, while strong resistance lets them fall back to the honest path without a separate manipulation loss.  

The proposer has converted delivery from a default obligation into a resistance-triggered backstop. Weak opposition lets them pass and get paid without doing the work. Strong opposition forces them to choose the cheaper path: keep manipulating if manipulation costs less than delivery, or deliver if delivery is cheaper. This gives the proposer a private cost cap: preserve passage by paying the lower of manipulation cost or delivery cost. If the proposer has enough capital to defend the spread, this reduces how often they need to deliver without reducing passage.  

This can be used by any proposal that is +EV if delivered honestly. The harm is that futarchy approves the proposal as if delivery were unconditional, while the proposer treats delivery as optional. When countertrading is weak, the org pays for work that is not done, hence effectively using futarchy to steal resources from the org. When countertrading is strong, delivery happens only because manipulation became more expensive than work.  

Legal enforcement only helps against a broken unconditional promise. It does not close this attack when the proposal itself gives the proposer delivery discretion or makes delivery resistance-contingent. Then the proposer can follow the written terms without lying or breaching a contract; the mechanism has to reject the option value upfront rather than rely on enforcement after passage.  

## Bag-Holder Extraction  

A proposer buys enough PASS-ASSET to push the proposal above the passing threshold. The key fact is that selling PASS-ASSET is not just "voting against the proposal." For an ASSET holder, it is a conditional exit from ASSET in the world where the proposal passes.  

Example: a proposer requests a $1m treasury payment to their own consulting company for routine ecosystem strategy work that the DAO does not need. The proposal is -EV because it transfers value out of the treasury without creating offsetting value for ASSET holders. Suppose skeptics estimate that the payment and runway damage make fair PASS-ASSET 0.98 while FAIL-ASSET trades at 1.00. The 2% passage hurdle requires the proposer to defend PASS-ASSET at 1.02, so the manipulation premium is $0.04 per PASS-ASSET bought. The proposer's private benefit is the $1m transfer, so manipulation costs exceed that benefit only after $1m / $0.04 = 25m PASS-ASSET of corrective sell flow. If traders supply only 10m PASS-ASSET, defense costs 10m * $0.04 = $400k, which is below the $1m private benefit. If the proposal fails, the proposer receives no payout and realizes no pass-conditional manipulation loss. Their downside is only the proposal creation/submission cost.  

Holders are not choosing between "proposal passes" and "proposal fails" in the abstract. They are choosing between holding ASSET after passage and conditionally exiting into USD. A holder can believe the proposal is slightly -EV while still preferring pass-branch ASSET exposure to USD.  

The attacker therefore does not need to buy through every holder who thinks the proposal is harmful. They only need to buy through enough corrective flow to make defense cost exceed the proposer's private benefit. In holder-only markets, that flow is limited by holders' heterogeneous pass-branch reserve prices. Many holders would sell their ASSET exposure only at a material premium to spot, so mild harm can leave too little conditional sell flow below the pass threshold.  

For direct transfer proposals, the corrective flow required to block passage can still be very large. The proposer internalizes the transfer, while the loss is spread across holders, so the attacker's private upside can exceed the counter-flow available below the pass threshold.  

Synthetic conditional markets with shorting reduce this mechanical holder-supply constraint, because non-holders can create PASS-ASSET sell flow. But they do not make corrective flow unlimited. A large PASS short loses in the states where the seller is wrong about proposal value: the confidential counterparty is valuable, the proposer has hidden ability to deliver, or the short adds enough resistance that delivery becomes cheaper than continued manipulation and makes PASS fair. Larger size increases exposure to those adverse-selection states, so the bottleneck shifts from holder reserve prices to risk-bearing capital willing to take that exposure.  

This is mainly useful for mildly -EV proposals. If the proposal is strongly -EV, more traders prefer to sell or short PASS-ASSET. If it is only slightly -EV, bullish holders may tolerate the harm and arbitrageurs may avoid large adverse-selection-bearing positions, leaving too little corrective supply below the pass threshold.  

## Proposal Convexity Maximisation  

Decision selection bias arises because the market price decides whether the proposal executes. Asset futarchy wants a causal signal: would executing this proposal make ASSET worth more? But the market measures a correlation: in worlds where this proposal passes, is ASSET worth more than in worlds where it fails?  

A proposer can exploit the gap between those two questions by timing the proposal around unresolved information about the proposal itself.  

Example: a proposer asks the DAO to spend $600k on a growth campaign before the key campaign detail is known: whether it includes a major exchange co-marketing slot. If the slot is included, the campaign is worth $1.2m to ASSET holders. If it is not included, it is worth $100k. Suppose the slot has a 20% chance before the detail is known. The true ex ante EV is (20% * $1.2m) + (80% * $100k) - $600k = -$280k, so the proposal is -EV before selection.  

If $300k of proposal value maps to 1% of ASSET price in this market, unconditional approval would map to PASS-ASSET at 0.9907 while FAIL-ASSET trades at 1.00, so the proposal would not clear the hurdle before selection. But the PASS market is not pricing unconditional approval. It is pricing ASSET conditional on passage, and pass worlds are disproportionately worlds where the slot exists. In the slot branch, EV is $1.2m - $600k = +$600k, which maps to PASS-ASSET at 1.02. The proposal can clear the 2% hurdle without proposer manipulation because the pass rule selects for favorable proposal-specific information rather than evaluating the ex ante mixture directly.  

That conditional-branch calculation is deliberately simplified. It overstates the clean selection effect, because the same decision selection bias that helps the proposal pass also lets some unfavorable states pass. This makes the effect self-limiting, but not self-cancelling: if the dilution fully removed the selection effect, it would remove the mechanism causing the dilution. The selected pass-branch price can remain high enough to clear the hurdle even though unconditional approval would be negative-EV. If the proposal fails, the proposer receives no proposal benefit and realizes no pass-conditional manipulation loss. Their downside is the proposal creation/submission cost.  

The problem is not that traders are irrational. They are correctly pricing the conditional branch they are in. The problem is that the decision market needed evidence about the proposal's causal effect before selection, but passage selects for the favorable version of the proposal.[^dsb-informed-traders]  

This applies to both +EV and -EV proposals. For +EV proposals, it creates an incentive to add artificial uncertainty that resolves during the TWAP window, because unresolved upside can raise PASS-ASSET before the information is revealed. For -EV proposals, the same structure can make a bad proposal pass by selecting for the subset of worlds where favorable proposal-specific information arrives.  


## Counter-manipulation Deterrence  

A proposer submits an underspecified proposal, then buys PASS-ASSET.  

The proposal has vague/missing value-relevant details: counterparties, scope, rationale, implementation plan or track record demonstration.  

Vagueness reduces participation. As with bad oracle resolution rules, ambiguity makes traders less willing to trade and can reduce liquidity. The proposer then bids up PASS-ASSET while skeptics hesitate to sell, not because they approve of the proposal, but because the missing details create adverse selection.  

The adverse selection matters because +EV proposers can rationally use vagueness too. A proposer with a good proposal may intentionally hide strong details, buy PASS-ASSET while skeptics underprice the proposal, then reveal those details later. That maximizes their decision-market trading returns. A -EV proposer can imitate the same pattern, making missing details look less damning and reducing the amount of capital willing to countertrade them.  

Example: a proposer asks the DAO to approve a $750k exchange liquidity and market-maker package. They say the counterparty, venues, fee terms, and performance commitments are confidential until approval. In reality, the package is clearly -EV: it buys only $150k of real value, so it destroys $750k - $150k = $600k of value. The proposer buys PASS-ASSET to defend the 2% hurdle at 1.02 while FAIL-ASSET trades at 1.00.  

A skeptic considering whether to countertrade faces adverse selection from the missing details. If the package is the bad hidden version, the skeptic maps the $600k loss to fair PASS-ASSET at 0.994, so selling 1m PASS-ASSET at 1.02 has expected profit of 1m * $0.026 = $26k. If the package is an obfuscated +EV version with genuinely valuable venue commitments, the skeptic estimates fair PASS-ASSET at 1.08, so the same trade loses 1m * $0.06 = $60k. If the skeptic assigns a 40% probability to the obfuscated +EV version, the expected trading profit is (60% * $26k) - (40% * $60k) = -$8.4k. The skeptic can believe the visible proposal is more likely bad than good and still decline to sell PASS-ASSET. If the proposal fails, the proposer receives no proposal benefit and realizes no pass-conditional manipulation loss. Their downside is just the proposal creation/submission cost.  

The weakness is that vagueness is cheap to imitate. But vagueness becomes negative evidence only when vague -EV proposals dominate vague +EV proposals. That ratio depends on proposal-submission costs among other factors. +EV proposal creators can defend PASS-ASSET themselves without disclosing their proposal's details, so vagueness need not reduce its passage probability or force worse proposal terms.   

## Fail-Branch Sabotage  

The proposer commits to making the fail branch worse.  

Example: a liquidity provider asks for a $500k renewal grant that is clearly worth only $100k to the DAO. The proposal itself is -EV. Traders price the overpriced grant and the precedent damage at fair PASS-ASSET 0.99. The liquidity provider also credibly threatens to withdraw liquidity and shut down support if the proposal fails, which knocks FAIL-ASSET from 1.00 to 0.965. With a 2% passage hurdle, the proposal needs PASS-ASSET above 0.965 * 1.02 = 0.9843. Fair PASS-ASSET at 0.99 clears the hurdle without requiring any additional PASS-market manipulation.  

Given the threat, the market price is not wrong. PASS is better than FAIL because the fail branch has been poisoned. The attack is a commitment failure: the relevant counterfactual is a governance rule that credibly refuses sabotage threats, so proposers expect rejection and do not make the threat in the first place. A standard asset futarchy cannot make that global commitment, because it is incompatible with the "highest-priced conditional-branch wins" rule. Once the threat exists, it optimizes the local comparison between paying and suffering sabotage, even if a policy of never paying would be higher-EV across proposals.  

If the proposal passes, the attacker receives the $400k overpayment and does not need to sabotage. If the proposal fails, the attacker carries out the sabotage, so failure is the only branch here with an off-path private cost. That private cost is not necessarily equal to the value lost by the org: withdrawing liquidity can cost the attacker less than the ASSET value it destroys.  

This works for both +EV and -EV proposals where two conditions hold: the proposer has a real sabotage vector, and they do not value the reputational cost enough to avoid using it.  

That makes it narrower than the other attacks. New proposers often lack the ability to harm the org credibly, and established proposers often care about future business. But crypto can make this threat stronger than it looks in normal corporate or political settings. Pseudonymous actors, cross-border entities, and unclear legal recourse can make it harder to punish the attacker socially or legally.  

Where the sabotage vector exists, the cost is mostly off-path: if the threat works, the proposer rarely has to carry it out. A sufficiently credible attacker can reuse the threat across proposals. This creates a search incentive: actors who find credible ways to harm the org can convert those vectors into bargaining power and extract resources. The mechanism compensates the discovery of sabotage vectors.  

## Design implications  

These attacks require defenses outside ordinary price discovery. Asset futarchy needs markets that can express negative information, and it needs admission rules that reject proposals whose contracts, omissions, or threats make the PASS-vs-FAIL comparison stop measuring causal value.  

Resistance-contingent delivery is a contract-design problem. Proposers need enforceable delivery obligations, and proposal review should reject or penalize terms that let the proposer deliver only when opposition makes manipulation more expensive than work.  

Bag-holder extraction is a market-access problem. Spot conditional markets limit corrective selling to current holders willing to exit pass-branch ASSET. Synthetic conditional markets let non-holders sell or short PASS exposure, broadening the capital that can oppose mildly negative-EV proposals.  

Proposal convexity maximisation needs a randomised mechanism that sometimes separates market settlement from market-guided execution.[^dynomight-futarchy] In a large randomly selected share of cases, the market should be cancelled and the proposal decision should follow its recommendation. In the remaining cases, the market should settle, but execution should be selected at random rather than by the market. Settled PASS states then no longer consist only of worlds where favorable proposal-specific information caused passage. Proposals that leave material information undisclosed should also be gated or penalized.  

Randomized settlement also makes admission economically relevant: every admitted proposal receives some chance of execution even when the market predicts that it is harmful. infofi-index#Resolution candidate — 2026-08-19 explains why cheap entry can turn this into a negative-value proposal lottery and why lowering the exploration rate alone need not bound aggregate harm.  

Counter-manipulation deterrence is mainly an admission and enforcement problem. Under-defined proposals should be rejected before trading, and value-relevant commitments should have an available enforcement mechanism.  

Fail-branch sabotage requires refusing threats as proposal inputs. Proposals that make the fail branch worse through explicit or implicit retaliation should be manually gated, slashed, or otherwise penalized.  

Permissioned review is not necessarily the only possible defense capable of addressing all of these attacks, though it is the only one I am aware of capable of doing so. A design that does so without recreating a trusted review layer would be a meaningful improvement over the mitigations described here.  

## A two-layer gatekeeper architecture  

A [validator-redirected revenue mechanism](https://ethresear.ch/t/validator-redirected-revenue/25248/40) could limit the authority assigned to this trusted review layer. Validators would determine how much revenue to redirect and which allocation mechanism should receive it, while a delegated futarchy contract would decide which proposals to fund. Validators are well positioned to set a funding rate, but asking them to evaluate specialized work proposal by proposal would give them a much broader and more demanding role.  

The recipient contract should fund an allocation mechanism rather than pay final recipients directly. This separates the decision about how much to fund from the decision about what to fund. It also avoids relying on equal budgets for accredited institutions, which can reward institutional status and completed tasks without establishing how much value the work creates. Such budgets can reinforce institutional complexity and a preference for work produced within recognized institutions. Futarchy instead gives informed traders an incentive to compare proposals by their expected effect on ASSET value.  

The delegated contract would contain the futarchy markets, allocation rules, grace periods, and moderator powers. After each market observation, moderators would have a grace period in which they could veto a proposal because its design or observed market behavior resembled an exploit. Replacing the moderators would then require validators to redirect revenue to a new contract instance rather than changing the validator layer itself.  

This creates a hierarchy of gatekeepers. Moderators supervise proposal creators, while validators supervise the moderator set. Validators would not assess individual proposals or continuously evaluate every moderator decision. They would intervene only when clear evidence showed that moderators had admitted an exploitative proposal or unjustifiably vetoed a legitimate one. Their narrow role limits the surface through which validator capture can affect allocation while retaining a mechanism for replacing captured or incompetent moderators.  

The initial allocation rule could keep one funding proposal incumbent until a challenger defeats it in a head-to-head futarchy market. Besides avoiding the complexity of allocating revenue across many small proposals, this makes the difference between the alternatives economically material enough to affect ASSET value and therefore produce a useful market signal.  

[Ethresearch thread](https://ethresear.ch/t/futarchy-is-insecure-without-a-trusted-gatekeeper/25235/)  

[^dynomight-futarchy]: The randomisation solution is introduced in Dynomight's [Prediction market does not imply causation](https://dynomight.net/prediction-market-causation/). See also [Futarchy's fundamental flaw](https://dynomight.net/futarchy/) for the related futarchy critique.  

[^dsb-informed-traders]: Decision selection bias is not fully mitigated by highly informed traders. A trader can understand the proposal better than the market, face little adverse-selection risk, and still prefer buying PASS-ASSET over correcting the bias. If the decision market is liquid and passage is more likely to result from PASS-ASSET rising than FAIL-ASSET falling, a PASS-ASSET purchase includes an exit option. The trader can buy while PASS-ASSET trades below FAIL-ASSET, then place an automatic sell order near the passing threshold. If passage happens through a PASS-led price move, that threshold is crossed before settlement, giving the trader an opportunity to sell above their entry price. Buying PASS-ASSET can therefore be privately attractive even when it reinforces the selection bias. The incentive is strongest when proposal-specific volatility in PASS-ASSET exceeds the ordinary ASSET volatility reflected in FAIL-ASSET. Short trading windows make that condition easier to satisfy: they concentrate trading around proposal-relevant information and reduce unrelated volatility costs for conditional-market traders.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
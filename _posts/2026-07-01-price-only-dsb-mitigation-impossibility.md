---
articleUrl: https://distbit.xyz/price-only-dsb-mitigation-impossibility
author: distbit
category: blog
date: 2026-07-01 00:00
description: ''
gist_url: https://gist.github.com/c20e747f0f434a5c76679f661977c2c7
headerImage: false
layout: post
live: true
tag: []
title: Price only dsb mitigation impossibility
---




Decision selection bias can arise when a market both informs a decision and pays conditional on that same decision.  

The market price helps decide whether a proposal is accepted. The market also resolves in the condition where that proposal is accepted. This creates endogenous resolution: the forecast influences whether the forecast pays out.  

Favorable information makes the proposal look better. It also makes the proposal more likely to be accepted. Unfavorable information makes the proposal look worse. It also makes the proposal more likely to be rejected.  

This creates asymmetric exposure in the accept condition. Traders are more exposed to worlds where favorable information appears, because those are the worlds where the proposal is more likely to be accepted and the accept condition is more likely to resolve.  

This is the core mechanism behind decision selection bias.  

A natural mitigation is to look for a market fingerprint of this bias. If a TWAP was inflated by decision selection bias, then the inflated part should decay once the relevant favorable information fails to appear. A protocol could wait after the decision window, watch for that decay, and reset the measurement if the decay appears.  

That approach runs into a detection problem.  

Strategic decision selection bias can determine which histories reach acceptance without creating an observable price movement in the histories that do reach acceptance. A proposer with private information can allow favorable states to pass and block unfavorable states. The accepted path can look stable, even though the acceptance event is selected.  

This makes the bias hard to detect from the realized market path.  

# Market Bias  

Suppose a proposal has a proposal acceptance threshold: the minimum forecasted impact required for the proposal to be accepted. From here on, call this the acceptance threshold.  

In many futarchy designs, the relevant decision statistic is a conditional delta:  

`conditional_delta = forecast_if_accepted - forecast_if_rejected`  

The proposal is accepted if the conditional delta is high enough.  

Now suppose the market pays only if the proposal is accepted. If the proposal is rejected, the market is refunded or does not resolve. Conditional markets work this way: they pay in the condition where the relevant decision is taken.  

This changes what traders care about.  

Positive information increases the expected value of the accepted proposal. It also increases the probability that the accept condition resolves.  

Negative information decreases the expected value of the accepted proposal. It also decreases the probability that the accept condition resolves.  

So the accept-side price can overweight favorable-information worlds. Those are the worlds where the proposal is more likely to be accepted and where accept-side traders are more likely to be paid.  

For example, suppose a proposal is valuable only if a private audit finds that it fixes a real bug.  

If the audit is favorable, the proposal is likely to be accepted and the accept condition resolves on a valuable proposal.  

If the audit is unfavorable, the proposal is likely to be rejected and the accept condition does not resolve.  

Before the audit is revealed, the accept-side price can be biased upward. The market is effectively putting more weight on the good-audit worlds, because those worlds are more likely to produce acceptance and settlement.  

The bias comes from resolution filtering. Negative information often prevents the accept condition from resolving, while positive information makes resolution more likely.  

## TWAP Timing  

A TWAP is a time-weighted average price.  

It prevents one momentary price from deciding the outcome. It also preserves old prices inside the decision rule.  

That matters when the market can learn proposal-relevant information during the TWAP period.  

Before information is revealed, the market is in the pre-reveal state. After it is revealed and priced in, the market is in the post-reveal state.  

Pre-reveal prices can contain a selection premium. Traders know that favorable information may appear later, improve the proposal, and increase the chance of acceptance. That possibility can lift the accept-side price before the information arrives.  

Post-reveal prices price the revealed information directly. If the reveal resolves the relevant uncertainty, then the specific pre-reveal DSB channel has expired. The price may still be high because the information was favorable, but the price is then responding to known information.  

A normal TWAP can mix these regimes.  

It may contain early pre-reveal samples inflated by decision selection bias and later samples based on revealed information. The final decision can depend partly on current information and partly on old samples that were high because favorable information was expected to increase the chance of acceptance.  

That is the TWAP contamination problem.  

## DSB Decay  

DSB decay happens when the upward selection premium in the pre-reveal price loses value over time.  

Early in the TWAP, traders may believe that favorable information could appear and make the proposal accepted. That possibility can inflate the accept-side price because favorable information both improves the proposal and increases the chance that the accept condition resolves.  

This premium has force while favorable information can still affect the current decision.  

If favorable information fails to appear by the time it must appear to affect the current decision, traders should price non-revelation. The missing reveal no longer supports the correlation between favorable information and current acceptance.  

Once that possibility expires, the pre-reveal selection premium should decay.  

If the proposal only looked good because of that premium, the live conditional delta should fall.  

This creates a tempting detection heuristic:  

`if the candidate TWAP was DSB-inflated, then the live conditional delta should decay once favorable information fails to arrive`  

The protocol could try to detect this decay and reset the measurement window before the biased TWAP finalizes.  

## Why The Decay Fingerprint Is Hard To Use  

The decay signal becomes strong only when traders believe favorable information can no longer help the current proposal pass.  

Before that point, non-revelation is weak evidence. The proposer may simply be waiting.  

So traders can rationally continue pricing the possibility of favorable information until the relevant deadline is near. The expected decay gets pushed toward the end of the market.  

That makes the fingerprint difficult to use.  

The protocol wants a long interval in which the market can price non-revelation. Strategic timing can compress the useful decay interval into the final moments before settlement. At that point, decay is hard to distinguish from noise, transient liquidity, ordinary volatility, or short-lived manipulation.  

To make DSB decay usable, the protocol needs an enforceable information-relevance deadline that occurs well before resolution.  

Traders would then know:  

`any favorable information that can help this candidate pass should already have appeared`  

Only then does non-revelation become strong evidence over a meaningful measurement period.  

The difficulty is enforcing that deadline.  

A TWAP deadline only says:  

`prices after this point do not enter the old average`  

The mechanism needs a stronger property:  

`information learned or acted on after this point cannot help the current candidate finalize`  

That property is hard to enforce because strategic information can affect the decision counterfactually.  

## Reset And Staleness Detectors  

A reset window tries to turn DSB decay into a decision rule.  

At the end of the decision window, compute:  

`decision_delta_twap = average conditional_delta during the decision window`  

The proposal becomes a candidate acceptance if:  

`decision_delta_twap >= acceptance_threshold`  

Then the protocol waits through a post-decision window and watches the live market.  

The simplest version resets if the live conditional delta moves against the candidate. For example, if the proposal’s decision-window TWAP was above the acceptance threshold, but the live conditional delta later falls below that threshold for long enough, the candidate TWAP resets.  

This detects visible adverse decay. If the candidate TWAP was high because traders expected favorable information, and that information fails to arrive in time, the live market should fall. The reset rule can then prevent old inflated samples from finalizing.  

A stronger version watches movement in either direction.  

Let:  

`live_conditional_delta = current conditional_delta during the post-decision window`  

Define:  

`staleness_magnitude = abs(live_conditional_delta - decision_delta_twap)`  

Then reset if:  

`staleness_magnitude > staleness_threshold`  

This catches some cases the negative-only rule misses. A large upward movement can mean favorable information arrived after the candidate TWAP was formed. In that case, the proposal should build a new measurement window with the information already priced in.  

Both versions rely on an observed market movement.  

The negative-only detector looks for downward decay.  

The symmetric detector looks for a large movement in either direction.  

This is where the detection problem appears. Strategic information can matter without producing a visible upward movement in the accepted path.  

If the proposal is already on track to pass, and the proposer privately learns favorable information, the proposer can leave the market unchanged. The candidate TWAP is already high enough. The favorable state passes without a reveal, without an upward price movement, and without a staleness event.  

If the proposer privately learns unfavorable information, they can sell, reveal, challenge, or otherwise cause rejection.  

The strategy is:  

```text  
if private_signal is good:  
    do nothing  
    let the already-high TWAP finalize  

if private_signal is bad:  
    intervene  
    prevent acceptance  
```  

The accepted path can look stable:  

`price high`  

`conditional delta stable`  

`proposal finalized`  

The reset detector sees no adverse decay. The staleness detector sees no large movement. Yet acceptance is still selected by the private signal.  

The favorable branch passes because the proposer stays silent. The unfavorable branch fails because the proposer intervenes.  

The realized accepted history contains no necessary marker of the selection.  

## The Counterfactual Information Problem  

The protocol observes the realized market path. It does not observe the paths that would have occurred under different private information.  

Consider two worlds with the same observed accepted history.  

```text  
World A:  
There was no relevant hidden proposer information.  
The price stayed high because the proposal was expected to be good.  
The proposal finalized.  
```  

```text  
World B:  
The proposer privately learned favorable information.  
Because the information was favorable, the proposer stayed silent and allowed the already-high price to pass.  
Had the information been unfavorable, the proposer would have intervened and blocked the proposal.  
The proposal finalized.  
```  

Both worlds can produce the same visible history:  

```text  
price stayed high  
conditional delta stayed stable  
proposal finalized  
```  

Any deterministic rule based on that history must treat both cases the same.  

World B contains the selection problem. The proposal reaches acceptance only in the favorable private-signal branch. The unfavorable branch gets filtered out before finalization.  

The information changes the decision counterfactually:  

```text  
good signal -> no intervention -> proposal passes  

bad signal -> intervention -> proposal fails  
```  

It determines which histories reach acceptance, while leaving no necessary positive trace in the histories that do reach acceptance.  

This is the central detection barrier.  

The detector is looking for realized decay, realized price movement, or realized staleness. Strategic selection can operate through unrealized branches.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [schedule a 20 min call](https://cal.com/distbit/call?duration=20)
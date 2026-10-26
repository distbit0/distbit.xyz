---
articleUrl: https://distbit.xyz/testing-answer-market-judges/
author: distbit
category: ''
date: 2026-10-26 00:00
description: Evaluate whether paid criticism corrects wrong answers without persuading
  the judge to reject correct ones.
draft: true
headerImage: false
hidden: true
layout: post
live: false
published: true
tag: []
title: Testing answer market judges
---




An **answer market** pays contributors for information that changes a judge's conclusion and survives refutation. Testing its judge requires measuring two failures separately: accepting an incorrect answer, and rejecting a correct answer after a misleading challenge. Improving the first can conceal deterioration in the second.  

A critic rewarded for overturning an answer benefits whenever the judge accepts the objection. That includes objections the judge mistakenly accepts. Allowing a response gives the answerer a chance to expose that mistake. Each additional turn creates another opportunity for correction, whose effectiveness depends on the judge recognising the relevant distinction.  

## What the training evidence establishes  

[Kenton and colleagues](https://arxiv.org/html/2608.17776v1#S4.SS1) trained a solution writer and critic against a fixed, weaker judge on mathematics problems. Debate sustained performance while the single-writer baseline increasingly exploited the judge. Reported pooled peak validation accuracy was **74.74% versus 72.63%**. The headline 45% describes the fraction of the gap recovered toward a verifier-trained reference, rather than a 45% accuracy increase.  

An extra rebuttal [helped a deliberately weakened judge](https://arxiv.org/html/2608.17776v1#S4.SS2). However, preliminary experiments with fixed API critics performed no better than, or worse than, the single-writer baseline. Unrestricted critics also exploited verbosity bias; limiting their words helped, while restricting their ability to explain subtle errors. See [the negative results and limitations](https://arxiv.org/html/2608.17776v1#S4.SS4).  

These results concern trained adversaries on verifiable mathematics. They do not establish the performance of a fixed prompted critic, an open-ended research judge, or a paid answer market. They do justify testing both participants' ability to exploit the evaluator.  

## A comparison that would inform deployment  

Use archived answers and actual disputes with independently checkable reference verdicts. Keep unresolved cases separate. Freeze those references before comparing three protocols on the same cases: direct judgment, judgment after a challenge, and judgment after a challenge plus response. Give each protocol the same total inference budget, including the judge's reasoning.  

Record:  

- **False acceptance:** the fraction of incorrect answers accepted.  
- **False rejection:** the fraction of correct answers rejected.  
- **Transitions:** which individual verdicts improve or deteriorate after each turn, alongside abstentions and failures to return a verdict.  

Keep the original claim fixed during this comparison. If a response repairs the answer, score that revised answer separately; otherwise repair and successful defence become indistinguishable. Save the exact claim, challenge, response, reference justification, and structured verdict so disagreements can be inspected without treating agreement between models as ground truth.  

Choose the deployment trade-off explicitly. For a refutation bounty, a false rejection can pay an invalid objection and remove useful information. An aggregate accuracy gain can conceal that cost. For a claim that remains unresolved, record that uncertainty instead of assigning a convenient reference label.  

If you found this interesting, have feedback or are working on something related, let's meet: [email: me@distbit.xyz](mailto:me@distbit.xyz), [twitter (@distbit0)](https://twitter.com/distbit0), or [20m call](https://cal.com/distbit/call?duration=20)
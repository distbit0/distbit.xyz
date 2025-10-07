---
articleUrl: https://distbit.xyz/the-reality-distortion-futarchy-manipulation-attack
author: distbit
category: blog
date: 2025-10-06 00:00
description: ''
gist_url: https://gist.github.com/59d9bad6ca43aff375c7c503945123d5
headerImage: false
layout: post
live: true
tag:
- share
title: The reality-distortion futarchy manipulation attack
---




# Manipulation Attempts and Their Typical Effects  

Prediction market manipulation should generally fail, and even improve market accuracy. In futarchy, proposals are evaluated and selected based on prediction market estimates of their impact on chosen metrics. Futarchy proposal creators who benefit from their proposal's acceptance may attempt to manipulate their proposal's "pass market," which is the prediction market that forecasts what the metric will be conditional on their proposal being selected. By artificially inflating this price, manipulation aims to make the proposal's impact appear larger than it actually is, increasing the likelihood of the proposal's selection.  

However, such manipulation attempts typically fail because they create opportunities for informed traders to counter the manipulation trades and profit from the temporary mispricing. When a manipulator pushes the price away from its true value, informed traders can take the opposite position and earn returns when the price eventually corrects. The result is that prediction market manipulation often increases market accuracy by raising the reward available to those who invest resources in determining the correct price.  

# Budget-Bounded Manipulators and the Market Manipulation Threshold  

Even when manipulators are willing to incur costs up to the value they assign to their proposal's passage, their resources remain finite. A threshold exists beyond which manipulators will no longer expend resources to manipulate their conditional market. Once this threshold is reached, prices realign with the correct price through informed trading. As long as informed traders possess sufficient capital and confidence in their forecasts, they can counter any attempted manipulation since the manipulator's endurance has limits. The "market manipulation threshold" represents the maximum amount of long shares the manipulator will purchase, which depends on their manipulation budget. After the manipulator reaches this threshold, the market effectively becomes free from manipulation as the manipulator's budget is exhausted.  

# The Metric Manipulation Threshold and Perverse Incentives  

A second critical threshold exists called the "metric manipulation threshold." When a manipulator possesses this many shares, they find it profitable to increase the metric beyond what their original proposal would have achieved, profiting at the expense of traders who bet against their market manipulation attempt. Ownership of long shares in their markets provides them with positive payoffs when the metric increases.  

# Condition for Manipulation Resistance  

Markets achieve manipulation resistance when the metric manipulation threshold significantly exceeds the market manipulation threshold. This gap, termed the counter-manipulation window, ensures that counter-manipulative traders feel comfortable opening short positions once the market manipulation threshold is reached. Counter-manipulation traders are both willing to trade and effective at combating manipulation only within this counter-manipulation window, provided they have sufficient capital and confidence in their evaluations. Below the market manipulation threshold, counter-manipulation traders remain willing to trade while the manipulator continues expending resources to maintain price manipulation. Above the metric manipulation threshold, counter-manipulation traders cease trading because they recognize that shorting the manipulated price will result in losses. At this point, the manipulator gains an incentive to increase the metric enough to make the manipulated prices in their markets actually correct. A mathematical model for determining market manipulation resistance is available at  [desmos version with visible calculations](https://www.desmos.com/calculator/nlmydvtbmg) and  [web version with slightly optimised calculations](https://distbit0.github.io/cfm_strategies/).  

![Counter-Manipulation Window Desmos](https://i.imgur.com/jp0QP2b.png)  

The chart plots the proposer’s total profit from manipulation as a function of the number of long shares they buy in their proposal's pass market. The blue line is the payoff from pure market manipulation: buy to move the conditional forecast enough to win the grant, but do not alter the metric. The orange line is the payoff when, after buying, the proposer also manipulates the metric itself. The green envelope is the better of those two strategies at each position size; values above zero indicate profitable manipulation. The dashed verticals mark the thresholds: the left is the market manipulation threshold (the largest position sustainable purely to sway the pass market before the manipulation budget is exhausted), and the right is the metric manipulation threshold (the position at which holding many long shares makes subsequent metric inflation privately profitable). The shaded gap between them is the counter-manipulation window, where informed traders can short safely because the manipulator has stopped buying but has not yet reached the point where metric manipulation becomes attractive.  

# Key Variables Determining Manipulation Risk  

The most significant unknowns are project-specific variables. Two primary variables determine manipulation risk. First, the proposer's profit from receiving the grant as a percentage of the cost they incur to create the promised impact matters substantially. Ensuring that the proposer must carry out promised actions regardless of their futarchy market position is crucial, as otherwise their manipulation incentive increases. Second, metric cost acceleration determines vulnerability. Metric cost acceleration describes how the total cost of manipulating the metric grows as the attempted manipulation magnitude increases. Higher acceleration means the total cost rises faster than proportionally with the manipulation magnitude. Doubling the metric increase requires more than double the cost because each additional unit of metric increase becomes progressively more expensive to achieve. This acceleration proves particularly important in the model because higher acceleration pushes the metric manipulation threshold upward and shrinks the adverse-selection risk faced by counter-traders. Greater cost acceleration means a manipulator can increase the metric less with a given budget.  

# Asset Futarchy vs. Metric (KPI) Futarchy  

Asset futarchy demonstrates greater resistance to the adverse selection attack described in the Desmos model. A manipulator faces greater difficulty meaningfully increasing an asset's price, even when their incentive grows due to acquiring a significant percentage of the supply. This resistance, termed the embedded-optimization defense, arises when many actors already hold exposure to the objective (an asset) and continuously optimize it, making sustained artificial lifts expensive. Asset prices are generally far more optimized than KPIs and encounter diminishing returns more quickly since they result from market processes with no simple linear-cost method to increase them. Before a KPI futarchy is created, no one necessarily has comparable exposure to the KPI or incentive to optimize it. This difference means KPIs carry much greater upside risk, placing counter-manipulators at higher risk when shorting proposals in a KPI futarchy.  

# Mitigation Strategies  

- Reduce the profit a project derives from having its proposal accepted or funded by creating more competitive markets through auction-style strategies that negotiate better rates from projects and reduce their markup. Theoretically, paying projects an amount that makes them indifferent between funding and non-funding eliminates manipulation incentives by ensuring they value the outcome only as much as their next best use of capital and efforts. Although an auction will reduce the profit a project gains from funding, it will not eliminate it except under perfect competition. This reduction also occurs naturally when decisions lack material benefit or impact for concentrated actors or special interests, such as roadmap decisions where few people have vested interests. Projects should follow through on commitments verifiably through reputational, legal, or financial penalties.  

- Select metrics with higher metric cost acceleration, meaning metrics where the total cost of manipulation grows more rapidly with manipulation magnitude, which occurs when metrics are subject to faster diminishing returns. Market-based metrics such as equity or governance token price resist manipulation more effectively because they exhibit this characteristic.  

- Elicit relevant parameter values by surveying projects, then input these values into the aforementioned models to determine manipulation resistance and ensure an adequate counter-manipulation window. While traders cannot easily verify proposer preferences and costs, plausible safety margins become apparent when data from multiple projects paints a consistent picture combined with market parameters.  

- Decrease the upside by increasing the starting price when price is bounded, which raises the metric manipulation threshold and reduces the extent to which large long positions incentivize metric manipulation. Since metric manipulation payout per share depends on potential price increases, greater possible increases mean more profit per share and fewer shares needed for manipulation to break even.  

- Implement advisory markets where humans make final decisions and can veto suspicious market outcomes, reducing manipulation incentives.  

- Replace metrics with human judgment as the market's objective function, similar to deep funding implementations, avoiding the need to wait for future dates to resolve markets. This approach allows immediate human consultation when manipulation is suspected, settling matters quickly and nullifying manipulation attempts. This is only useful where human adjudication is scarce relative to the number of proposals requiring evaluation, accurate enough to substitute for future metric values, and where eliciting information from traders costs less than the cost of human adjudication, necessitating bot or AI agent traders.  

- Allow humans to revert markets when compelling evidence of metric manipulation exists.  

- Extend market timeframes if the chosen metric is potentially subject to short-term manipulation strategies such as TVL rental which are less competitive compared with long-term-oriented organic strategies.   

- Run futures markets on the metric before and alongside futarchy markets, giving traders opportunities to exploit cheap metric manipulation opportunities and hardening the metric against manipulation by the time futarchy markets use it.  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@distbit0)](https://twitter.com/distbit0) or [schedule a 20 min call](https://cal.com/distbit/20min)
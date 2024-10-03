---
articleUrl: https://distbit.xyz/correlation-vs-causation-in-futarchy
author: distbit
category: blog
date: 2024-07-20 00:00
description: ''
gist_url: https://gist.github.com/aad1e5df4a169eb13ed4b8dc0c3ce117
headerImage: false
layout: post
live: true
tag: []
title: Convexity, capital efficiency and confounding in futarchy
---




Prediction markets are an increasingly popular primitive, currently being used to facilitate speculation on the probability of various political, geopolitical and economic events. While this use case is promising, as demonstrated by the increasingly high TVL of protocols such as Polymarket, it only unlocks a fraction of what prediction markets have to offer.  


Decision markets are how prediction markets become useful for making decisions. The event probabilities which prediction markets currently elicit can sometimes be useful for informing decisions, however they are not optimised for this purpose.  

Prediction markets only reveal the probability of an event, whereas decision markets reveal how different actions would impact the outcome being predicted. For example, a prediction market might reveal that p(GDP increasing year over year) = 0.4 (where p() denotes probability), whereas a decision market could tell us that conditional on electing Ron Paul, p(GDP increasing) = 0.9, whereas only 0.06 if Kamala Harris were to be elected (figures are for illustrative purposes only).  

While the output of a prediction market can be useful, the conditional probabilities provided by conditional prediction markets are much more actionable. In this case, they could be used to conclude that voting for Ron Paul is the superior action, if one's goal is a higher GDP.  

All the above however is still framed in the context of politics, which despite being the domain in which prediction markets have excelled, is unlikely to be where decision markets create the most value. Politics-focused prediction markets are popular because people enjoy betting on matters which they have tribal or ideological connections to, given that the target customer base of prediction markets, such as Polymarket, is speculators. The target customer base of decision markets, however, will be information buyers; those willing to pay to discover which action the market believes they should take in order to maximise success according to a given metric.  

The goal of decision markets is to elicit from market participants what the expected impact of an action is on a selected metric. While this might seem simple, given the below high level outline, there are several confounding, alignment and manipulation risks which are important to consider and potentially mitigate and which are the focus of this article.  

# Mechanism overview  

Here's how decision markets work in the context of a DAO evaluating funding proposals (where funding a proposal is considered an action):  

For each funding action, we create two prediction markets:  

1. A "Yes" market that predicts the outcome if the action is taken  
2. A "No" market that predicts the outcome if the action is not taken  

These markets use a scalar design where the payout of tokens is proportional to the value of a composite metric. The key tokens to understand are:  

- $\textsf{Long}^{\text{yes}}$: Redeems for a share value proportional to the metric's value if the action is taken  
- $\textsf{Long}^{\text{no}}$: Redeems for a share value proportional to the metric's value if the action is not taken  

The relative price of $\textsf{Long}^{\text{no}}$ and $\textsf{Long}^{\text{yes}}$ reveal what the market expects each action's impact to be on the selected metric (subject to caveats, analysis of which will constitute the remainder of this report). These prices can be used to select which actions to take, on the basis of the ratio between each action's cost and its predicted impact, i.e. its cost:benefit ratio.  

Implementation of the above requires selection of an AMM design or other mechanism for facilitating the exchange of shares and construction of the composite metric on which to evaluate actions. A decision rule also must be selected, which is an algorithm for deciding which actions to take, given the predicted impact on the metric and magnitude of each action's respective cost.  

For some further reading on decision market design, see:  

- https://community.ggresear.ch/t/conditional-funding-markets/27  
- https://github.com/zack-bitcoin/amoveo-docs/blob/3747c9c7b330a03531da0cbeb111fafac6839f81/basics/msrs_and_prediction_markets.md  
- https://ethresear.ch/t/prediction-market-design-for-betting-on-many-highly-improbable-events/8280  
- https://ethresear.ch/t/practical-futarchy-setup/10339  
- https://timroughgarden.github.io/fob21/reports/ZLRL.pdf  
- https://ethresear.ch/t/possible-futarchy-setups/1820  
- https://mason.gmu.edu/~rhanson/combobet.pdf  
- https://github.com/metaDAOproject/Manifesto/blob/main/Manifesto.pdf  

# Confounding  

Decision markets can suffer from confounding because they are trying to use market-implied conditional probabilities as a proxy for measuring the impact of an action on the value of a metric. Decisions are made based on the relative prices of $\textsf{Long}^{\text{yes}}$ and $\textsf{Long}^{\text{no}}$ shares, in each action's market. Any factors which speculators consider when pricing these shares, aside from their expectations of an action's impact, are confounding variables. Confounding variables distort the price with information which is irrelevant to maximising the value of the metric, hence making the decision market prices less useful.  

Confounding occurs when the variable you are measuring the impact on (the dependent variable) is affected by variables other than the variable you are actually trying to measure the impact of (the independent variable). You might want to measure the effect of A on B but end up accidentally measuring two types of confounds: hidden variable confounds (the effect that C has on both A and B) or reverse causality confounds (the effect of B on A). Ice cream sales are correlated with shark attacks, but one should be careful not to conclude from this that recently having ingested ice cream causes sharks to pay them special attention.  

## Strategy: Decision randomisation  

So how do we ensure confounding doesn't occur? Confounding can be eliminated by simply selecting which actions to take at random. The reason this works is akin to the reason patients are randomly selected to be in either the experimental or control arms of a study. It ensures no confounding differences between participants in the two arms of the study remain, so the only difference is that participants of the experimental arm received the intervention while those in control did not.  

The problem with this approach is that it is very expensive, because it requires actions to be taken at random regardless of their expected outcome. It is ironic that for decision market prices to not be confounded, they must not be used to make decisions, as the actions must be taken at random. Fortunately it is possible to avoid almost all confounding, while still being able to use decision market prices to inform decisions.  

## Strategy: Market-directed decisions  

The most straightforward solution is to base action decisions directly on the decision market's output and decision rule. This approach is typically what people mean when they refer to "decision markets." It has two major advantages:  

1. Decisions actually incorporate the information generated by the prediction markets.  
2. It mitigates hidden variable confounds and reverse causality.  

At a high level, this setup achieves these benefits by forcing all potential confounds through a single, narrow bottleneck: EV(metric|action is taken), where EV(A|B) denotes expected value of A, conditional on B occurring. This value's importance stems from it being the sole means by which a confounding factor can influence action selection.  

As a result, this setup only differs slightly from a scenario where action selection is entirely random and thus impossible to influence. The key difference is that confounds can now affect decisions, but only through their impact on EV(metric|action is taken).  

### Third variable confounding  

Third variable confounding is possible in this setup if a variable exists which influences both p(action is taken) and EV(metric), and hence distorts EV(metric|action is taken) due to modifying their statistical relationship. A notable example is EV(metric|action is taken) itself! An action is more likely to be taken if decision market participants expect it to be beneficial, hence its expected impact on the metric, conditional on being chosen, is biased upwards. Phrased differently, EV(metric|action is taken) positively influences both p(action is taken) and EV(metric), hence makes them artificially positively correlated, increasing the value of EV(metric|action is taken), which, in a sense, measures their correlation.  

This tendency for non-randomised decision markets to overestimate the benefit of an action would be of minimal concern if it applied to all actions equally, as it would then at least preserve the ranking of actions according to their expected benefit. Unfortunately however, this distortion affects some markets more than others, and hence can meaningfully impact the relative attractiveness of actions, according to their decision market scores.  

### Impact of new information  

The reason for this asymmetry is that the magnitude of the distortion expected to result from a confounding variable is proportional to its expected variance over the period of the market. If the confounding variable is not expected to change, it is consequently also not expected to increase the correlation between EV(metric) and p(action is taken), and hence will not impact EV(metric|action is taken). As a result, the more variance expected in the value of EV(metric|action is taken) for a given action, the more the decision market will optimistically bias its estimate of the action's benefit.  
In other words, the more new information expected to be revealed about an action, the more positively biased its decision market score will be. This can also be thought of as the result of shares conditional on an action being taken having a convex payoff, like options, [resulting in positive gamma](https://blog.moontower.ai/jensens-inequality-as-an-intuition-tool/), and hence positive vega (volatility increases probability of reaching higher points on the convex payoff function), which signifies a positive sensitivity to changes in volatility.  

### Manipulation risk  

This is challenging, as it makes it difficult to compare market prices for different actions, due to them potentially being distorted to different degrees by this optimism bias. An economic vulnerability also potentially arises, if malicious proposal creators exploit this to increase the decision market score of their proposal, by attempting to create an expectation that new information pertinent to it will soon be revealed.  

For example, consider a proposal for developing an improved risk modeling suite for the DAO's treasury management. The proposal creator might strategically mention that they are working on a new approach to risk assessment, the details of which will be finalized during the initial phase of the project. They might hint at preliminary tests showing promising results in predicting market volatility, without providing specific data. This creates an expectation of important new information to be revealed, potentially inflating their decision market score due to the optimism bias.  

Mitigation strategies may involve any of the following:  

1. Measuring the expected (or perhaps even the actual) variance of each market, then arithmetically adjusting each market's price to control for this variable, using techniques from option pricing.  
2. Equalising/limiting variance across markets by penalising or rejecting proposals from creators who claim that important information is yet to be revealed by the time their proposal's decision market has begun.  
3. Automatically extending markets if their volatility soon before resolution is above a certain threshold, so that the decision market price used for action selection is free from the optimistic bias present prior to the revelation of new information.  
4. Ensuring traders are aware of the economic vulnerability, so they are attuned to and can discount markets where they perceive the creator to be trying to create artificial uncertainty around the impact of the proposal.  
5. Limiting the duration of markets such that it is implausible a meaningful amount of new information will be revealed over the period of the market.  

### Reverse causality  

Reverse causality is also only partially mitigated by this default decision market configuration. Specifically, reverse causality remains possible via the same channel through which third variable confounding is possible: EV(metric|action is taken). If there is a causal path from the metric's value to p(action is selected), confounding due to reverse causality can occur. Analysis into what may cause reverse causality in decision markets is left for future research.  

## Strategy: Decision randomisation, some of the times  

An alternate strategy for mitigating confounding is to randomise decisions sometimes, at random. What this involves is cancelling the market e.g. 90% of the time, causing all shares to be worth $0, while in the remaining 10% of cases you decide which action to take at random, resolve the markets according to results of the randomly selected actions, and multiply trader rewards by 10 to account for the losses in the other 90% of cases.  

This strategy has two notable advantages:  

1. 90% (or some other high proportion) of the time, you can take the action which the decision markets predict will most positively impact the metric. We cancel the market in these cases to prevent the non-random action selection process from contaminating the price.  
2. No confounding is possible, because traders price the decision market shares only according to the scenario where the action is selected at random, because in all other cases, the market is cancelled.  

It however also has the following challenges:  

1. Trading in these decision markets will be relatively capital inefficient, because 90% of the time, a trader with an information edge will not make any return on their capital, due to the market being cancelled. The significance of capital inefficiency is that it reduces the accuracy of a decision market by making it unprofitable for traders to correct the price of shares where the mispricing % is less than the trader's % opportunity cost of capital until market resolution.  
2. 10% of the time, we will need to select an action at random which means this strategy is limited to cases where taking the worst possible action wouldn't pose an existential risk to the entity using decision markets to make decisions. In some cases, it may be possible to eliminate a large amount of downside risk from this strategy by vetting actions for obvious issues before they are traded on, however false positives and false negatives are inevitable, and the trust assumptions required to implement vetting may be prohibitive for some use cases.  
3. The variance of returns is higher which, according to the Kelly criterion, means each trader's optimal allocation to decision market shares will be lower. This can also be seen as manifestation of volatility drag. As a result, information is less efficiently elicited from informed market participants, due to their optimal position size being lower, causing them to less quickly correct mispricings.  

Given the above three discussed decision market strategies, a continuous trade-off space emerges between 1) the need to sometimes choose actions at random 2) having to accept a small amount of confounding and 3) market accuracy (due to capital inefficiency).  

**Note:**  

At the beginning of this article a decision market was referenced with the goal of determining the impact of various presidential candidates on GDP. In practice, though, this market is problematic and more so a conditional prediction market than a decision market, as it doesn't attempt to isolate causality by avoiding confounding. The democratic process used to elect presidents makes no attempt to avoid third variable confounding or reverse causality, as it simply was not designed with decision markets in mind.  

### Further reading  

- https://dynomight.substack.com/p/prediction-market-causation  
- https://www.greaterwrong.com/posts/xnC68ZfTkPyzXQS8p/prediction-markets-are-confounded-implications-for-the  
- https://www.overcomingbias.com/p/conditional-close-election-marketshtml  


Thanks to [Zack](https://x.com/zack_bitcoin), Joe, Lajarre and [Markus](https://x.com/markus0x1) for helpful discussions and feedback on this article.  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 20 min call](https://cal.com/distbit/20min)
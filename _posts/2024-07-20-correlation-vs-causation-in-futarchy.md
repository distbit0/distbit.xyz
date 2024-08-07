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




# Futarchy Strategies: Implications and Trade-offs  

This post explores various strategies for implementing futarchy and their implications, with each successive strategy attempting to address the issues of the previous one. However, as we'll see, each strategy comes with its own set of trade-offs.  

It's important to note that these scenarios assume the existence of a prediction market for whether an action will be taken, along with two child prediction markets on the effect (on a target variable such as GDP) of taking the action versus not taking it.  

# Terminology Definitions  

- **Futarchy**: A proposed method of governance where prediction markets are used to determine which actions/policies will best achieve selected goals.  

- **Child prediction markets**: Subsidiary markets created to predict outcomes of specific scenarios within the main prediction market.  

- **Target variable**: The metric used to measure the success or failure of a policy in futarchy (e.g., GDP, governance token price)  

- **Confounding factors**: Variables that influence both the independent variable (e.g., policy implementation) and dependent variable (e.g., target metric), potentially leading to incorrect conclusions about their relationship.  

- **Decision threshold**: The threshold at which the futarchy forecast of the positive impact of an action is considered strong enough to justify taking said action.  

- **p(action) and p(outcome)**: Notations representing the probability of an action being taken and the probability of a specific outcome occurring, respectively.  

- "good outcome" shares and "bad outcome" shares: For each child market, contracts that pay out if the action of said child market leads to a positive or negative outcome, respectively.   


## Strategy 1: Partial Implementation  

**Goal:** Use futarchy to inform how one should attempt to influence a decision-making process, given a desired outcome. This strategy applies when one can only partially influence rather than decide the action that will be taken.  

**Problems:**  
1. Futarchy results are subject to confounding factors. This can occur when both the probability of the action (p(action)) and the probability of the outcome (p(outcome)) are influenced by a third factor, or when the direction of the causal relationship between the action and outcome is unclear or counterintuitive.  

2. Implications of confounding factors:  
   - An external factor may be causally relevant to both the action and outcome. This causes the probability of the outcome conditional on the action to reflect both the probability of the external factor (and its impact on the probabilities of both action and outcome) and the impact of taking the action on the outcome. The former is noise for the purpose of using prices to inform decisions.  
   - The outcome might impact the probability of the action, rather than the action impacting the probability of the outcome. This causes the conditional probability of the outcome to not only reflect the impact of taking the action.  

## Strategy 2: Always Take Recommended Action  

**Goal:** Prevent a third factor from influencing both p(action) and p(outcome), by making deciding what action to take solely based on futarchy prices.  

**Problems:**  
1. The prediction market price is biased in favor of being optimistic, due to optimistic traders having higher expected returns than those who are pessimistic. This is because it is less capital efficient to hold "bad outcome" shares than "good outcome" shares, given that if the market ends up agreeing with the holder of a "bad outcome" share, the action will not be taken, preventing them from capitalising on their insights re: the effect of the action.  

2. In futarchy markets, new information asymmetrically affects bet values. Negative information can nullify the value of "bad outcome" shares by canceling the proposed action, while positive information increases the value of "good outcome" shares without limit. This asymmetry inherently favors optimistic betting, skewing futarchy forecasts. This effect is akin to "convexity" in the context of options.  
    1. The magnitude of this effect is a function of the amount of new information expected to come to light before the decision deadline. As a result, an attacker could exploit this to increase the value of "good outcome" shares for their desired action, by selecting an action with outsized uncertainty/expected volatility. One naive way of achieving this is to announce that important information relating to the proposal will be announced at some time over the course of the futarchy market.  
        1. The attacker can potentially do this while maintaining plausible deniability, as many legitimate actions naturally have high uncertainty due to e.g. the action's full implications only being realised during the course of the futarchy market.  

3. Traders have little incentive to make pessimistic bets on the outcome of an action. This is because they have little incentive to sell "good outcome" for "bad outcome" shares, if doing so causes the forecast of an action's outcome to fall below the decision threshold. If the forecast is below the decision threshold, the action will not be taken, therefore making the trader's shares worthless. The magnitude of this effect increases as the decision deadline approaches, as there is less time remaining for, and hence a lower probability of, the price moving back above the decision threshold.  
    - Or perhaps this is incorrect, as traders can not collude to keep the price of their action's child market shares above the decision threshold, and hence it is not in the interest of any particular trader to so. This is because no trader is capable of single-handedly determining whether a forecast remains above or falls below a decision threshold, thereby influencing whether an action is taken or not.  


## Strategy 3: Occasionally Take Actions Expected to Cause Bad Outcomes  

**Goal:** Make it profitable to bet that an action will cause a bad outcome. If you never take actions which are expected to cause bad outcomes, then traders will never profit from betting on them. So they need to sometimes be randomly chosen despite being expected to cause a bad outcome.  

**Problems:**  
1. "Bad outcome" shares are still less capital efficient than "good outcome" shares because they will less often be redeemable, due to bad actions only rarely being taken. This usually causes the market to revert, which effectively locks up their capital with no return, hence biasing the price in favor of "good outcome" because it has greater capital efficiency than "bad outcome" shares.  

2. The price is still biased in favor of "good outcome" due to convexity, as described in Strategy 2. This is only somewhat mitigated by occasionally taking actions expected to cause bad outcomes.  

## Strategy 4: Always Choose Action Randomly  

**Goal:** Prevent the convexity referred to in Strategy 2 by causing the probability of the action being taken to be independent of the price of the futarchy market.  

**Problems:**  
1. This strategy makes insights provided from futarchy non-actionable, hence defeating the purpose of futarchy.  

## Strategy 5: Hybrid Approach  

**Goal:** Allow futarchy insights to be used to inform which action to take, while also not distorting futarchy returns and providing optionality/convexity to owners of "good outcome" shares.  

**Implementation:** Choose the action to execute completely at random, irrespective of futarchy prices in a small percentage of cases. In all other cases, revert all trades and execute the action recommended by futarchy.  

**Problems:**  
1. This significantly reduces capital efficiency for traders, and hence also reduces the precision/sensitivity of the futarchy price discovery process to small signals. This is a result of the fact that in the vast majority of cases, all trades will be reverted, preventing traders from converting their information edge into returns on their capital.  

2. It causes there to be a trade-off between how often you can use the knowledge gained from the futarchy market (and how often you do not have to take action at random, which may be very costly) versus the minimum signal which the futarchy market prices can detect.  

## Additional Notes on Strategy 2  


1. Both the capital efficiency asymmetry and convexity effect impact the price of positive/negative shares of both actions, including the "do nothing" action. Point 2. below attempts to understand under what conditions this causes the distortions to cancel out, as opposed to adding some hard-to-isolate noise to the price signal.  

2. If the distortion of both "action" and "no action" good/bad share prices cancels out, then there will be no scenario where the market's expectation of p(good|action) > p(good|no action) and where price(good&action)/price(bad&action) < price(good&no action)/price(bad&no action) are true simultaneously. It's unclear how we can determine whether this holds.  

3. Tentatively, it seems both these effects add noise to the price, proportional to the magnitude of the effect size. They may partially cancel out but it is not clear why they should be expected to fully cancel out between the child markets for each action.  

3. The strength of both the convexity and capital efficiency asymmetry effects (described in Strategy 2) decreases as the action deadline approaches. This is because:  
   - The convexity effect is caused by the risk of new information becoming available. However, this risk diminishes as the market nears the date at which the action is taken, as less time remains for new information to emerge.  
   - The capital efficiency asymmetry effect is caused by the cost of having to lock up one's capital for the remainder of the market until the action is taken. As the action date approaches, this cost decreases.  

4. As a result of these distortions diminishing towards the decision deadline, futarchy mechanisms may benefit from placing a greater weight on more recent market prices when deciding what action to take.  

- related links  
    - https://www.greaterwrong.com/posts/xnC68ZfTkPyzXQS8p/prediction-markets-are-confounded-implications-for-the  
    - https://dynomight.net/prediction-market-causation/  
    - https://www.overcomingbias.com/p/conditional-close-election-marketshtml  

If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
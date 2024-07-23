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

## Strategy 1: Partial Implementation  

**Goal:** Use futarchy to inform how one should attempt to influence a decision-making process, given a desired outcome. This strategy applies when one can only partially influence rather than decide the action that will be taken.  

**Problems:**  
1. Futarchy results are subject to confounding factors. This can occur when both the probability of the action (p(action)) and the probability of the outcome (p(outcome)) are influenced by a third factor, or when the direction of the causal relationship between the action and outcome is unclear or counterintuitive.  

2. Implications of confounding factors:  
   - An external factor may be causally relevant to both the action and outcome. This causes the probability of the outcome conditional on the action to reflect both the probability of the external factor (and its impact on the probabilities of both action and outcome) and the impact of taking the action on the outcome. The former is noise for the purpose of using prices to inform decisions.  
   - The outcome might impact the probability of the action, rather than the action impacting the probability of the outcome. This causes the conditional probability of the outcome to not only reflect the impact of taking the action.  

## Strategy 2: Always Take Recommended Action  

**Goal:** Prevent a third factor from influencing both p(action) and p(outcome) by making p(action) solely a function of futarchy prices.  

**Problems:**  
1. The prediction market will not predict a negative outcome, as traders have no incentive to bet that an action will have a >50% probability of a negative outcome. This is because the market will revert/not resolve if the action is expected to be detrimental, due to the action not being taken. Hence, there is no incentive to bet that the action will be taken, even at the very last moment before the action is taken.  

2. The prediction market price is biased in favor of being optimistic, due to optimistic traders having higher expected returns than those who are pessimistic. If you bet that an action will have a negative effect and the market ends up agreeing with you, the action will not be taken, and you will not make any profit. You also had to lock up your capital for no return. However, if the market ends up disagreeing with you (implying you are probably wrong), the action will be taken, and you will probably make a loss.  

3. This creates negative convexity (due to the action being more likely to be taken when you are wrong) and low capital efficiency (due to not making any return when the market ends up agreeing with them) for buyers of "bad outcome" shares, and positive convexity and higher capital efficiency for buyers of "good outcome" shares.  

## Strategy 3: Occasionally Take Actions Expected to Cause Bad Outcomes  

**Goal:** Make it profitable to bet that an action will cause a bad outcome. If you never take actions which are expected to cause bad outcomes, then traders will never profit from betting on them. So they need to sometimes be randomly chosen despite being expected to cause a bad outcome.  

**Problems:**  
1. "Bad outcome" shares are still less capital efficient than "good outcome" shares because they will less often be redeemable, due to bad actions only rarely being taken. This usually causes the market to revert, which effectively locks up their capital with no return, hence biasing the price in favor of "good outcome" because it has greater capital efficiency than "bad outcome" shares.  

2. The price is still biased in favor of "good outcome" due to convexity, as described in Strategy 2. This is only somewhat mitigated by occasionally taking actions expected to cause bad outcomes.  

## Strategy 4: Always Choose Action Randomly  

**Goal:** Prevent the free-option dynamic by causing the probability of the action being taken to be independent of the price of the futarchy market.  

**Problems:**  
1. This strategy makes insights provided from futarchy non-actionable, hence defeating the purpose of futarchy.  

## Strategy 5: Hybrid Approach  

**Goal:** Allow futarchy insights to be used to inform which action to take, while also not distorting futarchy returns and providing optionality/convexity to owners of "good outcome" shares.  

**Implementation:** Choose the action to execute completely at random, irrespective of futarchy prices in a small percentage of cases. In all other cases, revert all trades and execute the action recommended by futarchy.  

**Problems:**  
1. This significantly reduces capital efficiency for traders, and hence also reduces the precision/sensitivity of the futarchy price discovery process to small signals. This is a result of the fact that in the vast majority of cases, all trades will be reverted, preventing traders from converting their information edge into returns on their capital.  

2. It causes there to be a trade-off between how often you can use the knowledge gained from the futarchy market (and how often you do not have to take action at random, which may be very costly) versus the minimum signal which the futarchy market prices can detect.  

## Additional Notes on Strategy 2  


1. The distortion is caused by holders of "good outcome" shares for a given action having a higher p(action is taken) than holders of the "bad outcome" shares. This increases their valuation of "action taken & good outcome" shares, given that said shares' price is a function of p(action is taken).  

2. The reason why "good outcome" share holders have a higher p(action is taken) than bad outcome share holders is because they expect the market to converge to their expectation of the probability of "good outcome". Hence, they expect the action is more likely to be taken, given that whether it's taken is determined by the price of "good outcome" shares.  

3. The negative convexity effect impacts the price of positive/negative shares of both actions, including the "do nothing" action. Point 4. below attempts to understand under what conditions this causes the distortion to cancel as opposed to adding some hard-to-isolate noise to the price signal.  

4. If the distortion of both "action" and "no action" good/bad share prices cancels out, then there will be no scenario where the market's expectation of p(good|action) > p(good|no action) and where price(good&action)/price(bad&action) < price(good&no action)/price(bad&no action) are true simultaneously. It's unclear how we can determine whether this holds.  

5. The strength of both the convexity and capital efficiency asymmetry effects decreases as the action deadline approaches. This is because:  
   - The convexity effect is caused by trader expectations that the market will converge to the correct answer. However, this expectation diminishes as the market nears the date at which the action is taken, as there is less time remaining for it to converge to the correct answer.  
   - The capital efficiency asymmetry effect is caused by the cost of having to lock up one's capital for the remainder of the market until the action is taken. As the action date approaches, this cost decreases.  

In conclusion, futarchy's implementation faces several challenges caused by confounders, convexity and capital inefficiency. Each strategy attempts to address specific issues, but introduces new complications.  

- related links  
    - https://www.greaterwrong.com/posts/xnC68ZfTkPyzXQS8p/prediction-markets-are-confounded-implications-for-the  
    - https://www.overcomingbias.com/p/conditional-close-election-marketshtml  
    - https://dynomight.net/prediction-market-causation/  

If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
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
title: Correlation vs causation in futarchy
---




# Potential futarchy strategies and their implications  


### sometimes take action which futarchy recommends, due to futarchy results not being binding  
- goal: use futarchy to inform how one should attempt to influence a decision making process, such as an election, to achieve a desired outcome  
- problems  
    - futarchy results are subject to confounding factors, due to it being possible that both p(action) and p(outcome) are influenced by a third factor  
        - or due to the direction of the causal relationship between the action and outcome being unclear/counterintuitive  
    - implications of confounding factors being present (any or multiple of the following):  
        - an external factor is causally relevant to both the action and outcome  
            - hence causing probability of outcome conditional on action to reflect both:  
                - probability of external factor, and its impact on probability of both action and outcome  
                    - which is noise, for the purpose of using prices to inform decisions  
                - impact of taking action on the outcome  
        - the outcome impacts probability of the action, rather than the action impacting probability of the outcome  
            - hence causing the conditional probability of outcome to not only reflect the impact of taking the action  


### always take action which futarchy recommends  
- goal: prevent a third factor from existing which influences both p(action) and p(outcome), by making p(action) solely a function of futarchy prices  
- problems  
    - traders have no incentive to bet than an action will have <50% probability of causing a bad outcome, hence causing   
    - traders have little incentive to bet that an action will cause a bad outcome, hence biasing prices to be more optimistic than is warranted  
        - this is because:  
        -  if you bet that an action will have a negative effect, and the market ends up agreeing with you, the action will not be taken and hence you will not make any profit. You also had to lock up your capital for no return.  
            - whereas if the market ends up disagreeing with you, implying you are probably wrong, the action will be taken and you will probably make a loss  
        - hence creating negative convexity (due to the action being more likely to be taken when you are wrong) and low capital efficiency (due to not making any return when the market ends up agreeing with them) for buyers of "bad outcome"  
    - however, the negative convexity effect impacts price of positive/negative shares for both actions, i.e. including the "do nothing" action  
        - does this mean the effect cancels out, or does it just mean the price of both sides is distorted in some hard to difficult-to-isolate way, therefore reducing signal:noise ratio?  
        - the distortion is caused by holders of "good outcome" shares for a given action having a higher p(action is taken) than holders of the "bad outcome" shares. (given that this scenario is "always take action which futarchy recommends")  
            - this increases their valuation of "action taken & good outcome" shares, given that said shares' price is a function of p(action is taken)  
            - the reason why "good outcome" share holders have a higher p(action is taken) than bad outcome share holders is because they expect the market to converge to their expectation of the probability of "good outcome"  
                - hence they expect the action is more likely to be taken  
                    - given that whether it's taken is determined by the price of "good outcome" shares (given that this scenario is "always take action which futarchy recommends")  
        - if distortion of both "action" and "no action" good/bad share prices cancels out, then:  
            - there will be no scenario where the market's p(good|action) > p(good|no action) and where price(good&action)/price(bad&action) < price(good&no action)/price(bad&no action) are true simultaneously  
                - how do we know whether this holds?  
    - the strength of both the convexity and capital efficiency asymmetry effects is a function of time remaining until the action is taken  
        - because it is caused by trader expectations that the market will converge to the correct answer (i.e. converge closer to what said trader believes the correct answer is)  
            - however this expectation diminishes as the market nears the date at which the action is taken, as there is less time remaining for it to converge to the correct answer, so traders have less to worry about  
                - as a result, the price becomes more accurate/less distorted as the date at which the action is taken approaches  
            


### very infrequently, take actions that futarchy expects to cause bad outcomes, otherwise take action it recommends  
- goal: make it profitable to bet that an action will cause a bad outcome. if you never take actions which are expected to cause bad outcomes, then traders will never profit from betting on them. so they need to sometimes be randomly chosen despite being expected to cause bad outcome.  
- problems  
    - this still causes "bad outcome" shares to be less capital efficient than "good outcome" shares  
        - because bad outcome shares will less often be redeemable, due to bad actions only rarely being taken. hence causing market to usually revert, which effectively locks up their capital w/ no return.  
        - hence biasing price in favour of "good outcome", because it has greater capital efficiency than "bad outcome" shares.  
    - still causes price to be biased in favour of "good outcome"  
        - because buying "good outcome" is like buying a call option. you will most of the times not incur any loss if the market ends up disagreeing with you, because the action probably won't be taken, hence causing your trade to be reverted and hence causing you no loss.  
            - another way of framing this is that whether you make a profit and whether you realise any PnL are not independent events, hence your expected PnL doesn't is higher than your expected PnL conditional on the action being taken.  


### always chose action to execute completely at random, irrespective of futarchy prices  
- goal: prevent free-option dynamic, by causing the probability of action being taken to be independent of the price of the futarchy market.  
- problems  
    - makes insights provided from futarchy non-actionable, and hence defeats the purpose of futarchy  


### chose action to execute completely at random, irrespective of futarchy prices in a small % of cases, and in all others revert all trades and execute action recommended by futarchy  
- goal: allow futarchy insights to be used to inform which action to take, while also not distorting futarchy returns and providing optionality/convexity to owners of "good outcome" shares  
- problems  
    - significantly reduces capital efficiency for traders, and hence also reduces the precision/sensitivity of the futarchy price discovery process to small signals  
    - as a result of the fact that in vast majority of cases, all trades will be reverted, preventing traders from converting their information edge into returns on their capital  
    - causes there to be a trade-off between how often you can use the knowledge gained from the futarchy market (and how often you do not have to take action at random, which may be very costly) versus the minimum signal which the futarchy market prices can detect  
        - can also trade off against the duration between the market creation and action being taken, so as to minimise capital lock up costs and hence distortion in favour of the more capital efficient direction  
    

- related links  
    - https://www.greaterwrong.com/posts/xnC68ZfTkPyzXQS8p/prediction-markets-are-confounded-implications-for-the  
    - https://www.overcomingbias.com/p/conditional-close-election-marketshtml  
    - https://dynomight.net/prediction-market-causation/  

If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
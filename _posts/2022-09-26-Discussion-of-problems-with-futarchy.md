---
articleUrl: https://distbit.xyz/Discussion-of-problems-with-futarchy
author: distbit
category: blog
date: 2022-09-26 00:00
description: An on-going discussion with @zack_bitcoin about the security of Futarchy
  against price manipulation attacks
headerImage: false
layout: post
tag:
- futarchy
- derivatives
- finance
- defi
title: Discussion of problems with futarchy
---

   
 

Source document: https://github.com/zack-bitcoin/amoveo-docs/blob/master/blog_posts/futarchys_failure.md

Distbit = Black, Zack = Grey

>>>>>Futarchy's Failure
>>>>>==============
>>>>>
>>>>>What is Futarchy?
>>>>>============
>>>>>
>>>>>Futarchy is a way for groups of people to make a decision together, where they are trying to optimize for achieving some shared goal.
>>>>>
>>>>>A couple examples of the kind of situations where we would like to use futarchy.
>>>>>
>>>>>1) The bitcoin users wanted to make a decision about whether the block size should increase.
>>>>>They could use futarchy to find out which choice results in BTC having a higher value.
>>>>>
>>>>>2) People living in a country, and they want to decide who their leader should be. The shared goal could be GDP, or whatever other measure we could want to optimize for.
>>>>>
>>>>>
>>>>>Futarchy is a kind of prediction market.
>>>>>All markets have a price.
>>>>>This price reveals information.
>>>>>Sometimes that information is useful.
>>>>>The market for futures for corn is a prediction for what the price of corn will be on some future date.
>>>>>A political betting market's price reveals the probabilities that different candidates have for winning the election.
>>>>>A sports betting market has a price that reveals the probability of which team will win.
>>>>>
>>>>>In prediction markets we are crafting a financial asset, such that the market price of that financial asset reveals something useful to us.
>>>>>For example, if we want to decide whether bitcoin blocks should be Big or Small, and we want the price to be High instead of Low.
>>>>>Then we would create these four assets:
>>>>>
>>>>>* BH - block size is Big and the price is High.
>>>>>* SH - block size small Small, the price is High.
>>>>>* BL - block size is Big and the price is Low.
>>>>>* SL - block size small Small, the price is Low.
>>>>>
>>>>>And by comparing the prices of these 4 assets traded against each other, we could find out whether a bigger block size in Bitcoin would impact the likelyhood that the BTC price will be high.
>>>>>
>>>>>Robin Hanson and Ryan Oprea did experimental research, and wrote this paper showing that prediction markets do work in some cases.
>>>>>http://archive.dimacs.rutgers.edu/Workshops/Markets/hanson.pdf?wptouch_preview_theme=enabled
>>>>>
>>>>>Robin Hanson also participated in this entertaining debate where he explains using prediction markets to make decisions. https://www.youtube.com/watch?v=Tb-6ikXdOzE
>>>>>
>>>>>The goal of this paper is to find out what exactly are the situations when futarchy works.
>>>>>
>>>>>Equations explaining when futarchy does not work.
>>>>>===========
>>>>>
>>>>>Attackers make bets that will have an expected loss. They do this to manipulate the prices in the futarchy market.
>>>>>Defenders make bets with an expected profit, and this causes the price in the futarchy market to return to being an honest signal.
>>>>>
>>>>>S = Signal. How much our shared choice determines whether we achieve our goal. If raising the block limit would increase the bitcoin price by 5%, then S=0.05
>>>>>
>>>>>P = Probability that we make the less likely choice. A number between 0 and 1. If the bitcoin community only has a 0.2% chance of increasing the block size, then P=0.002
>>>>>
>>>>>L = Liquidity. The amount of money defenders have ready to participate in prediction markets. In the context of blockchains, L is necessarily less than the market cap of the tokens in the blockchain where the prediction market happens.
>>>>
>>>>- Does S depend on amt of leverage used?
>>>>	- ah it seems S is more about correlation between choice and effect, rather than magnitude of effect resulting from the choice
>>>>		- So leverage would not help as it amplifies both signal and noise equally
>>>>- If it is profitable to defend against an attack
>>>>	- demand for the native currency may increase from speculators looking to profit from the manipulated prices
>>>>		- resulting in L increasing as a result of the value of each unit of the currency increasing
>>>>			- As a result, the current value of L might be unreliable for using to calculate whether or not enough liquidity exists to defend against an attack
>>>>				- As L may increase if an actual attack were to occur, due to increased demand.
>
>You mentioned the idea that if the market cap is too low, defenders will buy coins and push up the price so it will be higher, and then more collateral is available to defend with.
>
>But, this effect has a limit.
>The reason the price of the coin increases is because defenders can earn say, 1.1 coins after the market for every 1 coin they had before the market.
>So the coin can be worth 1.1x more.
>After the market happens, the price drops back down 10% to where it was before.
>So how it looks for most participants is that they spend $100 to get 90 tokens. They win an expected 100 tokens. And they can sell those 100 tokens for $100.
>Other participants would sell their veo for dollars before the market, and buy back their veo after the market. Acting as a restoring effect, so the market cap of veo doesnt grow too much.
>The people who are trying to defend veo are mostly just paying a tax to people who hold dollars during the market.
>>>>
>>>>>
>>>>>X = amount of money an attacker is willing to lose to manipulate the market.
>>>>>
>>>>>I = interest rate in cryptocurrency for the duration of the market. If you can earn 20% a year by lending your VEO, and the market will last for 3 months, then the for 3 months is around 4.7%, so I=0.047
>>>>
>>>>- Doesn't this assume that PM shares do not use yield bearing collateral?
>>>>	- As if yield bearing collateral assets were used, the opportunity cost of locking capital in the PM would only be:
>>>>		- The difference between returns/interest earned from the supported collateral assets
>>>>			- and the interest/returns a speculator expects they might have been able to earn in investments which can not collateralise the PM contracts
>>>>				- E.g. they might think they could make a higher return by investing in their local real estate market, but might not be able to use real-estate as collateral in the PM contract
>>>
>>>using a yield bearing asset to collateralized the prediction market.
>>>There is no free lunch.
>>>If the asset is expected to increase in value, then it is necessarily more volatile to counter that. 
>>
>>Why is this? Does this also apply to assets such as bonds and compoundEth (tokens on eth which are redeemable for tokens being loaned out)?
>
>All investments are in the market for investments. People move their money to whatever gives the best return, but also need to account for the risks.
>
>As more people pile into an investment class, it is a bigger group of people dividing the reward of an industry into smaller slices per investor.
>Each part of the exonomy has an ideal amount of capital it needs to grow efficiently, relative to the other parts of the economy.
>So the effect of people jumping between investments for individual benefit, it means that a rising price necessarily comes with more volatility, or some other kind of risk.
>>
>>>The extra volatility adds more noise, and makes it harder to detect the signal we want.
>>>
>>>It comes down to subjective values. Like, if you live in a part of the world that is denominated in USD, and your expenses are all in USD, then it might be more convenient for you to have your bets also denominated in USD. 
>>>
>>>If you are already going to hold BTC anyway, then the volatility from using some BTC as collateral doesn't matter to you.
>>>
>>>>>
>>>>>Attack succeeds due to inprofitabilty of defence, if
>>>>>```
>>>>>(profit of defense) < (cost of defense)
>>>>>S * P < I
>>>>>```
>>>>
>>>>- Profit should probably be changed to revenue here, for clarity. Profit usually = revenue - costs.
>>>>
>>>>- I think I understand how cost of defence is calculated better than I understand the revenue part
>>>>	- E.g. the costs are the capital lockup/opportunity costs
>>>>		- If this is the case though, wouldn't it make more sense for the inequality to be:
>>>>			- `S < I / P`
>>>>				- As I would have thought that P relates more to the costs, given that it determines how much capital is required, and therefore how high the capital costs are
>>>>					- I think if it was written this way, I would have more quickly understood at least this aspect of the inequality 
>>>>- Regarding revenue of attack, I would have thought the primary factor here be how much the PM share is mispriced. E.g. if the expected value is 0.95 but the current price is 0.90, then the return on investment is 0.95/0.90=105.5% of principle. 
>>>>	- So therefore the I would need to be less than this (assuming the collateral asset is not yield bearing, as mentioned above)
>>>>		- I do not really see the relevance of P here though, given that the revenue scales with the size of the position. 
>>>>			- So wouldn't a low P just mean that a larger position is necessary in order to defend
>>>>				- Resulting in P multiplying the revenue term and the interest costs term equally?
>>>>					- Therefore cancelling out the P term?
>>>>						- If this is correct, the equation would be `M < O` where `M` is the mispricing % and `O` is the opportunity cost of the capital (not the same as the interest rate, as the collateral can be yield bearing)
>>>
>>>### Why does the probability of the less likely choice impact the accuracy of the prediction market?
>>>imagine we have a futarchy to see if Elon Musk being president would be good for the economy.
>>>There is only a 0.1% chance that Elon wins the election, and a 0.05% chance that he wins, and then the economy improves, a 0.05% chance that he wins, and the economy gets worse.
>>>So, it looks like he has a 50% chance of improving the economy, if he wins.
>>>
>>>The total money in the market is $1 billion.
>>>So, total outstanding shares saying that elon wins are worth $1 million.
>>>
>>>If I used $1/2 million to raise the chance of him improving the economy, now it looks like he has a 66% chance of improving the economy.
>>>
>>>It would have taken like $250 million to have a similar impact on odds of improving the economy for a candidate that is more likely to win.
>>>
>>>If a defender wants to profit by fixing the odds, there is no capital efficient way to do it.
>>>If they bet that Elon wins, and he harms the economy. Then they are betting that he will win, and at a bad price. If they try to buy all the other shares, to cancel out their bet on Elon, then they need to spend 1000x more than the attacker to move the price the same distance.
>>
>>- I understand and agree with all of this. 
>>	- I was not disputing the relevance of P to your second equation (required capital for successful a defence to be possible).
>>		- But rather, I was disputing its relevance to the first equation (relating to the profitability of defence)
>>			- See my comments above for why I am disputing its relevance (quoted below)
>>
>>```
>>- Regarding revenue of attack, I would have thought the primary factor here be how much the PM share is mispriced. E.g. if the expected value is 0.95 but the current price is 0.90, then the return on investment is 0.95/0.90=105.5% of principle. 
>>	- So therefore the I would need to be less than this (assuming the collateral asset is not yield bearing, as mentioned above)
>>		- I do not really see the relevance of P here though, given that the revenue scales with the size of the position. 
>>			- So wouldn't a low P just mean that a larger position is necessary in order to defend
>>				- Resulting in P multiplying the revenue term and the interest costs term equally?
>>					- Therefore cancelling out the P term?
>>						- If this is correct, the equation would be `M < O` where `M` is the mispricing % and `O` is the opportunity cost of the capital (not the same as the interest rate, as the collateral can be yield bearing)
>>
>>```
>
>If the attacker can invest $1 to make it look like elon musk would be a good president, and it costs me $1000 to bet against that and put the price back, then my expected return for locking up my $1000 is to win a fraction of your $1.
>
>So defenders in this example would be betting that elon wins, and he helps the economy.
>
>But he only has a 0.01% chance to win. It is like buying a lotto ticket.
>If he does win, your ticket is super valuable, whether he looks good for the economy or not.
>
>Maybe it does make sense for the defenders to buy just that one share without hedging in-protocol by buying $999 of elon-loses.
>
>If defenders did show up to bet this way, and no one bought 1000x more shares of elon-loses to maintain the balance, then the market would incorrectly show that elon has like  10% chance of winning.
>
>Thinking about the elon example.
>What if the defenders buy up shares of "elon wins, and the economy improves"?
>That is the same thing as taking on a high leverages bet that elon will win, and a 50-50 bet that the economy will improve.
>You are betting the same amount in both, but the elon wins part is highly leveraged.
>So lets imagine the probability that elon will win is actually 0.1%.
>But the attacker bought so many shares of "elon wins and economy suffers", that the market says elon has a 5% chance of winning.
>If you try to fix the market, you are taking on a 1000 to one bet, at odds 50x worse than market rate, to bet that elon will win.
>And you are taking on a 50-50 bet that the economy will improve.
>Even if you are expected to earn a profit on the economy improves part of the bet, that doesnt make up for how much you are losing on the elon wins part of the bet.
>So that is why it is capital intensive to defend against these attacks.
>That capital lockup cost loses money by the inflation rate. So that is why if the signal=S is worse, it costs more to defend.
>
>>>The point of this example is to show that if an event is less likely to occur, then it is cheaper for an attacker to manipulate what the prediction market says is the impact of that event.
>>>
>>>>- I would v much appreciate an explanation of how S relates to the attack revenue
>>>>	- I do not understand how this is the case, at the moment.
>>>>	- Also am I correct in saying that S represents the "correlation" between the effect and the outcome
>>>>		- I do not concretely understand what S represents tbh.
>>>>			- I think an example of a defence which makes reference to S and how it affects defence revenues would help a lot
>>>>				- Thx
>>>
>>>S is the signal to noise ratio.
>>>
>>>Like, imagine that you are betting on a coin that has 60% odds of being heads. and you are betting double-or-nothing.
>>>How much of your funds would you risk on each round to optimize your growth?
>>>
>>>You don't bet 100%.
>>>This is the kelly criterion.
>>
>>- This also seems to describe the importance of S in relation to the second equation (required capital for successful a defence to be possible)
>>	- However, I was asking how S is relevant to the first equation (specifically how it determines the revenue of a defence)
>>		- I.e. how it relates to this inequality: `S * P < I`
>>			- I elaborate below (quoted from above) on how I think the revenue of defence should be determined:
>>
>>```
>>- Regarding revenue of attack, I would have thought the primary factor here be how much the PM share is mispriced. E.g. if the expected value is 0.95 but the current price is 0.90, then the return on investment is 0.95/0.90=105.5% of principle. 
>>	- So therefore the I would need to be less than this (assuming the collateral asset is not yield bearing, as mentioned above)
>>		- I do not really see the relevance of P here though, given that the revenue scales with the size of the position. 
>>			- So wouldn't a low P just mean that a larger position is necessary in order to defend
>>				- Resulting in P multiplying the revenue term and the interest costs term equally?
>>					- Therefore cancelling out the P term?
>>						- If this is correct, the equation would be `M < O` where `M` is the mispricing % and `O` is the opportunity cost of the capital (not the same as the interest rate, as the collateral can be yield bearing)
>>```
>
>Oh right. I gave the explanation for the wrong part.
>If the signal is 2x worse, then your expected payout per unit of capital invested per round is 2x lower.
>The signal is your edge. Your edge is your expected profit per unit invested per round.
>
>
>Right. For this example we want p to be 0.5. So it doesnt mix the P example with the S example.
>
>So its biden vs trump then. Lets imagine biden is 20% more likely to achieve our economic goals. And they are equally likely to win the election.
>So the probability square is:
>Economy good bad 
>Biden 30 20
>Trump 20 30
>The attacker buys shares saying "biden wins and the economy fails." They buy shares of "trump wins and the economy improves".
>They move the price until the square is like:
>25 25
>25 25
>So, the attackers average bet is expected to lose 10%. (S/2)
>If denfenders do the opposite bets to defend, then their average bet is expected to earn 10%. (S/2)
>So, if a 10% prize is enough incentive to leave veo locked up in the market for a while, then it works as a prediction market.
>If S was 2x bigger, the defenders could earn twice as much on their average bet.
>
>>>
>>>>
>>>>>P is because it is liquidity inefficient to move the price by buying the more expensive type of share. If defenders need to spend 2x as much to move the price the same distance, then the defenders are losing interest on 2x as much money.
>>>>>S is because the attacker is only expected to lose S portion of his funds, so the defender can only expect to earn that much.
>>>>>I is because the defender expects to lose this much while waiting for the prediction market to settle.
>>>>>
>>>>>
>>>>>Attack succeeds due to defenders having insufficient funds to defend, if 
>>>>>
>>>>>```
>>>>>(defenders have) < (defenders need)
>>>>>(S * L) < (X / P)
>>>>>-> (S * P) < (X / L)
>>>>>```
>>>>>
>>>>>The S is because we are expecting the defenders to use a profit maximizing strategy. They want to hedge against the risk that the result of the market is determined by something other than the decision futarchy is making. Kelly's criterion says that investing only S portion of their funds is the most profitable strategy for defenders https://en.wikipedia.org/wiki/Kelly_criterion
>>>>
>>>>- What if L is not the entirety of the defender's funds? E.g. what if they have funds/some of their portfolio outside of the blockchain?
>>>>	- E.g. if it was a hedge fund where their veo/btc holdings were only a small % of their folio, the assumption that it represents their entire portfolio would not hold
>>>
>>>oh, you make a good point.
>>>If the defenders have money outside the blockchain to hedge with, then they may invest more of their VEO in comparison to what the kelly criterion would calculate.
>>>So L could be bigger than the market cap of VEO.
>>
>>Yeah exactly :)
>>>
>>>>>
>>>>>P is because the defenders are buying the more likely outcome, so they need to invest more money to move the price a smaller distance.
>>>>>
>>>>>If both equations are false, then futarchy works.
>>>>>
>>>>>examples
>>>>>=========
>>>>>
>>>>>If we want to use futarchy to increase the bitcoin block reward.
>>>>>The likelyhood that the reward will increase is very low, the bitcoin community cares a lot about not increasing it. Only a 1 in 200 chance.
>>>>>So P = 0.005.
>>>>>The market needs to last a few months, so we can see the effect of the new block reward on the price. Due to volatility, the interest rate over that period is estimated at 5%.
>>>>>So I = 0.05.
>>>>>The BTC price is influenced by a lot of things besides the block reward. So S is probably very low. But for arguments sake, lets estimate S as the highest value possible. This would be the case if the BTC price is 100% determined by whether we raise the block reward or not.
>>>>>So S = 1.
>>>>>
>>>>>Now we have enough variables to know if participating in the defense for this futarchy market will be profitable.
>>>>>If S*P<I, then defenders will not participate.
>>>>>```
>>>>>(S=1)*(P=0.005)<(I=0.05)
>>>>>1*0.005<0.05
>>>>>0.005<0.05
>>>>>```
>>>>>So, it is not profitable for anyone to participate in this futarchy market. The price of this futarchy market is not an indicator of how changing the block reward of Bitcoin will influence the price of BTC.
>>>>>
>>>>>But lets continue the example anyway, and see how much liquidity would be needed for the defenders to block this attack.
>>>>>If we are using Amoveo to host this futarchy market, then L is at most the market cap of Amoveo. So lets estimate L as around one million dollars.
>>>>>L = $1 000 000
>>>>>
>>>>>The attacker is actually someone who owns a lot of BTC mining hardware, and they stand to profit substantially if the block reward were increased. He expects to earn ten thousand dollars.
>>>>>X = $10 000.
>>>>>
>>>>>The attack succeeds if
>>>>>(S * L) < (X / P)
>>>>>(1 * $1 000 000) < ($10 000 / 0.005)
>>>>>$1 000 000 * 0.005 < $10 000
>>>>>$5 000 < $10 000
>>>>>
>>>>>So this shows that the defenders do not have sufficient funds to prevent the attack. The attacker would successfully manipulate the futarchy market, and it would only cost him $5000, which is 1/2 of the money he is willing to lose to manipulate this market.
>>>>>
>>>>>
>>>>>What can we do to make futarchy accurate?
>>>>>=============
>>>>>
>>>>>First off, never trust the result of a futarchy market if either of these 2 inequalities are true.
>>>>>
>>>>>Futarchy is more accurate if the signal is stronger. So that means when we are making the financial asset fo rthe futarchy market, we want to cancel out noise as much as possible.
>>>>>Looking at the example of futarchy to increase the bitcoin block reward, instead of asking "Is the price of BTC above $40k?", it would be better to ask "Is the price of bitcoin above 13 ETH?".
>>>>>Because a lot of things that would cause BTC to move would also cause ETH to move, there is less noise, so S is higher.
>>>>>
>>>>>Futarchy is more accurate if we are making a decision between 2 choices, and the likelyhood of each choice is nearly the same.
>>>>>This makes futarchy a kind of self-fulfilling prophesy. It works better for groups of people who believe in it more.
>>>>>It is like the pixie dust from Peter Pan. Which granted the ability to fly, but only to people who believed in it.
>>>>>If this futarchy market only exists to give advice to someone else who has real control, and they already made their decision, and they will ignore whatever the futarchy market says, then P=0, and it is almost free for an attacker to manipulate the result.
>>>>>
>>>>>Futarchy is more accurate when I is lower. So it is better to use a currency with very low volatility for the bet. A stablecoin. And it is better if the bet lasts for the least time possible.
>>>>>
>>>>>Futarchy is more accurate if L is bigger. So when choosing the currency for making the futarchy market, it is better to use a currency with a higher market cap. And it is better to use a currency where a larger portion of the holders are interested in participating in a futarchy market where they will earn expected profit.
>>>>>
>>>>>Futarchy is more accurate if X is smaller. So when using futarchy to make decisions, it is better if there are no individuals who can earn or lose a large amount of money based on which decision is made. We should try to format our decisions so that there are no winners or losers. Instead we want to make decisions that result in mutual benefit vs mutual loss. Basically, try to minimize corruption in the decision making processes.
>>>>>
>>>>>Applying the formula to famous examples of futarchy: Paul Sztorc's political prediction markets.
>>>>>================
>>>>>
>>>>>[In this video, Paul Sztorc describes a plan to use futachy to better select a US president.](https://www.youtube.com/watch?v=dJLYRADcPP4) go to the 18 minute mark to see the chart.
>>>>>
>>>>>Sztorc's idea is to make a conditional prediction market comparing (whether or not the economy is good) and (who is elected president).
>>>>>In his example, the odds that Elon Musk gets elected is very low, but the conditional probability that the economy will be good in that case is 100%.
>>>>>
>>>>>Is this a valid prediction market, or is it vulnerable to being manipulated?
>>>>>Estimating some values.
>>>>>
>>>>>S = 0.5 (really hard to believe that one person could have more than 50% impact on whether the economy is good.)
>>>>>
>>>>>P = 0.009 (reading it off the chart at the 18 minute mark in the video.)
>>>>>
>>>>>L = $400 billion. (market cap of bitcoin)
>>>>>
>>>>>X = $70 million (obama's net worth at the end of his presidency)
>>>>
>>>>lol
>>>>>
>>>>>I = 10% annual (my rough guess.)
>>>>>
>>>>>Is it profitable to defend?
>>>>>```
>>>>>S * P > I
>>>>>0.3 * 0.009 > 0.1 
>>>>>-> 0.0027 > 0.1
>>>>>```
>>>>>
>>>>>So what this shows is that during a manipulation, you would be losing money to try and bet against the manipulator.
>>>>>Even if you are 100% certain that a manipulation is happening, it is not in your interest to try and fix that manipulation.
>>>>>
>>>>>Do we have enough money on hand to defend it?
>>>>>```
>>>>>(S * P) > (X / L)
>>>>>(0.5 * 0.009) > ($70 / $400000)
>>>>>0.0045 > 0.000175.
>>>>>```
>>>>>
>>>>>So, we do have enough money to defend the market.
>>>>>
>>>>>Applying the formula to famous examples of futarchy: Robin Hanson's business prediction markets
>>>>>=====================
>>>>>
>>>>>Robin Hanson did a lot of research into prediction markets. He invented the idea of futarchy.
>>>>>
>>>>>His suggestion for people experimenting in futarchy is to take the 100 biggest businesses, and to ask about each one, whether the CEO is helpful for the stock price, or if changing CEO would be better for the stock price.
>>>>>
>>>>>Specifically, we are measuring the correlation between these 2 possible events:
>>>>>1) whether the CEO is fired.
>>>>>2) whether the stock finishes a 365 day period at least 5% higher than the start.
>>>>>
>>>>>If we made such a market, would it be secure against manipulation? Or could an attacker profitably manipulate it? Lets see.
>>>>>
>>>>>S = 20% (Whether the stock increases depends on the interest rate, the economy, many things. One person can only matter so much.)
>>>>>
>>>>>P = 5% (To make futarchy more feasible, the business would automatically fire the CEO 5% of the time. That way P isn't too near to zero, and maybe they can measure something useful.)
>>>>>
>>>>>L = $200 trillion. (Robin's suggestion is to not use a blockchain. Theoretically, anything of value could be used as collateral to bet in the market, so L has got to be the total value of everything owned by humans.)
>>>>>
>>>>>X = $200 million. (typical ceo career lasts 10 years. walmart ceo makes around $20 million).
>>>>>
>>>>>I = 1.5% (current interst rate on USA federal bonds)
>>>>>
>>>>>Is it profitable to defend?
>>>>>```
>>>>>S * P > I
>>>>>0.2 * 0.05 > 0.015
>>>>>0.01 > 0.015
>>>>>```
>>>>>
>>>>>It is not profitable currently. Even if you are 100% certain that there is a manipulation and you will win the bet, you are still going to earn more profit by buying government bonds instead of participating in this market.
>>>>>
>>>>>
>>>>>Do we have enough money on hand to defend it?
>>>>>```
>>>>>(S * P) > (X / L)
>>>>>(0.2 * 0.05) > (1 / 1000000)
>>>>>(0.01) > 0.000001
>>>>>```
>>>>>yes, there is enough money on hand to defend the market against manipulation.
>>>>>
>>>>>Applying the formula to election betting odds.
>>>>>=======================
>>>>>
>>>>>(Robin Hanson recommends using election betting odds as futarchy to know who should get nominated for running for president.)[https://twitter.com/robinhanson/status/1546864159765082115?s=20&t=9Bil2RCd6T-R2AiL_P1aBQ]
>>>>>
>>>>>This is measuring the correlation between:
>>>>>1) who is republican nomination for president.
>>>>>2) whether the republican nominee wins the election.
>>>>>
>>>>>Is this market secure against manipulation? Or can one of the candidates manipulate it to make it seem like they are a better choice than they are?
>>>>>
>>>>>S = 10% (looking at the odds currently, the difference between the top choices is 10%. So according to this data, the signal of who is selected as nominee should have about 10% influence on whether the republicans win.)
>>>>>
>>>>>P = 40% (the least likely option is currently at 40%.)
>>>>>
>>>>>L = $400 million. (the amount bet in the 2020 election. There are limits on how much each person can bet.)
>>>>>
>>>>>X = $70 million. (obama's net worth after presidency)
>>>>>
>>>>>I = 8.6% (current usa inflation rate. Not worth investing if you can't earn at least this.)
>>>>>
>>>>>Is it profitable to defend against manipulation?
>>>>>```
>>>>>S * P > I
>>>>>0.1 * 0.4 > 0.015
>>>>>0.04 > 0.086
>>>>>```
>>>>>
>>>>>So it is not profitable to participate in this market, even if manipulations are happening.
>>>>>
>>>>>Is there enough money available to stop manipulations?
>>>>>```
>>>>>(S * P) > (X / L)
>>>>>0.1 * 0.4 > 7/40
>>>>>0.04 > 0.175
>>>>>```
>>>>>
>>>>>So there is not enough money available to stop manipulations, if they do occur.
---
title: "Notes on curve v2"
layout: post
date: 2023-01-21 00:00
headerImage: false
category: blog
author: distbit
description:
articleUrl: https://distbit.xyz/Notes-on-curve-v2
---

- opp cost of lps is IR
	- can't you use yield bearing lp liquidity?
- two primary types of IL
	- (Type 1) Rebalancing opp-cost
		- cost of re-balancing one's portfolio @market prices if price moves in single direction
			-  same as short gamma
				- which basically means you hold less of an asset as it increases in value, and more as it decreases
		- forgone profit from a hypothetical rebalancing portfolio with trading with perfect execution prices
	- (Type 2) Poor execution price costs
		- poor execution price which LPs implicitly pay arbs when rebalancing their portfolio
- auto re-balancing
	- costs gas
	- crystalises losses (no longer impermanent)
	- auto rebalancing does not refer to rebalancing to equal holdings of both assets
		- but rather to the pricing of one's position
- longer concentrated position is held for, more likely price is to move outside range resulting in max IL
- passive liquidity in v3 
- curve v2
	- adjusts anchor price via oracle
	- curve around anchor price is avg of const prod and sum curves adjusted by continually changing weights
	- higher tx fees for trades which push price away from anchor price
	- liquidity distribution only updated when 
		- profits accrued at last price are greater than 2x nominal losses which would result from updating price to new price
			- apparently to minimise risk of oracle price manipulation resulting in LPs offering arbs very favourable prices 
- Why does Curve v2 IL track uni v2 IL?
	- (Type 1) Portfolio of curve v2 is still ~= a rebalancing portfolio between pool assets
		- as is univ2
		- A univ3 spread position can be thought of as a very aggressive rebalancing portfolio, i.e. one where you rebalance extremely vigorously towards asset which is falling in value.
			- Curve v2 or active management of v3 positions effectively mitigates this effect by buying back the asset which you were forced to sell, therefore approximating a standard rebalancing portfolio such as univ2
	- (Type 2) presumably a curve v2 pool of the same pair would experience similar execution prices as LPs on Univ2, as both rely on internal oracle which can only be updated by way of arbitrage,,,
		- There might be more to this though.
- Ceteris paribus, doesn't the rebalancing implemented by curve v2 result in lower gama exposure than same position without rebalancing on v3?
	- given that rebalancing involves buying the asset which is increasing in order to re-acquire an even position.


- regarding whether Curve v2 is able to minimise LP losses resulting from "arbitrage extractable value"/(IL Type 2)/poor execution pricee
	- Both of the following:
		- the price at which curve v2 concentrates liquidity
		- the price at which curve v2 offers trades to traders
		- are determined by trader activity rather than an external oracle I.e. they require arbitrage in order to be updated
		- The extent to which Curve v2 is able to approximate the "optimising oracle" relative to say univ2 is dependent on how well it is able to solicit from arbitragers when its price should be changed, while minimising the profit from arbs from providing this information
		- I.e. the extent to which it can use arbs as a kind of oracle for the correct external market price, while paying the arbs $0 for this information (in the limit)
			- It seems the way in which curve v2 only infrequently updates the price at which liquidity is concentrated kind of works towards this end
				- i.e. it causes arbs to not get very good execution if they want to move the trading price due to the external market price changing
				- because the liquidity doesn't move to said new external market price until a the profit/2>impliedLossFromNewPrice criteria has been met
				- so until the liquidity moves to the new price, the arbs will have poorer execution or at least will have less "depth" to trade against
- consequently:
- The higher we set the following variables:
	- min price adjustment step=minimum price change for liquidity concentration price to be updated
	- MA half time = time scale used to calc EMA to inform liquidity concentration price
	- allowed extra profits = (directionally) how much of our accrued profits must remain when re-calculated using the new liq concentration price
- The less value arbs will be able to extract from LPs when arbing to reflect external market prices (or in the case of increment's pools: to reflect a change in the funding rate).
	- However ofc the trade-off is that if these params are set too high, liquidity will become too low for non-arb traders.



Links:

http://192.168.0.28:8887/tweetThreads/1532335798519050240.html  
https://semaji.substack.com/p/in-the-long-run-we-are-all-dead-the?utm_source=twitter&s=r  
https://research.thetie.io/defi-101-curve-finance/  
http://192.168.0.28:8887/tweetThreads/1404496489703952384.html  
https://scribe.rip/@DeFiScientist/rebalancing-vs-passive-strategies-for-uniswap-v3-liquidity-pools-754f033bdabc  
https://polygontech.scribe.rip/the-benevolent-dictator-10c897cb154c  
https://defining.substack.com/p/deep-dive-1-amms  
https://alvarofeito.com/articles/curve/  
https://joecontent.substack.com/p/part-2-a-brief-look-into-2nd-generation  
https://frogsanon.neworder.network/articles/trader-joe-v2-the-liquidity-book  
https://nagaking.substack.com/p/deep-dive-curve-v2-parameters  
https://efalken.substack.com/p/amms-are-broken?r=n11wk&s=r&utm_campaign=post&utm_medium=web  
https://www.youtube.com/watch?v=G8qxxlqvMBk
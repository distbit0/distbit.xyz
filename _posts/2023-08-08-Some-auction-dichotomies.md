---
articleUrl: https://distbit.xyz/Some-auction-dichotomies
author: distbit
category: blog
date: 2023-08-08 00:00
description: ''
headerImage: false
layout: post
tag:
- finance
- auctions
- defi
title: Some auction dichotomies
---

     

### Distinctions between types of auctions/competitions.
#### Whether auction has reserve price (`reservePrice`=true/false)

- special case of this is when it is impossible to attain reward, resulting in an implicit infinite reserve price
- when auction has no reserve price, reward is guaranteed to be earned
	- however there can be no guarantee that costs expended by bidders = reward
		- rather, the difference between total costs expended by bidders and total reward is a function of the heterogeneity of the bidders' costs 
			- i.e when all bidders have almost the same costs, they make ~0 profit and total bidder cost = total reward.    


#### Whether bidder with lowest average cost for entire task is subject to competition from bidders with lower marginal costs for fractions of the task (`workDivisible`=true/false)

- equivalent to: whether it is possible the marginal costs of the contributor to be higher than the marginal cost of any non-contributors
- this significantly reduces the competition for the auction
	- as the pool of competitors is reduced from those with marginal cost for a fraction of the task that is lower than the clearing price
		- to only those who's marginal cost for the entire task is lower than the clearing price 
	- i.e. this is the case where in order to participate:
		- rather than simply needing a lower marginal cost for a subset of the task, than any of the current participant(s),
			- you actually need a lower marginal cost for the entire task than any of the current participant(s)
				- or in other words, a greater output for the same reward, given that the entire reward is allocated to the winning bidder



### Analysis of various instances
- reservePrice = true, workDivisible = true
	- not guaranteed to receive bids, work efficiently allocated amongst bidders
	- examples:
		- extraction of gold in ocean
		- euler liquidations
- reservePrice = true, workDivisible = false
	- not guaranteed to receive bids, work inefficiently allocated to single bidder
	- examples:
		- fixed-discount full liquidation auctions
- reservePrice = false, workDivisible = true
	- guaranteed to receive bids, work efficiently allocated amongst bidders
	- examples:
		- PoW
		- PoS
		- treausury auctions
		- Dai CDP liquidation auctions
- reservePrice = false, workDivisible = false
	- guaranteed to receive bids, work inefficiently allocated to single bidder
	- examples:
		- Proof of VDF





If you found this interesting, have feedback or are working on something related, let's get in touch: [@0xdist](https://twitter.com/0xdist) or [schedule a 30min call](https://cal.com/distbit/30min)
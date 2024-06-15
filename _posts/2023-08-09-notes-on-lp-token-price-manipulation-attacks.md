---
articleUrl: https://distbit.xyz/notes-on-lp-token-price-manipulation-attacks
author: distbit
category: blog
date: 2023-08-09 00:00
description: ''
gist_url: https://gist.github.com/aa0a56574bdd8720223bf3c154565992
headerImage: false
layout: post
tag: []
title: LP token price manipulation attacks
---




The below are some notes on various types of LP token price manipulation attacks. Some of this may assume certain background knowledge, most of which can be found in the linked attack explanations.  

- [read-only re-entrancy](https://chainsecurity.com/curve-lp-oracle-manipulation-post-mortem/) curve  
	- explanation   
		- only works if one of the assets supports callbacks (i.e. erc777, erc677 or ETH)  
		- when lp tokens are burned, the lp token supply is reduced before all of the erc20 collateral is sent to the user  
			- as the burn function returns the underlying erc777 tokens to the LP  
				- a callback hook on the erc777 token is executed and used to carry out a read-only re-entrancy attack   
					- on a contract which supports the LP token in question as collateral.  
						- This contract then calculates a manipulated price for the LP token  
							- due to temporary distortion of ratio between lp token supply and reserves  
	- mitigation  
		- ensure that none of assets in pool are ETH, ERC-677 or ERC-777  
			- i.e. tokens with callbacks for recipient (when the manipulation involves removing liquidity) and callbacks to sender (when the manipulating involves adding liquidity)  
		- call state altering function on lp token contract when reading from LP contract  
			- in order to trigger its re-entrancy guard  
- [high price impact flash loan liquidity manipulation](https://cmichel.io/pricing-lp-tokens/)  
	- explanation  
		- affects lp token pricing implementations which incorrectly assume amm is balanced  
			- i.e. those which price LP tokens according to the market value of their reserves without either:  
				- requiring that the total value of both reserves are equal  
				- substituting the actual reserve amounts with a set of hypothetical reserve amounts  
					- which have the same product (K) as the original amounts, while also being of equal value  
		- attack consists of:  
			- a large trade being made in the LP token's market prior to the price reading  
				- resulting in the LP reserves becoming in-balanced (no longer of equal value)  
				- resulting in the total market value (based on the chainlink price of each reserve asset) of both reserves increasing significantly  
					- as a result of the trade experiencing high price impact, and hence effectively donating to the reserves  
			- once the reserves have been manipulated, the attacker then interacts with the targeted lending protocol by:  
				- depositing the LP tokens as collateral, allowing the attacker to borrow an amount greater than the true value of their LP tokens, and never repay their loan  
					- (as long as the % by which they increased the LP token's value is greater than the overcollateralisation ratio of the lending market)  
			- once they have taken out their highly profitable loan, they then undo their trade on the AMM, making back the costs they initially incurred in the form of price impact  
	- mitigation  
		-  [use fair lp token pricing formula](https://blog.alphaventuredao.io/fair-lp-token-pricing/)  
- [donation](https://blog.lodestarfinance.io/post-mortem-summary-13f5fe0bb336) [attack](https://blockauditreport.medium.com/lodestar-finance-6-5-million-exploit-decrypted-blockaudit-675026b9dd12)  
	- requires attacker to have exposure to LP token > mktcap of lp token  
		- so that an $x donation to the LP contract results in > $x profit for the attacker (otherwise donating would be unprofitable)  
		- which requires them to be able to borrow the collateral they deposit  
			- i.e. this attack is not possible on protocols where collateral can not be borrowed  
				- such as fringe or stablecoin platforms which do not lend out or yield farm collateral  
	- do not support highly volatile assets as collateral and capital simultaneously:  
		- supporting highly volatile assets as:  
			- capital: upwards price movement > risks incurring loss for lenders of this asset  
			- collateral: downwards price movement > risks incurring loss for lenders of other assets  
			- collateral and capital: upwards price movement > risks incurring loss for entire platform   
				- importantly, the collateral being borrowed against is loaned out, hence not guaranteed. if only guaranteed collateral was allowed to be borrowed against, the externalisation of the bad debt to the lending platform would not be possible.   
	- this attack basically consists of someone lending a capital asset  
		- and their borrowers defaulting due to the capital asset appreciating faster than borrowers can be liquidated  
			- (in this case, the lender and borrower happen to both be the attacker)  
			- usually this would be the end of the story, harming only the lender (attacker)  
				- however in this attack scenario, the loss of the lender is externalised onto the platform  
					- as they are allowed to borrow against their now (bad/unrecoverable) loaned assets  
						- therefore saddling the platform rather than themselves with the bad debt  
	- can this attack affect lenders and borrowers of assets other than the assets having their prices manipulated?  
		- yes, it affects lenders of whatever assets the attacker decides to borrow using the manipulated asset as collateral  
			- or potentially all lenders if the platform decides to socialise losses (this will vary on a per platform basis)  
	- how can these be mitigated while still allowing for lending of collateral assets?  
		- do not support assets which can change very quickly in value  
		- do not allow deposited qty of collateral asset to be > asset's supply (very hard to enforce this in practise)  
		- do not allow borrowers to borrow against collateral asset which has accrued significant bad debt  
		- use pessimistic oracle to price collateral for borrowing  
			- so that attack can not borrow in same tx as they manipulated  
				- and platform has time to stop bad debt from spreading from their account to the rest of the platform  
		- do not update price using price data only made available in the current block  
			- (although I do not believe flash loans deserve to be subject to such discrimination)  
			- this also does not address the root cause, as the attack is possible (just more capital intensive/expensive) without flash loans  
	- can other lending protocols be affected by this attack even if they implement mitigations, due to another protocol being exploited?  
		- if they support asset as collateral, lenders of the asset will incur bad debt/defaults, but still be ok due to collateral still covering the original value of the assets  
		- if the lenders of the asset can borrow against their bad debt, the platform will incur bad debt  


Thanks to [Torgin](https://twitter.com/MTorgin) for explaining the donation attack mechanism.  

If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
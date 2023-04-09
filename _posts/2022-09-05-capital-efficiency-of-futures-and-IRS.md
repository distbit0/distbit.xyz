---
title: "Capital efficiency of futures and IRS contracts"
layout: post
date: 2022-09-05 00:00
headerImage: false
category: blog
author: distbit
description: Analysis of collateral required by IRS contracts
---

There are three types of margin which IRS contracts require:
- matured cashflow margin: margin which covers the delta between the cashflows (so far)
	- e.g.
		- if the avg variable rate so far has been 5% and the fixed was 1%
		- notional amt is $100
		- time elapsed so far is 1 year
	- the fixed rate receiver would need to have a margin at least as large as
		- (5% - 1%) x $100 x 1 = $4
	- Could just be payed out on the fly rather than being kept as margin
- contract NPV margin: margin which is equal to the NPV of the remainder of the contract
	- e.g. 
		- if the "fixed market rate" for this contract is now 3%
			- rather than the 1% it was when they initially agreed to it
		- the contract expires in two years (so two years of cashflow payments left)
		- notional amt is $100 as before
	- the fixed rate receiver would need to put up a contract NPV margin of (3% - 1%) x 2 years x $100 = $4
		- so that if the fixed rate receiver defaulted, the variable rate receiver could take out another contract at the current market fixed IR of 3% and not have to incur any extra costs
			- since the delta was covered by the margin
-  default exposure margin: margin which covers the exposure incurred by either party if the other defaults on them, before they find a new counterparty
	- This I'd imagine would depend on some measure of expected volatility in the market fixed rate and also how long it is expected to take for the defaulted-on party to find a new counterparty


[capital efficiency](capital%20efficiency), [interest rate swap](interest%20rate%20swap), [futures](futures), [interest rates](interest%20rates)
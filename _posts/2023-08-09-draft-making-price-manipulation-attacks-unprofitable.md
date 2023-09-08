---
articleUrl: https://distbit.xyz/draft-making-price-manipulation-attacks-unprofitable
author: distbit
category: blog
date: 2023-08-09 00:00
description: ''
headerImage: false
layout: post
tag:
- defi
- oracles
- collateral
tags:
- defi
- oracles
- collateral
- gid
title: DRAFT Making price manipulation attacks un-profitable
---

 
# Making price manipulation attacks unprofitable

Introduction
---
Due to the pseudonymous nature of DeFi, all synthetic assets and loans must be over-collateralised. 

In a 100% collateralisation regime, if the value of the collateral decreases at all relative to the loan value, the position becomes immediately under-collateralised and fractionally-reserved.

As many have discovered during the 2022 bear market, this can have dire consequences for lenders and synthetic asset holders, in many cases resulting in complete loss of funds depending on emergency mechanisms.

As a result, it is imperative that all Defi lending and synthetic asset platforms have sound mechanisms in place to ensure that the value of deposited collateral is always greater than the value of their associated obligations. 

In order to ensure this, however, all such platforms must have access to reliable price feeds for each collateral asset that they support. If the price feed is compromised, all funds deposited on the platform are potentially at risk of being stolen. Hence, it is necessary to ensure all price feeds are secure against any attackers looking to manipulate the reported price for their own gain, and to the detriment of users.

---

The following analysis of price manipulation attacks applies to any platform which facilitates issuance of "IOUs". This characterisation most notably applies to both lending platforms and synthetic asset platforms. 

For brevity, however, the term "lending platform" is used to refer to both lending and synthetic asset platforms. The term "loan" is used to refer to both loans and synthetic assets.

The principle behind preventing such attacks is to ensure that the cost of executing them is always greater than the amount of user funds they would allow an attacker to steal.

An interesting framework which can be used to analyse the security of a system is outlined here: https://github.com/zack-bitcoin/amoveo-docs/blob/master/basics/trust_theory.md. According to this framework, we are aiming to achieve security level 3.3, which requires that an attack is unprofitable for any attacker, anonymous or not.

For the sake of this analysis, I assume that the oracle itself is not malicious or compromised. As a result, it is expected to accurately report the price of the asset on a single market. The term "oracle" refers to whatever mechanism is used to report market prices to a lending platform. The implications of aggregating multiple markets are discussed later.

Before we discuss how to prevent price manipulation attacks, we should first consider how they work. A price manipulation attack against a lending platform largely consists of two parts:  
- Part 1, the "price manipulation": The attacker buys a large amount of a collateral asset on the open market to temporarily increase its price  
- Part 2, the "attack": The attacker takes a loan out, never to be repaid, against this collateral asset at this inflated valuation

Part 2 is considered an attack because the lending platform has been deceived into believing that the collateral is more valuable than it really is, due to part 1. As a result of this deception, the lending platform will allow the attacker's loan to be worth more than the un-manipulated value of the collateral. This allows the attacker to effectively trade their less valuable collateral for a more valuable loan, never to be repaid.

Importantly, the amount of the collateral asset which the attacker buys in order to manipulate its price (in part 1) does not necessarily equal the amount which they must deposit as collateral, against which they take out the loan (in part 2).

So, what are the expenses and revenue associated with carrying out such an attack? The revenue is the easiest to analyse. It is the maximum value of assets which the attacker can borrow in the case of a lending platform, or the maximum value of synthetic assets which they can mint in the case of a synthetic asset platform.

The costs can be broken down into two major categories: the cost of manipulating the price feed and the cost of the collateral which must be deposited, against which the loan is taken, or synthetic assets are minted.

Both of the above are included as costs as they represent funds which the attacker must permanently forgo. It is important to ensure this is always the case.   
This is why we place particular emphasis on the case of Uniswap price manipulation attacks below, where this rule isn't guaranteed to hold.

We can now reformulate the requirement of costs > revenue as:    
`manipCost + collateralCost > loanValue`    
This inequality is referred to as the "security requirement", as it is necessary to ensure security against price manipulation attacks.

This is the same as requiring that the attack's `profit < 0` where:

`profit = loanValue - collateralCost - manipCost`

Where:    
`manipCost` = cost of manipulating the price of collateral asset X    
`collateralCost` = value of collateral asset X deposited against which a loan or synthetics were borrowed    
`loanValue` = value of funds borrowed by the attacker against collateral asset X    
`profit` = how much the attacker makes by executing the attack  

How do we enforce the security requirement?

We cannot limit how much the attacker deposits in collateral to the lending platform or how much they spend manipulating the collateral price, so all we can do is limit how much they can borrow.

Given that all borrowers on the platform could be controlled by a single individual due to Defi's pseudonymity, we can only achieve this by limiting the total value of loans able to be issued against each collateral asset. This ensures that even if all funds are borrowed by the attacker, costs are still greater than the value of issued loans. 

To calculate this limit, we simply need to ensure that the total value of all loans secured by each collateral asset is less than `manipCost + collateralCost`. Here onward, this limit will be referred to as `debtLimit`.

How do we calculate `manipCost` and `collateralCost`?    
In order to do this, we must first define some terms:

Henceforth, the collateral asset having its price manipulated will be referred to as $COL.

First of all, `LTV` refers to the ratio of maximum loan value to the value of deposited $COL. E.g. If the lending platform allows $0.5 to be borrowed for every $1 of $COL that is deposited, the `LTV` would equal 0.5.  
   
The `manipCost`, mentioned earlier, refers to the cost of executing the price manipulation. But can we be more specific here? It turns out we can.  
The manipulation operation consists of buying $COL on the open market in order to manipulate its price upwards. 

Initially, it might seem that the cost to the attacker is simply the amount they spent to buy this $COL. That, however, would be ignoring the value of the purchased $COL.   
Once we account for the value of this $COL, it becomes clear that the true cost of this attack is the (un-manipulated/true) value of the acquired $COL minus the amount the attacker expended to purchase the $COL.   
This can be succinctly summarised as "slippage cost". The greater the slippage, the more expensive the `manipCost` will be for the attacker.

`manipFactor` is the amount by which the attacker decides to manipulate the price of $COL and is equal to the manipulated price divided by the starting price. For example increasing the price of $COL from $100 to $150 will result in a `manipFactor` of 1.5.

Finally, the `profit` is perhaps the simplest term to define, as it is simply the amount that the attacker makes by executing the attack. The security requirement is that `profit < 0`.

Now that we have defined these terms, we can deduce the amount an attacker can borrow (`loanValue`) given a certain `LTV`, `manipFactor`, and `collateralCost`:  
- `LTV` is above defined as the ratio of `loanValue` to `collateralCost`, so by definition a higher value of `LTV` will result in a proportionally higher `loanValue` able to be borrowed against a certain `collateralCost` worth of $COL.  
-  `manipFactor` is defined above as the ratio of the manipulated $COL price to the original $COL price. A higher manipulated $COL price tricks the lending platform into allowing a proportionately higher `loanValue` to be borrowed against the same true value of $COL. 

As a result, `loanValue = collateralCost x manipFactor x LTV`    
This equation implies that both `LTV` and `manipFactor` act to multiply the `loanValue` able to be borrowed against a certain amount of collateral (`collateralCost`), in alignment with the above explanation.

Given that `loanValue` can be represented as `collateralCost x manipFactor x LTV`, we can rewrite the profit equation from above (repeated here to refresh your memory):    
`profit = loanValue - collateralCost - manipCost`

Substituting gives us:    
`profit = collateralCost x manipFactor x LTV - collateralCost - manipCost`    
Which can be simplified to:    
`profit = collateralCost(manipFactor x LTV) - collateralCost - manipCost`    
`profit = collateralCost(manipFactor x LTV - 1) - manipCost`  

`collateralCost` is a particularly important here as, if we can find the maximum safe value for `collateralCost` where profit is still <= 0, we can then plug this into the `loanValue = collateralCost x manipFactor x LTV` equation in order to arrive at the `debtLimit`, which will be the resulting `loanValue`.

The way we achieve this is via the following:

As long as `manipFactor x LTV - 1 > 0`, an increase in `collateralCost` will result in an increase in `profit` in the above equation. It turns out (for reasons we will explore below) that for an attack to occur at all, `manipFactor x LTV - 1 > 0` needs to be true, so this is a reasonable assumption.

Given that the highest we can allow `profit` to be is 0, we can then calculate the maximum safe value of `collateralCost` via the following steps:

`collateralCost(manipFactor x LTV - 1) - manipCost = profit`    
`collateralCost(manipFactor x LTV - 1) - manipCost = 0`    
solve for `collateralCost`:    
`collateralCost = manipCost / (manipFactor x LTV - 1)`  

We can now sub this equation for `collateralCost` into `loanValue = collateralCost x manipFactor x LTV` to calculate the `debtLimit`, where the resulting `loanValue` is the `debtLimit`:

`debtLimit = (manipCost / (manipFactor x LTV - 1)) x manipFactor x LTV`    
Which simplifies to:    
`debtLimit = (manipCost x manipFactor x LTV) / (manipFactor x LTV - 1)`  

So we now know how to calculate the `debtLimit`, right?    
There is one more piece missing: How `manipFactor` and `manipCost` are calculated.

`manipCost` is calculated by simulating the slippage incurred from filling all of the orders in the $COL ask orderbook until the price has been increased by `manipFactor`.

A lower `debtLimit` from a certain `manipFactor` indicates that the sum of `manipCost` and `collateralCost` is lower for an attack employing that `manipFactor`. This means that all else being equal, the attack is more profitable. 

In order to be resistant to *all* attacks, we must set the platform `debtLimit` based on which `manipFactor` allows for the most profitable attack. This necessitates, therefore that we devise a way to find the `manipFactor` which results in the lowest `debtLimit` value, and set the final `debtLimit` equal to this value.

In order to achieve this, it is important to understand the relationship between `manipFactor` and `manipCost`.   
An increase in `manipFactor` has the following two countervailing effects on the profitability of the attack, and therefore on `debtLimit`:  
- A higher `manipFactor` results in a higher `manipCost`, because the higher the attacker manipulates the price, the more slippage they incur.   
    - This is both by virtue of the attacker simply having to fill a greater volume of orders, but also due to each subsequent order offering a higher price than the last and therefore incurring higher slippage.  
    - This results in higher costs for the attacker, implying:  
        - Lower profitability  
        - A higher value of `debtLimit`  
- A higher `manipFactor` also allows the attacker to borrow a larger `loanValue` (which constitutes the attacker's revenue) using the same value of $COL.   
    - This results in higher revenue for the attacker, implying:  
        - Higher profitability  
        - A lower value of `debtLimit`

As a result of the above two countervailing consequences of a higher `manipFactor`, we can not assume that either the highest or lowest values of `manipFactor` will correspond to the highest or lowest values of `debtLimit`. 

To see what a graph of the absolute value of `debtLimit` over the course of a sample orderbook looks like, see the following spreadsheet: https://docs.google.com/spreadsheets/d/14Gxmj3_Vc-XBuf74Cj3xDlFZ3QMGFwZfPCVCw_G7Dgs/edit#gid=885922950.  
You can vary the `LTV` parameter to see the impact of doing so on the shape of the `debtLimit` curve, after cloning the spreadsheet.

Perhaps most notably, the point at which price manipulation attacks become possible* corresponds to the vertical asymptote in the `debtLimit` curve. The true (non-absolute) debt limit flips from being negative to being positive at this point. See the section below: "Lower bound on `manipFactor x LTV` for an attack to be possible" for more information about the significance of this asymptote.

As a result, we must instead calculate `debtLimit` for all* values of `manipFactor` and set the final value of `debtLimit` equal to the lowest `debtLimit` which this exhaustive search returns. 

\*See note: "Lower bound on `manipFactor x LTV` for an attack to be possible"

Conclusion  
---
We have now calculated a safe `debtLimit` for $COL such that all attempted price manipulation attacks will be unprofitable. 

This allows any lending or synthetic asset platform to be resistant to such attacks by restricting the value able to be borrowed against $COL to `debtLimit`.   
Conversely, any platform which allows `loanValue > debtLimit` to be borrowed in the form of loans or synthetic assets against $COL, is exploitable. 

Furthermore, if a single platform which supports $COL as a collateral asset (with a similar `LTV`), is exploitable (due to e.g. not enforcing a `debtLimit`), all other platforms which support $COL as a collateral asset become exploitable as a result. This is because it only takes one exploitable synths/lending platform for the attacker to cover the `manipCost` of the attack, after which all additional platforms are profitable to exploit. For more on this, see note: "What if $COL is listed on more than one lending market?".

Further notes  
---
What if $COL was being traded on Uniswap v2 rather than on an orderbook based exchange?  
---  
The relevant equations for incorporating Uniswap v2 markets in the above debt limit calculations can be found here: https://www.desmos.com/calculator/v1fbncg9c7

The general idea is to construct an equation for the debtLimit at any point on the Uniswap v2 curve and then to find the minima of that equation in the positive quadrant. The minima is found via a binary-search-like approach, numerically rather than algebraically due to the complexity of the equation of the derivative of the debt limit curve. 

All of the above `debtLimit` calculation logic including for Uniswap v2 has been implemented in a Python codebase which may soon be open sourced.

  
What if $COL is listed on more than one lending market?   
---
One of the most obvious limitations of the above as a strategy for preventing price manipulation attacks is that the attacker can amortise the cost of the price manipulation component over multiple lending markets. 

To illustrate this, imagine the scenario where five lending markets support $COL as a collateral asset, all of which employ the above strategy for calculating their $COL `debtLimit`.   
In this case, they would all be susceptible to a profitable price manipulation attack as the attacker now has `debtLimit x 5` revenue potential available which they can use to cover the collateral and price manipulation costs of their attack. 

This suggests that lending platforms may need to coordinate with one another to some degree to share the `debtLimit`  in order to prevent the aggregate `debtLimit` between them from exceeding the calculated safe `debtLimit`. 

This coordination however, seems like something that would be quite difficult to achieve, although perhaps is an interesting area of future research and mechanism design. 

If price manipulation attacks employing this strategy become more common, such coordination will become a necessity for any lending platforms wishing to survive. 

  
More considerations around Uniswap v2 data feeds  
---
This paper: https://eprint.iacr.org/2022/445 shows that manipulation attacks can be very cheap against the native Uniswap V2 TWAP feed.

Consequently, even though it is possible to calculate debtLimit values for Uniswap V2 markets, price data should only be read from these markets via an oracle mechanism that is able to detect very-short-term outlier price data, such as Chainlink's oracles. 

The primary reason why Uniswap v2 is particularly vulnerable here relative to orderbook exchanges is that Uniswap orders do not become "filled", in the "irreversible" sense that orders in orderbooks are "filled".

This reversibility of Uniswap order filling allows the attacker to cancel out their incurred `manipCost`, as long as they are able to prevent others from front-running them in this operation (see the paper linked above for more information). This converts the `manipCost` from a "sunk cost" to a "retrievable cost", causing the attack to be significantly cheaper to carry out.

Despite the above however, it is possible to securely use Uniswap v2 TWAP feeds by "wrapping them" with a function which applies a geometric mean function to prices periodically sampled from the native v2 TWAP feed. This works because, as explained in the above paper, a geometric mean TWAP is significantly much more resistant to single outlier data points. Consequently, the attacker must continue the manipulation over multiple blocks, which becomes prohibitive using the MEV manipulation strategy outlined in the paper. 

This geometric mean wrapper solution is infeasible in practice though, unless the onchain gas costs are shared by multiple data consumers, as the periodic TWAP samples required by the geometric mean function are estimated to cost $100k+ per year to provision (depending on various gas price assumptions). See this spreadsheet for more details: https://docs.google.com/spreadsheets/d/1T7MIKD_NfAX5mlbfD_jPYPnW4QUYdPaPAhwhALbHzPc/edit#gid=0. 

  
Considerations relating to Chainlink price feeds    
---
When using Chainlink price feeds to price collateral deposited to a lending platform, the above analysis can be carried out by aggregating the Ask orderbooks of all markets which Chainlink derives its price data from.   
By then calculating the `debtLimit` via the method outlined above, on this aggregated Ask orderbook, we can arrive at a cost of manipulating the price of $COL on all markets in which it is traded.

Some of Chainlink's price aggregators however, (probably) exclude certain markets when calculating the price of $COL. As a result, manipulation of these price feeds would only require manipulation of $COL in a subset of all its markets, lowering costs for an attacker.  
This can be accounted for by applying a conservative multiplier (< 1) to the resulting `debtLimit` derived from the entire market. 

The assumption present in the above however is that Chainlink data aggregators such as Coinmarketcap weight markets according to their liquidity when calculating the avg $COL price. More liquid markets are on average more expensive to manipulate, so assigning them a higher weight makes sense from the perspective of maximising attack costs. 

If however, most price aggregators weigh markets by their trading volume, price manipulation attacks become cheaper as attackers can strategically prioritise manipulation of the highest volume yet least liquid $COL markets. In effect, the attacker gets more "bang for their buck" in these markets than in lower volume and higher liquidity markets. This necessitates a more complex algorithm for calculating the aggregate market debt limit.

Volume-based weightings can be accounted for by prioritising orders from higher volume markets before those from lower volume markets when calculating the `manipCost` for a certain `manipFactor`. Orders from increasingly lower volume markets could be included in the calculation until the desired `manipFactor` has been achieved, at which point the slippage cost of just these orders is used to calculate the `manipCost`.   
This algorithm effectively simulates how the attacker would go about carrying out their attack, in order to calculate the attack's cost.

  
Manipulation of capital asset prices    
---
There is not that much to say here except that capital asset prices are also subject to price manipulation attacks, resulting in a `debtLimit` also being required for every capital asset, limiting the total value of each capital asset that can be borrowed at any point in time.

  
Lower bound on `manipFactor x LTV` for an attack to be possible    
---
In order for an attack to be carried out, `manipFactor` must be greater than `1 / LTV`. Another way of stating this is that `manipFactor x LTV > 1` . This can be understood both intuitively and also algebraically by simply looking at the denominator of the above `debtLimit` equation. 

Intuitively, if the `manipFactor` is less than the reciprocal of the `LTV`, the attacker simply can not profit from an attack, because they will need to deposit $COL worth more than the value of their loan. This is because the `manipFactor` effectively acts to cancel out the over-collateralisation effect of the `LTV`, by allowing the attacker to trick the lending platform into allowing them to borrow more capital against the same value of $COL.

As a result of this, attacks are prevented from being profitable until they are able to manipulate the collateral asset's price by a `manipFactor` equal to at least `1 / LTV`.   
As a result, low `LTV` values can be seen as a sort of barrier to manipulation attacks, as they require the attacker to at least be able to achieve a certain `manipFactor`. This is of course, not to say that collateral assets with low `LTVs` are safe from price manipulation attacks, just that all else being equal, a lower `LTV` results in a higher collateral asset `debtLimit`. 

An interesting implication of this is that collateral assets with very high `LTV` values (e.g. an `LTV` of 0.95 as might be used for stablecoin collateral assets with very low volatility) are particularly susceptible to price manipulation attacks, because such small price deviations incur very low `manipCost` for an attacker due to the low slippage. As a result, collateral assets with very high `LTV`s, such as stablecoins, will require very low (relative to if a lower LTV was used) `debtLimit` values to mitigate the low cost of price manipulation attacks.

One problematic way to address this is to hard-code the price of certain stable collateral assets, to prevent any price manipulation attacks from being possible. This however, risks the lending platform becoming insolvent were the value of the supposedly stable collateral asset to decline below its hard-coded price multiplied by its `LTV`.

This is particularly relevant to crypto-collateralised stables (e.g. DAI) where stable collateral assets are used to maintain a tight peg between the stablecoin's price and the price it is targeting.

Another use of this insight is that we can restrict the bounds of our search on values of `manipFactor` when searching for the lowest value of `debtLimit` to values of `manipFactor` greater than `1 / LTV`. All lower values of `manipFactor` are irrelevant due to attacks which employ them not causing any damage to the lending platform.

  
Liquidity withdrawal attacks  
---
Another interesting meta-attack that becomes possible if the above `debtLimit` calculation strategy approach is adopted is that an attacker could intentionally manipulate market liquidity in order to deceive the lending platform, or to carry out an attack. There are two primary ways this can occur:  
1. The attacker could artificially increase the available liquidity in $COL markets over a period of time, resulting in a higher `debtLimit` being instituted by lending platforms for $COL. The attacker then, at a certain point in the future, removes this liquidity and immediately carries out a price manipulation attack, at a much lower cost than the calculated `manipCost` given the original liquidity level.  
    - (Of course, the attacker could just trade against their own orders w/o pulling them, but this is less capital efficient for them.)   
2. The attacker can create a stealth bribery smart contract to pay Uniswap LPs to simultaneously remove a large percent of the liquidity for a certain Uniswap market at a certain time, at which point the attacker carries out price manipulation against the Uniswap (v3 or v2) market, incurring much lower costs as a result of the reduced liquidity.

The second strategy here becomes more feasible the more liquidity is concentrated among a small set of LPs in the $COL Uniswap market. This is because a more concentrated set of LPs means the attacker needs to coordinate fewer parties in order to execute the attack.

This attack is very difficult to mitigate. Even if the lending platform simply reduced the $COL `debtLimit` upon becoming aware of such an attack, they expose themselves to a griefing vector if they are willing to disable/hamper their lending market every time an attacker threatens to carry out such a price manipulation attack.

The cost to LPs if they participate in the attack by depositing their LP tokens as a bond in the bribery enforcement contract is very low. This low cost for conspiring LPs is because the bribery contract can allow them to freely bond and un-bond their LP tokens until the point where a predefined threshold of deposited LP tokens is reached.

Only at this point would the contract remove the LP liquidity from the Uniswap pool, allowing for the attack to be executed. 

It is therefore unlikely that the attacker will need to pay LPs unless the attack succeeds, at which point the LPs do incur the cost of having their LP tokens redeemed, causing them to miss out on trading fees. This means that the attack is extremely cheap for the attacker unless it succeeds. As a result, it acts as a significant griefing vector against any lending platforms preemptively hampering their lending markets upon detection of this attack being attempted.

There are two potential solutions to both the first and second liquidity manipulation attacks mentioned here:
- The protocol to can provision liquidity in these markets itself so as to "enforce" a minimum `manipCost`
- In the case of Uniswap markets, it can pay LPs to deposit their LP tokens into a contract which enforces a time-delay on LP token withdrawals. This guarantees the lending platform e.g. 48 hours notice before the LP tokens are able to be redeemed.

This however, poses a difficulty for collateral assets which are predominantly traded on centralised/off-chain exchanges. In these cases even if "the lending platform" owns or incentivises liquidity, this can not be proven in a trust-minimised fashion to users of the lending platform. As a result, the lending platform's resistance to price manipulation attacks degenerates to a form of "trust us".

Additionally, any on-chain "protocol-owned liquidity" is difficult to exclude other lending and synthetic asset platforms from "free-riding" on, potentially resulting in a tragedy of the commons situation. 

It is unlikely this will become an issue in practice though, as the cost of paying a large percentage of existing LPs to "time lock" their LP tokens is probably very low as long as the time-locking period is much less than the period most LPs expect to maintain their LP positions for. 

  
Resistance of Chainlink price feeds to manipulation    
---
One might imagine that Chainlink feeds are resistant to the above-described price manipulation attacks for either of the following reasons:  
1.  The exchanges from which Chainlink sources price data enforce KYC on users, resulting in any price manipulation risking the attacker being prosecuted and suffering confiscation of funds.  
2. Chainlink price aggregators and nodes will remove outlier price data before feeding it to lending platforms.

The first of these arguments is not a sound foundation on which to base any trust-minimised DeFi platform. It results in said lending platform's security being at the whim of the legal system in whichever jurisdiction a potential price manipulator may reside. 

Such a platform would also be wholly reliant on the effectiveness with which the one or two exchanges that host the most liquid $COL markets are able to differentiate between black-market and genuine KYC documents. The attacker only requires this procedure to fail once, for their attack to succeed. This does not even consider the possibility of insiders and employees at these exchanges using their position to surreptitiously allow a price manipulation attack to take place, in exchange for a bribe.

The second of these arguments also largely does not apply, as outlier detection requires there to be a reference point for comparison of the manipulated data to. No such reference point is available, however, for the manipulated data to be compared with. This is because the entire $COL market is being manipulated, not just a single $COL market which can be easily excluded on the basis of being an outlier when compared to the rest of the market.

Furthermore, outlier detection over time is unlikely to be able to reliably ignore price data resulting from price manipulation attacks as the price will not immediately revert to the pre-attack price and so should remain manipulated for long enough to be included in the Chainlink price record. 

Rather, the price will likely initially slowly revert (due to all sell orders up to the manipulation price already having been "consumed") until it reaches the threshold where the attacker's collateral becomes liquidatable. 

Once this threshold is reached, the price will revert more quickly due to liquidators attempting to sell said collateral, only to find very little liquidity available at the inflated prices, resulting in high slippage and a fast reversion back to the pre-manipulation price.

Applying a moving average could also lessen the impact on lending platforms of price manipulation attacks, but only by allowing for higher `debtLimit` values at the expense of less responsiveness to price changes. 

Modifying a platform's $COL `debtLimit`  
---
If a platform initially sets its $COL `debtLimit`  to the current `debtLimit` calculated via the above algorithm, the moment liquidity conditions deteriorate at all, the platform becomes exploitable. This is due to the fact that worsening liquidity conditions imply a lower safe `debtLimit`, implying that the initial set `debtLimit` is now higher than what is safe.

The solution to this, of course, is to set the platform's $COL `debtLimit` to the current calculated `debtLimit` minus a safety margin (probably around 50%). This creates a buffer, allowing the platform operator to react to changes in liquidity by updating the $COL `debtLimit` before the platform becomes exploitable. 

How, though, can the platform's `debtLimit` actually be decreased?    
An issue arises if the total value of loans taken out against $COL is already greater than the newly calculated `debtLimit`. If the attacker controls loans collateralised with $COL, worth more than the new safe `debtLimit`, they can carry out an attack. 

This is particularly important in the context of the section on Liquidity withdrawal attacks, due to the following possible scenario: An attacker may strategically withdraw liquidity from $COL markets, resulting in a safe value of `debtLimit` decreasing from `X` to `Y`.  
If initially, the platform's `debtLimit` for $COL was greater than `Y`, the attacker could have taken out a loan greater than the value of `Y`.    
How can a platform in this situation prevent the attacker from using their pre-existing debt-limit-exceeding loan to attack the platform?

First we must consider whether they even can use an existing loan to carry out an attack, or whether attacks are only possible with loans taken out at the time of the attack. 

The attacker's goal is to use their open loans to steal from the lending platform by deceiving it as to the value of the attacker's $COL collateral. They can achieve this using their existing loans in the following way:  
- Part 1, the "price manipulation": The attacker buys a large amount of the collateral asset on the open market, to temporarily increase its price.   
- Part 2, the "attack": The attacker withdraws most of the collateral they had deposited for their existing loan, leaving their loan undercollateralised (in real terms).

Part 2 is considered an attack because the lending platform has been deceived into believing that the collateral is more valuable than it really is, due to part 1. The attacker has effectively traded the small amount of remaining collateral, for the comparatively larger value of their existing loan, which they have no plans to repay.

Now that we have established that existing debt-limit-exceeding loans can be used to carry out an attack, we must find a way to prevent such attacks.    
The solution is to simply prevent collateral withdrawals for collateral assets where the total loan value exceeds the current `debtLimit`. This way, there is no need to forcibly close the attacker's loans, we can simply prevent the attacker from using them to carry out an attack. 

With this limit in place, the attacker won't be able to execute Part 2 of the above attack, resulting in their attack failing.

But what if the attacker carries out the attack before the platform is able to decrease its $COL `debtLimit` in response to the decreased liquidity?

The solution to this is that the lending platform can implement a delay on all new price data, as DAI does, giving it time to adjust the `debtLimit` before the price manipulation can be capitalised on by the attacker.

---

Thanks to [Zack Hess](https://twitter.com/zack_bitcoin), Brian Pasfield and [Max Kaye](https://twitter.com/xertrov?) for the discussions and feedback that contributed to this post!

If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
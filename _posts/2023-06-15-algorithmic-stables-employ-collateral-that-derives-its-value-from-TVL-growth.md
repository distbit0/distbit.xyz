---
articleUrl: https://distbit.xyz/Algorithmic-stables-employ-collateral-that-derives-its-value-from-TVL-growth
author: distbit
category: blog
date: 2023-06-15 00:00
description: null
headerImage: false
layout: post
tag:
- stablecoins
- defi
title: Algorithmic stables employ collateral that derives its value from TVL growth
---

Terra Luna and other algo stables failed as a result of being collateralised by tokens who's value was derived from the growth of the stablecoin itself.

The term collateral here is used to refer to the secondary token in each algo stable ecosystem which is minted when the stable's price falls below its peg. E.g. in the Terra Luna ecosystem the "collateral" in this sense was Luna. In other designs, such as Basis, the collateral is the bonds that are issued to incentivise stablecoin supply contraction.

The mechanism by which they failed was that the market capitalisation of the collateral asset fell below the intended marketcap of the stablecoin.

The reason most algorithmic stablecoins are prone to this occurring is that the value of their collateral is a proportional to the expected rate of growth/derivative of of the value of the stablecoin.

Therefore if long term expected growth rate of the stablecoin becomes negative (i.e. users move to alternatives), the value of the collateral becomes very low or near zero (given it can not be negative). The collateral becoming ~worthless while the stablecoin still has a non-zero yet declining TVL is highly problematic for any stablecoin project that values its continued existence. 

Algorithmic stablecoins are on the most reflexive end of [the collateral price reflexivity continuum ghp](The-collateral-price-reflexivity-continuum).
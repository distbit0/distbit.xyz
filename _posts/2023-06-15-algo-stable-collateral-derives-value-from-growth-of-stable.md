---
title: "algo stable collateral derives value from growth of stable"
layout: post
date: 2023-06-15 00:00
headerImage: false
category: blog
author: distbit
description:
articleUrl: https://distbit.xyz/algo-stable-collateral-derives-value-from-growth-of-stable
---

Terra Luna and other [[algo stables]] failed as a result of being collateralised by tokens who's value was derived from the growth of the stablecoin.

The mechanism by which they failed was that the market capitalisation of the collateral asset fell below the intended marketcap of the stablecoin.

The reason most algorithmic stablecoins are prone to this occurring is that the value of their collateral is a function of the expected rate of growth of the value of the stablecoin.

So the value of the collateral = the expected derivative of the value of the stablecoin over time. Therefore if long term expected growth rate of the stablecoin becomes negative, the value of the collateral becomes very low or near zero (given it can not be negative).

Algorithmic stablecoins are on the most reflexive end of [[the collateral price reflexivity continuum-ghp]].
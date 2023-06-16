---
title: "the collateral price reflexivity continuum"
layout: post
date: 2023-06-15 00:00
headerImage: false
category: blog
author: distbit
description:
articleUrl: https://distbit.xyz/the-collateral-price-reflexivity-continuum
---

[[collateral]], [[valuation]], [[total demand stock]]

Previously [[algo stables]] have failed as a result of the fact that [[algo stable collateral derives value from growth of stable-ghp]]. Such algo stables however simply exist on one end of a continuum, across which many designs exist at various points.

The spectrum reflects the extent to which the price of the collateral asset decreasing causes the price of the collateral asset to further decrease. This is referred to as the reflexivity of the collateral asset.

Reflexivity generally results from the utility/long term success of the stablecoin depending on the collateral asset's value and the collateral asset's value depending on the long term success of the stablecoin. 

The most common ways in which the value of a collateral asset can be tied to the success of a stablecoin are the following. Each strategy is evaluated on the basis of whether it would be able to withstand a situation where the stablecoin's demand is expected to fall to 0 (a.k.a. a "wind-down").

|Association      |Impact of wind-down  |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------|
|Asset holders receive seigniorage from stablecoin inflation and are diluted due to stablecoin deflation |Asset will immediately fall to zero due to no more seigniorage revenue being expected.|
|Asset holders receive dividend derived from fee charged to stablecoin holders. |Asset will decrease in value according to schedule similar to that which stablecoin follows.   |
|Asset is only supported collateral so experiences induced demand from stablecoin adoption. |Asset will decrease in value according to schedule similar to that which stablecoin follows. |


The third row in the above table applies to some degree to all collateral assets, even those which are nominally completely separate to the protocol in which they are being employed as collateral. E.g. the value of ETH is somewhat a function of the demand for DAI, due to ETH being used as a collateral asset by DAI.

Hence there is some need for DAI to maintain higher than otherwise necessary overcollateralisation so as to mitigate the risk of a decrease in demand for DAI resulting in a decrease in demand for ETH. More generally, a collateral asset's overcollateralisation ratio must be increased as a function of its reflexivity (among other things), so as to mitigate insolvency risk resulting from collateral price fluctuations. 

This is especially important when the marketcap of the collateral asset is low relative to the TVL of the protocol in which it is used as collateral.
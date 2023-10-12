---
articleUrl: https://distbit.xyz/short-twap-periods-hinder-correction-of-erroneous-samples
author: distbit
category: blog
date: 2023-07-21 00:00
description: null
headerImage: false
layout: post
tag:
- oracles
- defi
- twap
title: Short twap periods hinder correction of erroneous samples
---





Samples used to calculate a TWAP are susceptible to price manipulation attacks whereby the underlying market is temporarily manipulated by an attacker with the goal of impacting the price recorded for a given TWAP sample. 

Assuming the weight assigned to a given TWAP sample is proportional to the duration between when it was logged and when the next sample was logged, the above attack can be effectively mitigated.  

The mitigation consists of a bot (with no need for any "special privileges") that monitors logged TWAP samples for outliers, upon detection of which it logs a new sample, as soon as the price reverts to its earlier state. The effect of this is that the weight assigned to the outlier sample in the TWAP calculation is as low as possible due to the sample existing as the latest sample for as short a period as possible. As a result, the distortion of the TWAP resulting from the outlier sample is minimised.

This mitigation however depends on the bots reaction time, and the manipulation attack duration being a sufficiently small % of the total TWAP period to not have a disproportionate impact on the output. 

In order to ensure that the bots reaction time, and the manipulation attack duration always constitute a sufficiently small % of the total TWAP duration, it is necessary to enforce a minimum age of the oldest sample used to calculate the TWAP. This is because the total period of the TWAP (used as the denominator when calculating the weight to assign to each sample based on its duration) is equal to the age of the oldest sample in the TWAP series.

Hence, a TWAP period should not only be defined by the maximum age of the a sample in the TWAP series, but also the minimum age of the oldest sample. 


If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
---
articleUrl: https://distbit.xyz/Auctions-can't-price-synth-if-oracle-is-malicious
author: distbit
category: blog
date: 2023-06-15 00:00
description: null
headerImage: false
layout: post
tag:
- oracles
- defi
- auctions
title: Auctions can't price synth if oracle is malicious
---

  
 
 
If the oracle used to determine the value of collateral a synth holder is entitled to (e.g. a stablecoin) is malicious, auctions will not be capable of reliably pricing said synth. E.g. if there is a DAI-like stablecoin but which uses an oracle which is reporting that the value of collateral each DAI is worth is 50c, an auction can not be expected to price the stablecoin at $1. 

Therefore auctions can not be used as a substitute for the synth asset using a reliable oracle when pricing said collateral asset.

However [auctions should be used instead of oracles where possible](/Auctions-should-be-used-instead-of-oracles-where-possible), or at least to minimise reliance on oracles. Cases where this works include lending platforms which can price collateral using auctions (e.g. health factor auctions and DAI's time based auctions) due to being able to assume that the market price of the collateral assets is accurate.

If you found this interesting, have feedback or are working on something related, let's get in touch: [@0xdist](https://twitter.com/0xdist) or [schedule a 30min call](https://cal.com/distbit/30min)
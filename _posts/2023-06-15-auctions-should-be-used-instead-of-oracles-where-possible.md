---
articleUrl: https://distbit.xyz/Auctions-should-be-used-instead-of-oracles-where-possible
author: distbit
category: blog
date: 2023-06-15 00:00
description: null
headerImage: false
layout: post
tag:
- auctions
- oracles
- defi
title: Auctions should be used instead of oracles where possible
---

[[auctions]] should be used instead of oracles where possible
- e.g. when liquidating positions, to prevent [[price manipulation]] attacks and to determine value of collateral.
- only doesn't work when the outcome of the auction determines something more valuable than the cost of manipulating the auction [[uniswap is manipulation-resistant due to its symmetry]]
	- or when then the asset being priced will not be properly priced due to its design relying on an oracle that is malicious
		- i.e. any synthetic assets/stablecoins/derivatives
---
title: "optimised agi forgetting algo"
layout: post
date: 2023-06-15 00:00
headerImage: false
category: blog
author: distbit
description:
articleUrl: https://distbit.xyz/optimised-agi-forgetting-algo
---

#gpt 

Ideas might be saved in the [[agi memory]] which turn out to not be very useful. This might initially seem harmless. What could be the problem with storing ideas which aren't that useful? It is not as if we are constrained by storage.

The primary issue with storing less useful ideas is that they result in less efficient recall than would otherwise be possible, leading the AGI down dead ends when it is exploring its memory, and making the most useful ideas hard to find.

But how do we differentiate useless ideas from useful ideas?
I think that this can be done by having the LLM rate the usefulness of an idea when engaged in [[agi idea retrieval]] in a certain context, and using this to strengthen or weaken weights. 

We could also use a bad rating of a link between ideas as an indication not that the link should be deleted, but perhaps instead that the link's meaning/description should be changed, in the context of semantic links.

E.g. maybe the link has a misleading description x, but the ai rates it badly so it is asked what it should be changed to more accurately describe the relationship between the two ideas.
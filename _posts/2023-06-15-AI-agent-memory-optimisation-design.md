---
articleUrl: https://distbit.xyz/AI-agent-memory-optimisation-design
author: distbit
category: blog
date: 2023-06-15 00:00
description: null
headerImage: false
layout: post
tag:
- ai
- agents
- memory
title: AI agent memory optimisation design
---

#gpt 

Ideas might be saved in the agi memory which turn out to not be very useful. This might initially seem harmless. What could be the problem with storing ideas which aren't that useful? It is not as if we are constrained by storage.

The primary issue with storing less useful ideas is that they result in less efficient recall than would otherwise be possible, leading the AGI down dead ends when it is exploring its memory, and making the most useful ideas hard to find.

But how do we differentiate useless ideas from useful ideas?
I think that this can be done by having the LLM rate the usefulness of an idea when engaged in agi idea retrieval in a certain context, and using this to strengthen or weaken the weight of the connections to that idea through which it travelled. 

In addition to using this feedback to weaken the connection's weight, an alternate approach could involve changing the link's meaning/description in the context of semantic links, so that it more accurately describes the relevance/significance of the idea being linked to. As a result, the agent will be less likely to erroneously traverse this link in the future, due to having a better understanding of whether what it links to is relevant. 

E.g. maybe the link has a misleading description x, but the agent rates it badly so it is asked what it should be changed to in order to accurately describe the relationship between the two ideas.
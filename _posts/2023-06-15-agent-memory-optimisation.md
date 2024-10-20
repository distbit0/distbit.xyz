---
articleUrl: https://distbit.xyz/agent-memory-optimisation
author: distbit
category: blog
date: 2023-06-15 00:00
description: null
gist_url: https://gist.github.com/130579c91265f97f7c8480c4abcfe95b
headerImage: false
layout: post
live: false
tag:
- memory
- ai
- agents
title: Agent memory optimisation
---




If an LLM decides that an idea or piece of information it has recently acquired will be useful in the future, and is therefore worth saving to its memory, it will need to ensure that it is saved in a format which will be understandable to its future self.  

Given that its "future self" consists of the same core LLM but with different context, the idea must be represented in memory with all necessary context and with links to "dependencies/complementary ideas".  

How can an LLM determine which set of ideas and context should be stored in memory so that its "future self" is able to understand and re-use this knowledge?  

The solution I propose to this is to have the LLM carry out experiments on a "blank" instance of itself to test whether a certain representation of an idea will make sense without access the context the LLM currently has access to.  

Questions about the idea can be asked to this blank instance of itself to test its comprehension. If the LLM is not able to satisfactorily answer the questions (as determined by the LLM trying to save the ideas), the idea is re-phrased and this is re-attempted, until it eventually is understood. The re-phrasing can be carried out based on the response from the LLM.  

The agent may need to carry out several attempts/iterations before it finds a representation of a new idea which is reliably understood by a blank instance of itself.  

This is a strategy for agi memory  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 20 min call](https://cal.com/distbit/20min)
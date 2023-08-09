---
articleUrl: https://distbit.xyz/Teaching-LLMs-ideas-beyond-their-context-limit
author: distbit
category: blog
date: 2023-06-15 00:00
description: null
headerImage: false
layout: post
tag:
- agents
- ai
- memory
- epistemology
title: Teaching LLMs ideas beyond their context limit
---

   


In order to understand new complex topics, often hundreds or even thousands of new ideas need to be learned. Not all of these ideas are needed when making most decisions. However, it seems dozens or more may be used subconsciously while reasoning or formulating new ideas, to both act as constraints and guide the idea creation process.

This relates to an aspect of agi idea retrieval and how agi memory can be accessed.

How will LLM-based AGIs be able to use all of the ideas they accrue over time in the process of solving problems/coming up with new ideas?

I can think of a few potential solutions to this problem: parallelisation, serialisation and abstraction.

Parallelisation consists of running multiple "threads", which each apply a sub-set of all relevant ideas to the problem at hand. This allows all ideas to be applied, despite being larger than the context window when combined, by running multiple instances of the LLM simultaneously.

Serialisation consists of running a "problem"/initial context through multiple instances of the LLM, each time providing to the LLM a different sub-set of the ideas to apply to the current problem.

The difference between serialisation and parallelisation is that the serialisation strategy uses the output of each instance of the LLM as the input for the next instance, and therefore must be run sequentially. The benefit of this is that each instance can build on the progress made by all previous instances. The disadvantage is that the processing speed is bottle necked by hardware, as it can not be parallelised.  

Abstraction consists of converting a set of ideas into a smaller set of ideas which abstract away irrelevant (for the context at hand, or similar contexts) details to leave only the necessary details. These ideas can then be used in a single (or fewer than would otherwise be required) instances of the LLM as a result of being able to fit within the context window.

There are strong similarities between the abstraction technique and the parallelisation technique. The difference is probably a matter of degree.
Specifically, abstraction involves abstracting away details which aren't relevant to a given context. The more "given context" refers to a class of problems which the AGI expects to need to solve, rather than the particular problem at hand, the more distinct the abstraction technique is from the parallelisation technique.

At the extreme where the "given context" = the current idea needing to be solved, abstraction is equivalent to parallelisation.

If you found this interesting, have feedback or are working on something related, let's get in touch: [@0xdist](https://twitter.com/0xdist)
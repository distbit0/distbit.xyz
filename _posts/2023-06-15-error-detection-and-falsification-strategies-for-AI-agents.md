---
articleUrl: https://distbit.xyz/Error-detection-and-falsification-strategies-for-AI-agents
author: distbit
category: blog
date: '2023-06-15 00:00 '
description: null
headerImage: false
layout: post
tag:
- main
title: Error detection and falsification strategies for AI agents
---Strategies for error-correction/error-detection/falsification for use when creating LLM-based Agents: 
- Conceptual ideas
	- Testing whether a conclusion is arrived at via multiple reasoning paths
	- Testing whether a conclusion is arrived at via a more detailed analysis/reasoning pathway
	- Checking conclusion against online data
		- i.e. data with the potential to either implicitly or expressly contradict the conclusion
	- Using criticism/argument tree to refine/refute/improve an output
	- Creating list of conclusions/statements which it considers when encountering new information, with the goal of finding contradictions
	- Searching for conceptual counter-arguments online
	- Searching for conceptual counter-arguments in memory database
- Code
	- Attempting to compile generated code
	- Attempting to run generated code
	- Testing generated code against set of test cases
- Mathematical proofs/arguments
	- Testing generated math proof against proof checker
- General
	- Asking user to select from multiple generated outputs
	- Using log prob of output as certainty heuristic
	- Having the LLM create an experiment (in novel situations) with the goal of testing its output

#gpt
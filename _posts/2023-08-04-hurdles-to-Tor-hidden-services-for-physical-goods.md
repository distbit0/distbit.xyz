---
articleUrl: https://distbit.xyz/Hurdles-to-Tor-hidden-services-for-physical-goods
author: distbit
category: blog
date: 2023-08-04 00:00
description: ''
headerImage: false
layout: post
tag:
- onion routing
- agorism
title: Hurdles to Tor hidden services for physical goods
---

THS = Tor hidden services

- Differences between physical and digital THS
	- payload is encrypted in digital THS but not physical THS
		- harder to claim accidental possession if contraband is unencrypted
		- payload can be inspected by state-controlled infrastructure in physical but not digital THS
	- cost to user of payload "drops" is high in physical THS but low in digital THS
	- incentive for relays to steal payload is high in physical THS but low in digital THS
	- cost and difficulty of running physical THS node is much higher than running digital THS node
- Similarities
	- both require relays to have possession of and to transmit/traffic (in some sense) potentially illegal material  
	- both physical and digital THS can facilitate regulatory arbitrage by way of employing relays only in friendly jurisdictions  
	- in both, identification of payload recipient by sender is hampered
		- due to high coordination/collusion costs
			- due to circuit relays being controlled by multiple randomly selected individuals in multiple jurisdictions
	- both require some jurisdiction to exist which allows for nodes to operate 
- Misc notes
	- The advantage of physical THS over dead drops is that dead drops place very little between the sender and the recipient
		- therefore making the recipient vulnerable to identification by a malicious/state-allied sender
- Questions
	- can web of trust reputation be used to mitigate theft risks of physical THS
- Possible project idea
	- A decentralised tor hidden services protocol
		- using
			- dead drops
			- postage systems
		- [[web of trust]] reputation system
		- every hop is managed by the sender of the item
		- transporters specify if the item is in a good state when they pick it up
			- so that the previous transporter can be given a bad reputation
	- To facilitate [[agorism]]. 


#question
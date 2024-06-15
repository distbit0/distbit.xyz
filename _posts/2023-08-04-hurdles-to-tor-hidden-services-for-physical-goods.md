---
articleUrl: https://distbit.xyz/hurdles-to-tor-hidden-services-for-physical-goods
author: distbit
category: blog
date: 2023-08-04 00:00
description: ''
gist_url: https://gist.github.com/3ea69d569d4038ef1af82c2b5a7ffa6a
headerImage: false
layout: post
live: false
tag: []
title: Hurdles to Tor hidden services for physical goods
---




THS = Tor hidden services  

Tor hidden services is an internet protocol which facilitates communication between two parties without either of them disclosing their IP address to each other or a trusted third party. It is used by tor to allow servers to operate without clients needing to know their ip address in order to connect.  

A physical instantiation of THS would be a protocol which allows for physical goods to be transferred between two parties without either party needing to know the location of the other, nor able to easily discover it. Such a protocol would lessen the trust buyers must place in DNM vendors and other physical agorist markets. This is because buyers would no longer be at risk of the vendor leaking/reporting/disclosing the buyer's postage address.  

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
	- web of trust reputation can mitigate theft risks of physical THS  
- Possible project  
	- A decentralised tor hidden services protocol  
		- using  
			- dead drops  
			- postage systems  
		- web of trust reputation system  
		- every hop is managed by the sender of the item  
		- transporters specify if the item is in a good state when they pick it up  
			- so that the previous transporter can be given a bad reputation  
	- To facilitate agorism.  

If you found this interesting, have feedback or are working on something related, let's get in touch: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 30 min call](https://cal.com/distbit/30min)
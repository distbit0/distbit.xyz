---
articleUrl: https://distbit.xyz/kpi-vs-asset-futarchy
author: distbit
category: blog
date: 2025-05-03 00:00
description: ''
gist_url: https://gist.github.com/a7e6cc863704b3085b77ef758307a4d0
headerImage: false
layout: post
live: true
tag: []
title: The different types of futarchy
---




# Asset vs KPI Futarchy  

**TLDR:**  
This article compares two forms of Futarchy, a governance mechanism using prediction markets: Asset Futarchy (predicting project token value) and KPI Futarchy (predicting a Key Performance Indicator).  

*   **Outline:** The comparison covers three main areas:  
    *   **Efficiency:** Examines capital efficiency (with and without leverage), liquidity (pre and post-decision), and how trader PnL (Profit and Loss) can be confounded by external factors or time horizons.  
    *   **Flexibility:** Discusses alignment with organizational risk tolerance, sensitivity to proposal impacts, and adaptability to diverse organizational goals.  
    *   **Robustness:** Analyzes proposal impact distortion, manipulation impact for organizations and traders, alignment with minority owner interests, and third-party dependency risks.  
   
➜ While neither KPI nor Asset futarchy are strictly superior in terms of efficiency, KPI Futarchy generally offers greater flexibility to align with diverse objectives and requirements, while Asset Futarchy provides greater robustness, reliability and manipulation resistance.  

Futarchy is a governance mechanism [proposed by Robin Hanson](https://mason.gmu.edu/~rhanson/futarchy2013.pdf) which employs prediction markets to make decisions. Instead of voting, participants trade in markets designed to forecast the outcome of choosing one path versus another. The core idea is to harness the diverse specialised knowledge latent among market actors to predict the *impact* of each governance proposal.  

There are two primary ways to set up these prediction markets:  

1.  **Asset Futarchy:** Creates markets predicting the value of the project's token, conditional on a governance proposal being accepted. These predictions are usually denominated in a quote asset, like a USD stablecoin (e.g., USDC). "Quote asset" refers to the currency in which the prediction is priced.  
2.  **KPI Futarchy:** Creates markets predicting the future value of a specific KPI the organization wants to optimize, conditional on a proposal being accepted. A "KPI" is a measurable value that demonstrates how effectively a company is achieving key objectives. This requires creating "synthetic tokens" – 'long' and 'short' – representing the KPI's value. These tokens eventually redeem for "collateral" (usually a stablecoin) based on the final KPI value at a set "resolution date" (the future date when the KPI is measured).  

    > *Example:* Imagine a KPI for 'monthly active users' with a target range of `0` to `300`. If the actual users at resolution are `200`, the 'long' tokens might redeem for `200/300 = 0.66` USDC each, and 'short' tokens for `(300-200)/300 = 0.33` USDC each (assuming `$1` total collateral per long/short pair).  
  
Each proposal's "KPI market" is made conditional on that proposal being accepted, by only resolving it if the proposal is accepted, otherwise cancelling it. The price of each proposal's long token therefore conveys the market's prediction of the KPI's value at resolution, conditional on that proposal being accepted. I.e. it is the market's prediction of the proposal's impact on the KPI.  

We can therefore decide which proposals to accept on the basis of which are expected to yield the highest KPI value (e.g. monthly active users), by accepting proposals that have the highest long token price. A similar principle holds for asset futarchy, however instead of selecting proposals according to their long token price, as we do in KPI futarchy, we select them according to their asset price, denominated in a USD stablecoin.  

Asset Futarchy can be viewed as a specific type of KPI Futarchy where the KPI is essentially the project's long-term revenue, denominated in USD, based on the assumption that revenue is the main driver of the asset's demand.  


## Efficiency  
➜ Futarchy efficiency, concerning capital and liquidity, shows different strengths for Asset and KPI types depending on specific conditions and mechanisms like leverage.   

### KPI Futarchy Can Be More Capital Efficient if a Targeted KPI is Available  
➜ KPI Futarchy is more capital efficient than Asset Futarchy without leverage if the asset's price isn't expected to move dramatically or if a less noisy KPI is available that better isolates the proposal's impact.  

Capital efficiency refers to how much collateral traders must deposit to gain a certain amount of predictive exposure. Less collateral required means higher capital efficiency.  

Why does this matter? Higher capital efficiency lowers the cost for traders to participate. More participants bring more diverse information, improving the accuracy of the market's predictions and leading to better organizational decisions.  

KPI Futarchy is more capital efficient than Asset Futarchy *if* one of two conditions holds:  

1.  **Low Expected Asset Price Variation:** If the asset's price isn't expected to move dramatically during the Futarchy market's duration – specifically, if the total expected range (upside + downside) is less than `100%` of the starting price.  
    > *Example:* If a token trades at `$10` and is only expected to move between `$9.50` (`95%`) and `$10.50` (`105%`) during the market, Asset Futarchy is less efficient. It implicitly requires capital backing the potential price range all the way down to `$0`, even though the `0%` to `95%` range is considered irrelevant for this specific prediction. A KPI Futarchy could be designed to focus *only* on the `95%-105%` range, requiring less collateral, by setting the lower bound of the KPI range to `$9.50` and the upper bound to `$10.50`. I.e. in asset futarchy the lower bound is always `0`, whereas in KPI futarchy it can be set to any value.  
    *   Conversely, if the price could swing widely, say between `$7` (`70%`) and `$18` (`180%`), Asset Futarchy becomes *more* capital efficient. It provides exposure to potential upside "for free" without needing additional collateral locked specifically for that higher range.  

2.  **Availability of a Less Noisy KPI:** If a KPI can be chosen that better isolates the proposal's specific impact from external 'noise' compared to the asset price.  
    *   Asset prices react to many factors beyond the proposal in question: overall market sentiment, competitor actions, unrelated news, etc. This makes the asset price a 'noisy' indicator of the proposal's specific effect.  
    *   KPI Futarchy allows selecting or constructing a KPI specifically designed to filter out most of this irrelevant noise. By reducing the KPI's variance caused by external factors, less collateral is needed to cover potential fluctuations. The collateral mainly needs to cover the variance expected from the proposal itself.  
        > *Example:* Instead of using a KPI for "total revenue" (which behaves much like the asset price), one could use a KPI tracking only "revenue generated directly by the proposal under consideration," thus isolating the PnL more closely to the trader's prediction about that specific proposal.  
    *   The capital efficiency of KPI Futarchy also depends on the chosen upper and lower bounds for the KPI. If the KPI is heavily influenced by external factors (high noise), wider bounds are needed, which reduces capital efficiency compared to bounds covering only the proposal's expected impact range. These bounds also determine which outcomes are captured; narrow bounds might distort the market price if the actual outcome falls outside the defined range.  

### Leverage Improves Capital Efficiency  
➜ Introducing leverage via liquidations significantly boosts capital efficiency for both Asset and KPI Futarchy, especially for proposals with a low probability of approval.  

Without leverage, if a trader would like to speculate on the impact of a proposal with a `3%` chance of approval, they would receive `3c` of its long and short tokens after depositing `$1` in collateral, given that the value of each proposal's tokens is a function of its approval probability. This is highly inefficient. Leverage allows meaningful participation without excessive capital lockup, ensuring potentially valuable information about unlikely-but-impactful ideas isn't lost. Eliciting this information is key to giving fringe ideas a fair hearing. With leverage, the same trader would only need to deposit e.g. `5c` (`3c` + `2c` safety buffer) of collateral to receive `3c` of long and short tokens, hence improving capital efficiency by a factor of `20`.  

With liquidations, capital efficiency becomes a function of volatility. Traders need sufficient collateral buffers to avoid being liquidated by temporary price swings before their prediction potentially plays out. Therefore, factors that reduce noise (like a well-chosen KPI) still improve capital efficiency by reducing the required collateral buffer.  

Leverage offers a specific benefit to KPI Futarchy: it helps overcome the trade-off between the KPI range and capital efficiency. It allows setting a very high upper bound for the KPI without crippling efficiency.  

*   *Mechanism:* Leverage enables the minting of 'long KPI' tokens independently from 'short KPI' tokens. If the 'long KPI' token trades at `5 cents` (implying a low expected outcome), a trader wanting to short it doesn't need to provide the full `$1` of collateral (`95 cents` of which would normally back the corresponding 'short KPI' token). This decoupling makes trading more efficient.  
*   *Trader Experience:* This improves the user experience for KPI Futarchy traders. Standard KPI Futarchy often must limit the potential upside (constrain the KPI range) to maintain capital efficiency. Leverage allows for higher potential returns, which is important to compensate traders for locking up capital, potentially for months, until the KPI resolves.  

### Asset Futarchy May Offer Improved Pre-Decision Liquidity by Leveraging Spot Markets  
➜ Asset Futarchy has a potential advantage in pre-decision liquidity by leveraging existing spot market liquidity, reducing subsidy needs.  

Before the organization makes its final decision based on the market prices, liquidity is needed for the Futarchy markets themselves. Asset Futarchy has a potential advantage here. By employing a novel DEX design, it can leverage the existing liquidity found in the asset's spot market. This reduces the amount which the organization needs to spend subsidizing Futarchy market liquidity.   

KPI Futarchy cannot tap into existing spot markets because none exist for a custom KPI. It must build liquidity from scratch, hence requiring subsidies.  

### Asset Futarchy Simplifies Post-Decision Liquidity Through Spot Market Integration  
➜ In Asset Futarchy, conditional tokens effectively become claims on the underlying spot asset post-decision, utilizing its liquidity, while KPI Futarchy requires continued liquidity subsidization.  

After the decision is made but before the final outcome resolves (e.g., the KPI is measured or the long-term price impact is clear), traders might still want to trade.  

In Asset Futarchy, the conditional tokens effectively become claims on the underlying spot asset once the decision is locked in. Traders can then use the asset's regular spot market liquidity to enter or exit positions. No separate liquidity subsidy is needed for this period (between decision and proposal impact). This makes Asset Futarchy more attractive if information continues to emerge during this time, allowing traders to adjust positions without dedicated Futarchy market liquidity.  

In KPI Futarchy, there's no underlying spot market to fall back on. To allow traders to exit their positions *after* the decision but *before* the final KPI resolution date, the market creator must ensure the availability of liquidity, likely through subsidies. Without this, traders' capital remains locked until the resolution date, which degrades trader experience.  

### KPI Futarchy Generally Reduces Trader PnL Confounding from External Factors  
➜ KPI Futarchy generally ensures a trader's PnL more accurately reflects their prediction about a proposal's specific impact, unlike Asset Futarchy where PnL is confounded by broader market factors.  

In Asset Futarchy, a trader's PnL is only loosely tied to the proposal's specific impact. It's heavily confounded by *all other factors* influencing the asset price: general market conditions, demand changes, management decisions, other proposals, etc.  

> *Trader Experience:* This means traders are forced to take on exposure to these unrelated factors. They might correctly predict a proposal's positive impact but still lose money if the broader market tanks before they close their position. This increases uncertainty and risk; traders prefer predictable returns linked to their specific insight.  
*   *Hedging:* Hedging these external factors is difficult and often imperfect. It typically requires dynamic rebalancing, which introduces its own costs and risks (e.g., negative gamma exposure).  
*   *Trader Pool:* While Asset Futarchy benefits from a natural pool of participants (existing asset holders already exposed to the price), this doesn't necessarily help attract *outside* informed actors who aren't already holders but might have valuable specific knowledge about the proposal.  

KPI Futarchy is generally superior in this regard. The KPI can be specifically designed to reduce (though perhaps not always eliminate) confounding from external factors.  

### Asset Futarchy's Infinite Horizon Confounds PnL for Time-Specific Impacts  
➜ Asset Futarchy's implicit infinite time horizon confounds PnL by incorporating long-term factors irrelevant to short-term proposal impacts, while KPI Futarchy allows for time-specific impact measurement.  

Asset Futarchy implicitly operates with an infinite time horizon because asset prices reflect expectations far into the future. This means changes in long-term factors like discount rates or investor risk premiums have a greater impact on trader payouts, as these factors compound over longer periods.  

Importantly, this happens even if the proposal's impact is known to be short-term. Asset Futarchy cannot easily focus *only* on impacts over a specific, limited time period. Traders are affected by factors influencing the asset price far beyond the relevant timeframe for the proposal. This further confounds PnL and degrades the trader experience.  

KPI Futarchy provides much greater flexibility here.  

*   It can be designed to measure impact *only* over a specific, relevant time period (e.g., the next 6 months), filtering out long-term noise.  
*   Conversely, it can ignore short-term noise or impacts if a decision is intended only for long-term effect, reducing volatility risk for traders focused on that horizon.  

## KPI Futarchy Provides Greater Flexibility  
➜ Generally, KPI Futarchy offers more flexibility to adapt to different goals, sensitivities, and organizational needs.  

### KPI Futarchy Accounts for Risk Aversion via Payoff Modulation  
➜ KPI Futarchy allows direct alignment with an organization's risk aversion by modulating trader payoffs, unlike Asset Futarchy which predicts expected value by default.  

By default, Futarchy markets predict the *expected* outcome (a probability-weighted average). However, most organizations are risk-averse; they care more about avoiding large losses than achieving proportionally large gains. They value outcomes based on *utility*, not just expected value.  

> *Example:* A proposal has a `50%` chance of causing bankruptcy (token price -> `$0`) and a `50%` chance of tripling the price from `$1` to `$3`. The expected value is `(0.5 * $0) + (0.5 * $3) = $1.50`, a `50%` gain over the current `$1`. A naive Futarchy focused only on expected value would approve this proposal.  
*   *Organization's View:* Most organizations would find this gamble highly unappealing due to the bankruptcy risk.  

In KPI Futarchy, this risk aversion can be directly addressed by modulating the trader payoff function. The mapping from the final KPI value to the collateral payout can be made non-linear to reflect the organization's aversion to specific outcomes (e.g., heavily penalizing low KPI values).  

In Asset Futarchy, this is not straightforward because the markets simply price the asset. To account for risk aversion, one might need to implement complex secondary markets, like option markets, to estimate the *distribution* of potential price outcomes. The organization could then use this distribution to calculate a utility-weighted expected price offline to inform its decision.  

### KPI Futarchy Can Offer Higher Proposal Impact Sensitivity  
➜ KPI Futarchy can enhance proposal impact-sensitivity, allowing detection of smaller impacts, by focusing the KPI on the specific area affected by a decision.  

Impact sensitivity refers to the smallest percentage impact on the asset price or KPI that the Futarchy market can reliably detect and price. Think of it as the system's "resolution."  

Sensitivity depends on two main factors:  

1.  **Time until Impact:** The longer the time until the proposal's effects are measured, the lower the sensitivity (due to discounting and uncertainty).  
2.  **Trader Capital Cost:** Traders weigh the potential profit from pricing in a small impact against the opportunity cost of locking up their capital (their time preference or forgone returns elsewhere).  

> *Example:* If traders perceive their capital cost to be `10%` over the market's duration (say, `2 years`), they won't bother accurately pricing a proposal expected to have only a `3%` impact. The potential gain is too small relative to the cost of participation.  

Several approaches can increase sensitivity:  

*   Supporting leveraged positions (boosts capital efficiency, making small gains more attractive).  
*   Employing yield-bearing collateral assets (reduces trader opportunity costs, as proposed by Seer: [Capital efficiency](https://seer-2.gitbook.io/seer/seer-solution/capital-efficency) ).  
*   Using a non-linear KPI mapping function in KPI Futarchy that magnifies the payout differences at the low end of the KPI range, making small impacts more significant to trader returns. However this has the risk of unintentionally distorting futarchy decisions in the direction of lower risk tolerance.  

Asset Futarchy is typically sensitive enough for major, top-level decisions that will clearly move the overall asset price. However, it is often *insufficiently* sensitive for more granular decisions whose impact on the total asset value is likely to be small or imperceptible.  

KPI Futarchy can significantly improve impact sensitivity. By selecting a KPI that is more focused on the specific area affected by the decision, the proposal's impact becomes a larger *percentage* change relative to that focused KPI. This increases the incentive for traders to price the impact accurately, making it potentially viable for both high-level and lower-level decisions.  

However, KPI Futarchy can run into sensitivity issues if the chosen KPI is too high-level or broad compared to the magnitude of most proposals. If typical proposals only cause tiny percentage changes in the KPI, they might still fall below the sensitivity threshold. The KPI needs to be on a similar "scale" to the proposals being evaluated.  

### KPI Futarchy Supports Diverse Goals Beyond Asset Value Maximization  
➜ While Asset Futarchy primarily aims to maximize asset value, KPI Futarchy supports a wider range of quantifiable goals, including non-financial objectives and inter-organizational agreements.  

Asset Futarchy is ideal for the top-level governance of organizations whose main objective is to increase value for shareholders or token holders.  
*   It can be adapted somewhat, for instance, by tokenizing the projected revenue stream of *each individual proposal* and running Futarchy on those specific tokens. This, however, blurs the line into a hybrid KPI/Asset approach.  

KPI Futarchy is much better suited for contexts where the goal is something other than maximizing long-term shareholder value. This includes pursuing specific political, social, technical, or scientific objectives – goals often found in non-profits or public goods projects. As long as the goal can be quantified into a measurable KPI, Futarchy can target it.  

*   The KPI could even be the output of a retroactive evaluation committee, allowing Futarchy to target goals that are difficult to measure objectively.  
*   KPI futarchy supports composite KPIs, allowing for the combination of multiple KPIs into a single KPI, with each assigned a different weight. This allows more complex goals to be expressed, while also potentially mitigating the manipulation risk of any single KPI.  
*   KPI Futarchy also enables novel forms of inter-organizational cooperation. An organization governed by KPI Futarchy could incorporate another organization's utility function into its own KPI definition as part of a negotiated agreement. This allows for binding treaties between organizations without needing external legal enforcement. See: [Futarchy of mutating preferences](https://thequantummilkman.substack.com/p/futarchy-of-mutating-preferences).  

## Asset Futarchy Offers Superior Robustness  
➜ Generally, Asset Futarchy has superior properties in robustness due to the nature of asset markets. Robustness relates to resistance against manipulation and distortion, alignment with stakeholder interests, and reliability over time.  

### Both Face Distortion Risks, but from Different Sources  
➜ KPI Futarchy can suffer impact distortion from pre-set KPI bounds affecting capital efficiency and neutrality, while Asset Futarchy can be distorted by changes in the quote asset's value.  

Proposal impact distortion refers to systematic biases in the Futarchy market's estimation of a proposal's true impact.  

KPI Futarchy requires the market creator to specify upper and lower KPI bounds in advance. This creates a trade-off:  

*   **Narrower bounds** improve capital efficiency (less idle collateral).  
*   **Wider bounds** reduce distortion (incentivizes traders to price in even extreme outcomes).  

However, using wider bounds means locking up more collateral to cover unlikely outcomes, reducing capital efficiency. This tension means distortion and capital efficiency are often inversely related in basic KPI Futarchy. Furthermore, the need for someone to set the bounds reduces *credible neutrality*. A market creator could potentially set bounds strategically to disadvantage proposals they oppose (e.g., setting a low upper bound for a proposal they dislike to bias the market's estimate downwards). Introducing leverage can mitigate this by decoupling the KPI range from capital efficiency.  

Asset Futarchy avoids these specific issues. It doesn't require an arbitrary upper price bound to be set, nor does it require collateral to be locked for extreme upside possibilities. Just as buying Bitcoin at `$15k` didn't require locking up collateral in case it hit `$100k`, Asset Futarchy handles potential upside naturally.  

However, Asset Futarchy is not immune to a different type of distortion. Its predictions rely on a *quote asset* (e.g., USDC). It's theoretically possible for a proposal to appear beneficial if it's expected to *decrease the value of the quote asset* rather than increase the value of the base asset. This risk is low if the quote asset is robust and largely independent of the Futarchy's decisions. But if the Futarchy becomes powerful enough, a proposal could potentially involve an economic attack on its own quote currency. Mitigation could involve requiring proposals to be positive-EV according to markets using multiple, independent quote assets.  

A similar attack vector exists for KPI Futarchy through its *collateral asset*. A malicious stablecoin operator could credibly commit to devaluing the stablecoin collateral *if* their preferred proposal fails, thus artificially inflating the market's estimate of that proposal's benefit.  

### Asset Futarchy Aligns Manipulation Cost with Value Increase; KPI Metric Manipulation is Often Cheaper  
➜ Manipulating Asset Futarchy outcomes to pass a proposal requires genuinely increasing expected asset value, aligning with goals, whereas manipulating KPI metrics is often cheaper and may not achieve true objectives.  

Consider manipulation of the *ground truth* or *resolution source*, not direct manipulation of the prediction market prices (which informed traders can counter).  

For Asset Futarchy, the cost of manipulating the outcome to make a proposal pass (e.g., by donating to the treasury conditional on passage) is equal to the cost of *actually increasing the asset's expected value*. Such "manipulation" aligns with the Futarchy's goal; it's essentially a bribe offered to the organization. It only succeeds if the bribe exceeds the market's perceived cost of the proposal. This reflects strong alignment between the mechanism and the goal of asset value maximization.  

For KPI Futarchy, manipulating the underlying KPI metric is often easier and less aligned with the organization's true goals. Most KPIs are proxies, and proxies can be gamed (Goodhart's Law). It might be possible to boost the KPI score in ways that don't actually achieve the intended underlying objective, or even run counter to it.  

This underscores the importance of selecting KPIs where the cost of manipulating the metric scales with the value of the decision, and ideally, the manipulation cost is always greater than the benefit an attacker could derive from forcing a proposal through the KPI Futarchy.  

### Traders Perceive Higher Metric Manipulation Risk and Lower Neutrality in KPI Futarchy  
➜ Traders face adverse selection from metric manipulation, perceiving higher risk and lower credible neutrality with custom KPIs in KPI Futarchy compared to widely observed asset prices.  

A bad actor who knows how to manipulate the final KPI value (or asset price, though often harder) can trade profitably against uninformed participants.  

> *Example:* Someone finds a loophole to artificially inflate a KPI. They buy 'long KPI' tokens cheaply, then trigger the manipulation near resolution, profiting at the expense of others. This risk is similar to trading in markets with vague resolution criteria (e.g., some past Polymarket examples) where ambiguity allows exploitation.  

Consequently, traders will tend to avoid Futarchy markets where the metric's manipulability is unclear, where they suspect the creator might exploit it, or where the manipulation cost is known to be low.  

Traders generally fear KPI manipulation more than asset-price manipulation. Asset prices, being widely traded and observed, are perceived as more *credibly neutral*. Understanding the potential manipulation surfaces of a custom KPI requires significant extra due diligence, deterring participation. The risk of *information asymmetry* (insiders knowing more about manipulation potential) is higher in KPI Futarchies. There's simply more room for debate, interpretation, and hidden manipulation vectors with bespoke KPIs.  

KPI-based Futarchies thus possess lower inherent credible neutrality from a trader's viewpoint. It's crucial for designers to select KPIs with transparent, well-understood, and high manipulation costs, and communicate these properties clearly.  

### Asset Futarchy Protects Minority Owners from Expropriation  
➜ Asset Futarchy inherently protects minority owners by aligning decisions with overall token value, while KPI Futarchy, focused on specific KPIs, does not offer this same protection against value expropriation.  

(Recommended reading: [Futarchy as Trustless Joint Ownership](https://www.umbraresearch.xyz/writings/futarchy)). In traditional DAOs or corporations, minorities are often subject to the whims of majority coalitions, exposing them to potential value extraction (expropriation). Futarchy, by ensuring decisions pass only if they are predicted to increase token value, provides a strong protection against this, with significantly lower overhead than traditional legal recourse.  

> *Mechanism:* If a majority proposes an expropriating action (harms overall value but benefits them), the predicted asset price conditional on the proposal *passing* will fall sharply. The price conditional on it *failing* will reflect the fair pre-proposal value. To force passage, the attacker must buy up the low-value 'pass' tokens and sell off the higher-value 'fail' tokens.  
*   *Outcome:* Minority holders can sell their stake to the attacker at a premium. The attacker effectively funds a risk-free exit for all existing holders while incurring prohibitive costs, making such attacks unprofitable.  

In contrast, KPI Futarchy *cannot* provide this trustless guarantee for minority asset holders. A proposal might correctly predict an increase in the chosen KPI and therefore pass, yet still harm the underlying asset value held by minorities. They would have no recourse within the Futarchy mechanism itself.  

This isn't a flaw of KPI Futarchy, but a reflection of its different objective: maximizing a specific KPI, not necessarily preserving or maximizing shareholder value.  

### KPI Futarchy has more Intrinsic Third-Party Dependencies  
➜ Both Futarchy designs have third-party dependencies (e.g., stablecoins), however KPI Futarchy's reliance on a KPI oracle is more fundamental and introduces risks of failure and malicious control.  

Both systems introduce dependencies:  

*   **Asset Futarchy** enshrines a quote asset (e.g., a fiat stablecoin) and depends on its continued availability and solvency.  
*   **KPI Futarchy** enshrines a KPI oracle (the data source) and depends on its durability and honesty. It *also* often enshrines a stablecoin as the collateral for outcome tokens.  

Ultimately, Asset Futarchy's dependency on a specific stablecoin isn't strictly necessary. A more censorship-resistant native asset (like ETH) could be used as the quote asset, although this introduces price volatility as a confounding factor.  

Therefore, only KPI Futarchy necessarily retains a dependency in the form of its KPI oracle (unless the KPI can be computed trustlessly on-chain). Furthermore, even accurately-reported KPIs are prone to degradation over long time scales due to Goodhart's Law/metric gaming.  

If either the oracle or the critical stablecoin becomes unavailable or fails, the Futarchy could become inoperable, potentially freezing all assets under its control unless a recovery mechanism is in place.  

Worse, if the KPI oracle or the stablecoin issuer becomes compromised or malicious, they could potentially steal all assets governed by the Futarchy. By controlling a key input to the resolution process, they can manipulate outcomes to pass arbitrary proposals that benefit them.  

> *Examples:* A malicious stablecoin operator could commit to increasing the stablecoin's value conditional on their proposal *failing* (in Asset Futarchy) or commit to making the stablecoin collateral worthless conditional on their proposal *failing* (in KPI Futarchy), both biasing the market towards passing their proposal.  

Despite its additional dependency on a KPI oracle, KPI Futarchy isn't necessarily unsuitable as a long-running governance mechanism. Just that if used this way, robust mechanisms are essential to recover from faulty or malicious oracles (or collateral failures), potentially requiring delegation of emergency powers to a trusted entity. Crucially, if the organization's goal *is* to optimize a non-asset-price KPI, Asset Futarchy simply isn't a substitute, despite its robustness advantages.  

---  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@distbit0)](https://twitter.com/distbit0) or [schedule a 20 min call](https://cal.com/distbit/20min)
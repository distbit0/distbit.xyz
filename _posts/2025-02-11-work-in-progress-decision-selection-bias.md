---
articleUrl: https://distbit.xyz/work-in-progress-decision-selection-bias
author: distbit
category: blog
date: 2025-02-11 00:00
description: ''
gist_url: https://gist.github.com/52dc926814a1f93ce4d2f263efcc6fbb
headerImage: false
layout: post
live: true
tag:
- share
title: Work in progress decision selection bias
---




## 1. Basic Setup and Notation  

1. **Random Variable for Proposal Effect**  
   Let $X$ be the (random) net benefit or “effect” of the proposal if it is ultimately implemented. If the proposal is never implemented, the payoff is 0.  

2. **Modes of Implementation**  
   There are three ways the proposal can end up being implemented (or “selected”):  
   - (a) Random selection (with probability $p(a)$).  
   - (b) “Accidental” selection by crossing a decision threshold in the market (with probability $p(b)$).  
   - (c) “Intentional” selection on merits (with probability $p(c)$).  

   By definition,  
   $$  
     p(a) + p(b) + p(c) \;=\; 1.  
   $$  

3. **Liquidity Events**  
   If the proposal is edging near the decision threshold, traders may try to sell shares at that threshold price. Let  
   - $p_\ell$ be the probability of *sufficient* liquidity such that traders can exit at or near the threshold price,  
   - $\,1 - p_\ell$ be the probability of *insufficient* liquidity, forcing holders to keep their shares, thus earning (or losing) the actual effect $X$.  

4. **Upwards Bias**  
   Let $\text{upwardsBias} > 1$ (or $\ge 1$) be a factor representing the conditional optimism embedded in prices if the market is scored only when the proposal is chosen.  

---  

## 2. Share Expected Value (EV)  

From your bullet points, an investor’s willingness to pay for one share in the sub‐market can be written:  

$$  
  \text{ShareEV} = p(a)\,\mathbb{E}[X]  
  \;+\;  
  p(b)\,  
  \Big[  
     p_\ell \cdot (\text{threshold price})  
     \;+\;  
     (1 - p_\ell)\,\mathbb{E}[X]  
  \Big]  
  \;+\;  
  p(c)\,  
  \bigl(\mathbb{E}[X] \times \text{upwardsBias}\bigr).  
$$  

- **Interpretation**  
  1. With probability $p(a)$, the proposal is chosen at random. The share’s payoff is just the average $\mathbb{E}[X]$.  
  2. With probability $p(b)$, the proposal crosses the decision threshold “accidentally.” If there is enough liquidity ($p_\ell$), the holder can cash out at the threshold price. Otherwise, they end up holding until resolution for an average payoff $\mathbb{E}[X]$.  
  3. With probability $p(c)$, the proposal is chosen “on merits.” Because that subset of scenarios may be heavily skewed to favorable private information, the conditional expectation is $\mathbb{E}[X]\times\text{upwardsBias}$.  

One immediate consequence is that if everyone can reliably exit at the threshold price, then $p_\ell \approx 1$, which heavily influences how $p(b)$ and the share’s overall EV behave.  

---  

## 3. Limit Orders Near the Threshold  

You noted that if traders place limit orders just below the threshold price, they can ensure any “accidental crossing” gets matched by sell orders:  

- In that scenario,  
  $$  
    p(b)\,\bigl[  
      p_\ell \cdot (\text{threshold price})  
      \;+\;  
      (1 - p_\ell)\,\mathbb{E}[X]  
    \bigr]  
    \;\approx\;  
    p(b)\,\bigl[  
      1 \cdot (\text{threshold price})  
    \bigr]  
    \;=\;  
    p(b)\,\text{threshold price},  
  $$  
  because the sell orders can guarantee $p_\ell \approx 1$.  

- This lowers the probability that the price can “accidentally” cross the threshold without someone selling, implying $p(b)$ goes down.  

- Then the EV simplifies to:  
  $$  
    \text{ShareEV}  
    \;=\;  
    p(a)\,\mathbb{E}[X]  
    \;+\;  
    p(b)\,\text{threshold price}  
    \;+\;  
    p(c)\,\bigl(\mathbb{E}[X]\times \text{upwardsBias}\bigr).  
  $$  
  If $p(b)$ drops toward 0, the share EV may approximate:  
  $$  
    \text{ShareEV}  
    \;\approx\;  
    p(a)\,\mathbb{E}[X]  
    \;+\;  
    p(c)\,\bigl(\mathbb{E}[X]\times \text{upwardsBias}\bigr).  
  $$  

---  

## 4. Defining Decision Selection Bias More Directly  

Suppose we let:  
- $\mu = \mathbb{E}[X]$ = **unconditional** average effect of the proposal,  
- $\mu_c = \mathbb{E}[X \mid \text{proposal is selected intentionally}]$.  

Then a **decision selection bias** can be measured as:  
$$  
  \Delta \;=\; \mu_c \;-\; \mu.  
$$  
A positive $\Delta$ means the chosen proposals look “too good” compared to the unconditional average, purely because they were selected in states of the world favoring them. This can happen even if $\mu_c$ < $\mu$ in a bigger, unconditional sense, but the market only sees the slice where the internal signal favored choosing it.  

> **Saturation Effect:** As the skew grows, $\Delta$ grows, but if the decision mechanism starts randomly selecting or fails to cross thresholds, you dilute how often you land in the strongly favorable subset. Hence, the overall decision selection bias saturates rather than growing linearly with the skew.  

---  

## 5. Extended Markets, Volatility, and Implied Volatility  

- **Empirical Volatility** over time in a sub‐market does not necessarily match the *implied* volatility of outcomes if the threshold is crossed. You can keep markets open until the observed price is stable, but that doesn’t remove the possibility of a jump to the threshold on new information.  

- Formally, define an *implied volatility factor* $\sigma_{\text{impl}}$ such that the price incorporates a small probability of a large swing needed to cross the threshold. The *empirical* volatility $\sigma_{\text{emp}}$ might be near zero if no big swings have yet occurred, but $\sigma_{\text{impl}}$ could remain high because traders see a real risk that news might suddenly move the price from well below the threshold to above it (thereby selecting the proposal).  

No matter how long you wait for $\sigma_{\text{emp}} \to 0$, the important event—“price crossing threshold”—remains a possibility with some probability. The sub‐token is always partially pricing in that event, so you can’t eliminate the embedded “jump risk” from the market.  

---  

## 6. Randomization vs. Market Reversion  

You discuss partial randomization strategies ($p(a) > 0$) to reduce selection bias:  

1. **Randomization Only** (no reversion)  
   - Even though randomizing a fraction of decisions can reduce confounding, it can also reduce overall decision accuracy. If confounding (i.e., $\Delta$) *increases* when you *increase* the fraction of “intentionally chosen” decisions, you can end up in a bind. In your terms, you can’t just keep adding random picks to fix confounding without hurting accuracy in other ways.  

2. **Randomization With Reversion**  
   - If every *non‐randomized* decision has to revert the market or otherwise pay out in a different mode, you can completely remove the standard form of selection bias (since the markets that truly decide are only the random ones).  
   - But that means 100% random picks in that subset, so you do end up implementing some suboptimal proposals purely at random, trading off bias removal vs. increased risk of bad proposals.  

Formally, you can define:  
$$  
  p(a) = \text{prob. of random selection},   
  \quad  
  p(\text{reversion}) \text{ (some function of the final threshold crossing)},  
$$  
and then track how each piece influences the final expected utility, selection bias, and trader PnL variance.  

---  

## 7. UpwardsBias from Conditional Pricing  

You note that if the proposal is only scored/observed in worlds where it’s chosen, the price “bakes in” a conditional optimism:  
$$  
  \text{Price} \;\approx\; \mathbb{E}\bigl[X \,\big|\; \text{chosen} \bigr].  
$$  
In a typical unconditional market, the price might be $\mathbb{E}[X]$. But here, ignoring the possibility of *not* being selected often inflates the conditional price. Denote this by:  
$$  
  \text{upwardsBias} \;=\;   
  \frac{\mathbb{E}[X \,\mid\, \text{chosen}]}{\mathbb{E}[X]}.  
$$  
Any new private signal that “this time the proposal *really is* good” only appears if the proposal is chosen, further pushing the conditional expectation above the unconditional one.  

---  

## 8. Partial Equilibria  

You mention that fully uninformative or fully informative are unstable equilibria. One way to put it formally:  

- Let $\alpha$ measure “informativeness” of a decision market’s final prices (e.g., correlation between the price and true $\mathbb{E}[X]$).  
- Let $\beta$ measure the “degree” of selection bias (some function of $\Delta$).  

As you shift $\alpha$ and $\beta$, each attempts to pull the other in conflicting directions: if prices get more accurate, the slices that lead to a decision can be more heavily self‐selected, thereby raising bias. If you squash bias (by randomization, reversion, or other methods), you reduce the chance that signals can refine the decision, hurting accuracy. This interplay tends to produce partial‐informative equilibria.  

---  

## 9. Final Notes on Formal Partial Randomization Strategies  

A possible parametric approach:  

- Let $\rho \in [0,1]$ be the fraction of decisions that are forcibly randomized ($p(a) = \rho$).  
- For the other $(1-\rho)$ fraction, let the proposal be chosen if and only if the sub‐market crosses a threshold. That portion can still contain accidental vs. intentional selection distinctions.  
- To incorporate reversion, define $\omega \in [0,1]$ as the fraction of *non‐random* decisions that revert the market.  

You can write expected utility, trader PnL variance, and bias as functions $f(\rho,\omega)$, then look for an optimal interior point $(\rho^\ast,\omega^\ast)$. From your bullets, it seems that in some cases $\rho^\ast = 0$ unless you revert the corresponding markets, but a small $\rho$ can be beneficial to keep trader risk lower, encouraging more participation.  

---  

## Potential Points Needing Clarification  

1. **Definition of “Accidental”**  
   How exactly is “accidental crossing” triggered? Do you have a formula for how the threshold is set, or does it adjust in real time based on a specific rule?  

2. **Exact Role of Limit Orders**  
   You suggest that with enough limit orders, $p_\ell$ can become effectively 1. Is there any friction or cost that might prevent large blocks of limit orders at the threshold?  

3. **Functional Form of UpwardsBias**  
   If you want a closed‐form expression for $\text{upwardsBias}$, you might define $\text{upwardsBias} = 1 + \gamma$, where $\gamma$ depends on some measure of correlation or private information advantage. Or keep it as an abstract factor.  

4. **Definition of “Confounding Increases as a Function of Decision Accuracy”**  
   You might want a direct equation linking a measure of confounding (e.g., gap between unconditional and conditional expectations) to the probability that the final decision is correct. In some models, that gap widens the more precisely the final chosen proposals are singled out by good signals.  

If you found this interesting, have feedback or are working on something related, let's chat: [twitter (@0xdist)](https://twitter.com/0xdist) or [schedule a 20 min call](https://cal.com/distbit/20min)
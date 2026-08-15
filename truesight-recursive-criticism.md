---
layout: page
title: "Truesight: recursive criticism for public claims"
description: "How Truesight organizes public claims, sources, criticisms, and replies into deterministic recursive refutation trees."
permalink: /truesight-recursive-criticism/
---

# Truesight: recursive criticism for public claims

Public claims collect objections, sources, qualifications, and replies across social posts, articles, chats, and expert discussions. The claim remains easy to find. The criticism that should change what people believe becomes scattered across the surrounding discourse.

[Truesight](https://truesight.ink) turns that material into public claim reviews. Each page starts with one declarative claim, gathers source-backed propositions that bear on it, and organizes those propositions into a recursive criticism tree. The aim is not to produce another search result or a balanced list of arguments. It is to make the current error-correction process inspectable.

## From sources to criticism

Truesight discovers claims for a defined reader profile, retrieves relevant public material, and distills it into atomic points with their source URLs attached. Each active point has one role: it either explains its target or identifies an error that decisively refutes it. A point can target the root claim or another point.

This distinction matters. Context can improve a synthesis without changing the claim's status. Qualifications, partial objections, uncertainty, and merely related facts are rejected as refutations. The system must identify the proposition that fails and the criticism that defeats it.

## Refutation is recursive

A target is refuted when it has a direct refutation that remains unrefuted. The same rule applies at every depth. If a criticism is itself refuted by an unanswered response, it no longer defeats its original target. A response can then be challenged in turn.

Truesight does not add support and opposition scores, take an LLM vote, or convert source counts into confidence. The graph derives a provisional status from the surviving criticism. A claim labelled `stands` has not been refuted by the current tree. That label does not mean the claim is final, certain, or immune to criticism.

The model preserves a useful asymmetry. Evidence and explanation help people understand a claim, but they do not protect it from a decisive criticism. Only answering that criticism does. An accepted claim can therefore be overturned when a new objection survives, and restored when a successful countercriticism arrives.

## Deterministic structure, fallible judgment

Language models propose points, relationships, and syntheses. Deterministic validation checks that every source is accounted for, every active point has one valid parent, all parent chains reach the claim, no cycle exists, and every requested target has a current synthesis. The status calculation itself is ordinary recursive code.

Those checks make the artifact reproducible, but they do not prove that the model understood every source or relation correctly. Retrieval can miss a decisive idea. A source can be wrong. A proposed refutation can fail to be decisive. The public tree exists so those mistakes can become concrete targets for further criticism rather than disappearing inside a fluent answer.

## Truth status and attention are separate

The criticism tree determines whether a claim stands or is refuted. A separate assessment ranks which reviewed claims deserve attention for a defined audience.

The current ranking estimates the consequence of the claim standing versus being refuted and how surprising the derived status is relative to the audience's present beliefs. Priority is utility multiplied by surprise. These estimates can be disputed without changing what the criticism tree says. Consensus describes current belief; it does not determine truth.

## What exists now

The [public prototype](https://truesight.ink) runs this pipeline for a narrow company-valuation profile. For example, its review of [Microsoft's fiscal 2026 cloud backlog](https://truesight.ink/issues/microsoft-s-fiscal-2026-cloud-backlog-raises-its-forward-revenue-visibility) exposes the source-backed claim, synthesis, and open or answered challenges on one page.

The current corpus is deliberately small. Truesight does not yet support public submissions, corrections, or bounties. Those are the next step: let people add claims, evidence, criticisms, and replies, then reward contributions for improving the public problem map rather than for popularity or rhetorical force.

*Prototype description, 9 August 2026.*

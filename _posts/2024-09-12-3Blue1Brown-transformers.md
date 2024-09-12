---
layout: post
title: "Understanding transformers"
date: 2024-09-12
---

# Attention in Transformers, Visually Explained: Summary and Insights

I recently watched a video lecture titled *Attention in Transformers, Visually Explained*, and this post documents my learning process. The goal is to break down the key concepts in a conversational but accurate manner, demonstrating my understanding of attention mechanisms in transformers.

## Transformers and Their Context

Transformers play a central role in modern AI, especially in large language models (LLMs). They were first introduced in the 2017 paper titled *Attention is All You Need*. The main job of a transformer is to predict the next word in a sequence of text by using a mechanism called **attention**.

The input to a transformer is split into **tokens**—often words or subwords—and each token is mapped to a high-dimensional vector, called an **embedding**. These embeddings carry semantic meaning, like how certain directions in this space can represent gender, such as the difference between masculine and feminine nouns. The transformer’s job is to refine these embeddings to include not just the word itself, but also its context.

## Motivation for Attention

One key issue attention addresses is ambiguity in word meaning based on context. Consider the word *mole*:
- "American true mole"
- "One mole of carbon dioxide"
- "Take a biopsy of the mole"

In these examples, *mole* means different things, but the initial embedding doesn’t reflect that—it only encodes the word itself. Attention enables the model to adjust the embedding so that it reflects the specific meaning based on context.

## How Attention Works

Let’s take a basic example: “a fluffy blue creature roamed the verdant forest.” The adjectives *fluffy* and *blue* should modify the meaning of *creature*. After the initial token embeddings, attention allows the transformer to update the meaning of *creature* by incorporating the context provided by its adjectives.

### Query, Key, and Value Mechanism

The attention mechanism works through three vectors for each token:
1. **Query vector** (\( q \)): A compressed vector that helps identify relevant tokens.
2. **Key vector** (\( k \)): A vector that encodes the ability of a token to answer queries.
3. **Value vector** (\( v \)): The information passed to other tokens.

These vectors are computed using matrices of learnable parameters. For example, the **query matrix** (\( W_q \)) multiplies the embedding to produce the query vector \( q \), which helps the model "ask" if certain words (like adjectives) are relevant.

The **dot product** of the query and key vectors determines how closely aligned two words are, i.e., how much one word attends to another. These dot products are scaled and then passed through a **softmax** function, which normalizes them to a probability distribution.

Finally, the **value vectors** are used to update the embeddings. For instance, the value vector of *fluffy* is added to *creature*’s embedding, refining its meaning to something closer to a “fluffy creature.”

### Multi-Headed Attention

A single **attention head** as described above handles one aspect of contextual updating, such as adjective-noun relationships. However, transformers use **multi-headed attention**, where multiple attention heads run in parallel, each capturing different patterns. For example, one head might focus on adjectives while another tracks syntactic relationships like subject-verb dependencies.

In large models like GPT-3, there can be **96 attention heads** per layer, all working simultaneously, enabling the model to capture a wide array of relationships and nuances.

### The Cost of Attention

The size of the attention pattern scales with the **square of the context size**, which can become computationally expensive as the context window grows. Increasing the context size is a key challenge in scaling large models, but innovations in this area aim to make larger contexts more efficient.

## Final Thoughts

The attention mechanism is both powerful and parallelizable, making it essential for the scalability of transformers. By enabling models to learn rich contextual relationships, attention helps refine word embeddings, allowing the model to accurately predict the next token based on the broader context.

Watching this lecture deepened my understanding of transformers and attention, especially the nuances of the **query-key-value** structure and how multi-headed attention enhances the model's ability to capture complex relationships in text.

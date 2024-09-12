---
layout: post
title: "Understanding Transformers"
date: 2024-09-12
---

# Summary of Attention in Transformers, Visually Explained

I watched and summarized the video *Attention in Transformers, Visually Explained*. The video breaks down the attention mechanism, a critical component of transformers, widely used in modern AI systems.

## What is Attention?

Transformers, introduced in the paper *Attention is All You Need*, are designed to predict the next token in a sequence. The key innovation is the attention mechanism, which adjusts word embeddings based on the surrounding context. Initially, each token is associated with a high-dimensional vector, known as an embedding. But without attention, these embeddings lack context.

For example, the word *mole* has different meanings based on the surrounding words: "American true mole", "one mole of carbon dioxide", and "take a biopsy of the mole". The attention mechanism helps refine these embeddings by pulling in relevant context.

## Queries, Keys, and Values

Attention operates using three primary matrices:
- **Query (Q)**: Represents the current word's request for context.
- **Key (K)**: Contains information from the surrounding words.
- **Value (V)**: Holds the information that will be transferred if there is a match.

Each word's embedding generates a query vector \\( Q \\) by multiplying the embedding by the query matrix \\( W_q \\). Similarly, the key vector \\( K \\) is produced by multiplying the embedding by the key matrix \\( W_k \\), and the value vector \\( V \\) is derived by multiplying the embedding by the value matrix \\( W_v \\).

The alignment between queries and keys is computed through the dot product:
$$
q_i \cdot k_j
$$
This forms a grid of dot products, with each dot product representing how much attention one word should pay to another.

## The Attention Pattern

These dot products are normalized using a softmax function to ensure that the attention weights sum to 1:
$$
\text{softmax}\left( \frac{q_i \cdot k_j}{\sqrt{d_k}} \right)
$$
Here, \\( d_k \\) is the dimension of the key space, which stabilizes the computation. The normalized attention weights are then used to take a weighted sum of the value vectors:
$$
\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{QK^T}{\sqrt{d_k}} \right) V
$$

## Masking and Scaling

During training, transformers predict multiple next tokens in parallel, so we mask out future tokens to avoid "leaking" information from later tokens. This is done by setting certain values in the attention grid to negative infinity before applying softmax, ensuring that the future doesn't influence the past.

## Multi-Headed Attention

Rather than applying a single attention mechanism, transformers use *multi-headed attention*, which runs multiple attention mechanisms in parallel. Each head has its own query, key, and value matrices, allowing the model to focus on different aspects of the context simultaneously. GPT-3, for instance, uses 96 attention heads per block. 

## Counting Parameters

The video provides a parameter count for the attention mechanism. Each query, key, and value matrix in a single attention head has dimensions of \\( d_{model} \\times d_{k} \\). In GPT-3, these dimensions lead to millions of parameters, especially when scaled across 96 attention heads and 96 layers.

In practice, the value matrix is factored into two smaller matrices:
1. **Value down matrix**: Projects the value vector to a smaller space.
2. **Value up matrix**: Maps the smaller vector back to the original embedding space.

This reduces the number of parameters while maintaining flexibility.


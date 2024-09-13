---
layout: post
title: "3Blue1Brown: dot product"
date: 2024-09-11
external_url: "https://youtu.be/LyGKycYT2v0?si=ZMmc6FlWaiuY0GPo"
---

# Dot Product: Key Insights

## Numerical Definition
The dot product of two vectors is the sum of the products of their corresponding components:

\\( \mathbf{v} \cdot \mathbf{w} = \sum_{i=1}^{n} v_i w_i \\)

For example:

\\( [1, 2] \cdot [3, 4] = 1 \cdot 3 + 2 \cdot 4 = 11 \\)

## Geometric Interpretation
The dot product can be seen as the projection of one vector onto another:

$$
\mathbf{v} \cdot \mathbf{w} = |\mathbf{v}| |\mathbf{w}| \cos(\theta)
$$

Where \\( \theta \\) is the angle between the vectors. It's positive if they point in the same direction, zero if perpendicular, and negative if in opposite directions.

## Testing code blocks

```python
# Python example code
def hello_world():
    print("Hello, world!")
```

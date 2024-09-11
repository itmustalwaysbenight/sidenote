---
layout: post
title: "3Blue1Brown: dot product"
date: 2024-09-11
---

# Dot Product: Key Insights

## Numerical Definition
The dot product of two vectors is the sum of the products of their corresponding components:

\\[
\mathbf{v} \cdot \mathbf{w} = \sum_{i=1}^{n} v_i w_i
\\]

For example:

\\[
[1, 2] \cdot [3, 4] = 1 \cdot 3 + 2 \cdot 4 = 11
\\]

## Geometric Interpretation
The dot product can be seen as the projection of one vector onto another:

\\[
\mathbf{v} \cdot \mathbf{w} = |\mathbf{v}| |\mathbf{w}| \cos(\theta)
\\]

Where \(\theta\) is the angle between the vectors. It's positive if they point in the same direction, zero if perpendicular, and negative if in opposite directions.

## Connection to Projections
Dot products are fundamentally related to projecting one vector onto another. Taking the dot product with a unit vector gives the projection's length.

## Duality and Linear Transformations
The dot product relates vectors and transformations. Any linear transformation that projects a vector to a number can be expressed using a dot product:

\\[
\mathbf{T}(\mathbf{v}) = \mathbf{v} \cdot \mathbf{u}
\\]

## Conclusion
The dot product isn't just about multiplying vectors—it's key to understanding projections and linear transformations.

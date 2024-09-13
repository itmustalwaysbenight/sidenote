---
layout: post
title: "Building Micrograd"
date: 2024-09-13
external_url: "https://youtu.be/VMj-3S1tku0?si=HReDnHTKIIIseDpg"
---


# The spelled-out intro to neural networks and backpropagation: building micrograd

I watched and am summarizing a lecture that walks through building an automatic differentiation engine and neural network from scratch, called Micrograd. The content covers how backpropagation works, how derivatives are computed, and how neural networks perform gradient-based optimization.

## Neural Networks and Backpropagation

Neural networks are essentially functions that map inputs (data) to outputs (predictions). The key to training these networks lies in optimizing their parameters (weights and biases) so that the predictions match the target values as closely as possible. The process of tuning these weights relies on **backpropagation** — a method to compute the gradient of the loss function with respect to the weights.

The core mathematical tool for backpropagation is the **chain rule** from calculus. For any function \\( f(x) \\), the derivative \\( f'(x) \\) is defined as:

\\[
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
\\]

In practice, to compute this numerically for small \\( h \\), we approximate it using a finite difference. However, deep learning frameworks use **automatic differentiation**, which is what Micrograd implements.

## Scalar Computation and Graph Visualization

In Micrograd, a core class, `Value`, is used to represent scalars, which wrap the raw numbers and store the gradients. Each scalar participates in an expression graph, where each node records the operation that created it. For instance, given two inputs, \\( a = -4 \\) and \\( b = 2 \\), we can create an expression like:

\\[
c = a + b
\\]
\\[
d = a \times b
\\]
\\[
e = d^2
\\]

Micrograd builds an internal computational graph that tracks these relationships.

### Forward and Backward Passes

The **forward pass** computes the final value of the output node, while the **backward pass** computes the gradient of the output with respect to each input by propagating the gradients backward through the graph. For example, for the output \\( g = f(e) \\), we calculate the derivative \\( \frac{dg}{de} \\) using the chain rule:

\\[
\frac{dg}{da} = \frac{dg}{de} \times \frac{de}{da}
\\]

### Backpropagation Example

Given the expression \\( f(x) = 3x^2 - 4x + 5 \\), the gradient of \\( f \\) at \\( x = 3 \\) can be computed manually or via backpropagation. Using the chain rule:

\\[
f'(x) = 6x - 4
\\]

For \\( x = 3 \\), this evaluates to:

\\[
f'(3) = 6(3) - 4 = 14
\\]

This process generalizes to complex neural network functions, where gradients of the weights are computed for updating the network.

## Neurons and Multi-Layer Perceptrons

A **neuron** is a simple unit that takes multiple inputs, applies weights and a bias, computes the dot product, and then passes the result through an **activation function** like the hyperbolic tangent:

\\[
\text{output} = \tanh(w_1 x_1 + w_2 x_2 + b)
\\]

In code, the forward pass of a neuron might look like this:

```python
x1, x2 = 2.0, 3.0
w1, w2 = Value(-0.5), Value(0.1)
b = Value(0.0)

# weighted sum + bias
output = tanh(w1 * x1 + w2 * x2 + b)
```

A **multi-layer perceptron (MLP)** stacks layers of neurons, with the output of one layer feeding into the next. The backpropagation through this MLP works by recursively applying the chain rule to compute the gradients of all the weights and biases.

## Loss Function and Optimization

To train a neural network, we define a **loss function** that measures the difference between the network's predictions and the true labels. One common loss function is **mean squared error** (MSE):

\\[
\text{MSE} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2
\\]

To minimize the loss, we perform **gradient descent**, where we update each parameter in the direction that reduces the loss:

\\[
\text{weight} = \text{weight} - \eta \times \text{gradient}
\\]

Here, \\( \eta \\) is the **learning rate**, which controls the step size. If we set it too high, the optimization might become unstable.

### Gradient Descent Example

For a simple neuron with two weights and a bias, the gradient descent step looks like this:

```python
learning_rate = 0.01
for p in [w1, w2, b]:
    p.data -= learning_rate * p.grad
```

This process is repeated iteratively, gradually improving the model's predictions.

## Building Micrograd

The Micrograd library is minimal but powerful, providing the necessary building blocks for neural networks. It implements automatic differentiation by keeping track of each operation in a computational graph, and by defining the backward pass for each operation (addition, multiplication, etc.).

The backpropagation in Micrograd is achieved by calling the `backward()` function starting from the final node, which propagates the gradients back through the graph:

```python
out.backward()  # triggers the backward pass
```

## From Micrograd to PyTorch

PyTorch, a modern deep learning framework, builds on the same principles as Micrograd but scales them to handle large tensors (multi-dimensional arrays) instead of single scalars. In PyTorch, operations are performed on **tensors**, and automatic differentiation is managed efficiently through its computational graph. 

For example, in PyTorch, we could define and backpropagate through a simple network like this:

```python
import torch
x = torch.tensor([2.0, 3.0], requires_grad=True)
w = torch.tensor([-0.5, 0.1], requires_grad=True)
b = torch.tensor([0.0], requires_grad=True)

# forward pass
output = torch.tanh(w[0] * x[0] + w[1] * x[1] + b)
output.backward()  # backpropagation
```

PyTorch handles the gradients of tensors with the same `grad` attributes as in Micrograd, but with added efficiency for large-scale operations.

---
title: "Dalembert Principle"
published: 2026-06-11
description: "阐述达朗贝尔原理"
tags:
  - "分析力学"
category: "经典力学"
lang: zh-CN
draft: false
---

## 达朗贝尔原理

在使用牛顿力学处理问题时，我们经常接触的是动力学问题，但是在分析力学中，我们可以引入 **达朗贝尔原理** 来统一静力学和动力学问题。

**达朗贝尔原理**：广义力对于理想约束力学系统做的虚功之和为0。

数学表示：

$$
\sum(F_a - m\ddot{q_b})\delta x = 0
$$

证明：

从牛顿第二定律出发：

$$
m\ddot{q} = F_a + F_c
$$

我们对物体施加一个虚位移 $\delta x$

$$
(F_a - m\ddot{q} - F_c)\delta x = 0
$$

由理想约束条件：

$$
(F_a - m\ddot{q})\delta x= 0
$$

推广之后就得到了达朗贝尔原理。

**理想约束条件**：约束力做的虚功为0

数学表述：

$$
F_c \delta = 0
$$

常见的理想约束条件就比如：支撑力约束，绳子拉紧时的张力……

## 使用达朗贝尔原理推导出欧拉-拉格朗日方程

假设系统有 $n$ 个广义坐标，共有 $N$ 个粒子，根据达朗贝尔原理得到：

$$
(F_a - m_a \ddot{q_a})\frac{\partial x_a}{\partial q_b}\delta q_b = 0
$$

虚位移可以使用广义坐标表示出：

$$
\dot{x_a} = \frac{\partial x_a}{\partial q_b}\dot{q_b} + \frac{\partial x_a}{\partial t}
$$

于是我们可以有：

$$
\frac{\partial \dot{x_a}}{\partial \dot{q_b}} = \frac{\partial x_a}{\partial q_b}
$$

于是我们得到：

$$
F_a \delta x_a = F_a \frac{\partial x_a}{\partial q_b}\delta q_b = Q_i \delta q_i
= m_a \ddot{x_a} \frac{\partial x_a}{\partial q_i}\delta q_i
$$

可以看出广义力 $Q_i$ 为:

$$
Q_i = m_a \ddot{x_a} \frac{\partial x_a}{\partial q_i}
$$

接下来我们只需要对右式进行分布积分就可以得到欧拉拉格朗日方程，此处省略了后续步骤。

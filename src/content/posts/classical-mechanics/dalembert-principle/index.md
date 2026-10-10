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

接下来我们只需要对右式进行分布积分就可以得到欧拉拉格朗日方程，在此之前，我们需要证明一个引理：
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial f(q^{a},t) }{ \partial q^{a} }   \right) = \frac{ \partial  }{ \partial q^{b} } \left( \frac{\mathrm{d}f(q^{a},t)}{t} \right)
$$
证明如下：
$$
\begin{align}
\frac{\mathrm{d}f}{\mathrm{d}t}  &  = \frac{ \partial f }{ \partial t } +\frac{ \partial f }{ \partial q^{a} }\frac{ \partial q^{a} }{ \partial t }  \\
\frac{ \partial  }{ \partial q^{b} }\left( \frac{\mathrm{d}f}{\mathrm{d}t} \right) & = \frac{ \partial ^{2}f }{ \partial t \partial q^{b} } + \frac{ \partial f }{ \partial q^{b}\partial q^{a} }  \frac{ \partial q^{a} }{ \partial t }     \\
\frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial f }{ \partial q^{a} }  \right) & = \frac{ \partial f }{ \partial q^{a}\partial t } + \frac{ \partial f }{ \partial q^{a}\partial q^{b} }\frac{ \partial q^{b} }{ \partial t }   
\end{align}
$$
替换一下指标，就可以得到：
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial f(q^{a},t) }{ \partial q^{a} }   \right) = \frac{ \partial  }{ \partial q^{b} } \left( \frac{\mathrm{d}f(q^{a},t)}{t} \right) = \frac{ \partial f }{ \partial q^{b} \partial t} + \frac{ \partial f }{ \partial q^{a}\partial q^{b} } \frac{ \partial q^{b} }{ \partial t }   
$$
如此一来，我们写下达朗贝尔方程：
$$
(m_{a} \ddot{r_{a}} - F_{A}^{(a)})\frac{ \partial r_{a} }{ \partial q^{b} }\delta q^{b}  = 0
$$
每一项 $\delta q$ 前面的系数都必须是0，所以得到方程：
$$
m_{a} \ddot{r_{a}}\frac{ \partial r_{a} }{ \partial q^{b} } - F_{A}\frac{ \partial r_{a} }{ \partial q^{b} } = 0   \qquad(a=1,2,3\dots)
$$
看左边第一项，拆成全微分：
$$
m_{a}\ddot{r_{a}}\frac{ \partial r_{a} }{ \partial q^{b} }  = m_{a}\left( \frac{\mathrm{d}}{\mathrm{d}t}\left( \dot{r_{a}}\frac{ \partial r_{a} }{ \partial q^{b} }  \right) - \dot{r_{a}} \frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial r_{a} }{ \partial q^{b} }  \right)
$$
代入之前得到引理：
$$
m_{a}\left( \frac{\mathrm{d}}{\mathrm{d}t}\left( \dot{r_{a}}\frac{ \partial r_{a} }{ \partial q^{b} }  \right) - \dot{r_{a}} \frac{\mathrm{d}}{\mathrm{d}t}\frac{ \partial r_{a} }{ \partial q^{b} }  \right) = \frac{m_{a}}{2} \left( \frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial \dot{r_{a}}^{2} }{ \partial \dot{q^{b}} }  \right) - \frac{ \partial \dot{r_{a}}^{2} }{ \partial q^{b} }  \right) = \frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial T_{a} }{ \partial \dot{q_{b}} }  \right) - \frac{ \partial T_{a} }{ \partial q^{b} } 
$$
这就得到拉格朗日方程：
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial T_{a} }{ \partial \dot{q_{b}} }  \right) - \frac{ \partial T_{a} }{ \partial q^{b} }  = F_{A}^{(a)} \frac{ \partial r_{a} }{ \partial q^{b} } 
$$
如果系统是一个保守系统，并且势能不显含广义速度，那主动力可以用势能负梯度表示出来：
$$
F_{A}^{(a)} = -\nabla_{r} V^{(a)}
$$
如果我们使用广义坐标进行表示的话：
$$
F_{A}^{(a)}\frac{ \partial r_{a} }{ \partial q^{b} }  = -\nabla_{q^{b}}V(q^{b}) = -\frac{ \partial V }{ \partial q^{b} } 
$$
进行移相，定义拉格朗日量：$L = T-V$，得到：
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left( \frac{ \partial L }{ \partial \dot{q}^{b} }  \right)-\frac{ \partial L }{ \partial q^{b} } = 0 
$$

---
title: Lagrange Mechanics
published: 2026-05-25
description: 对于拉格朗日力学的简单介绍
tags:
  - 分析力学
category: 经典力学
lang: zh-CN
draft: false
---

## 拉格朗日力学

**牛顿力学体系**中，分析问题的核心是 **力** ，但是当问题的复杂度提升，受力分析变得复杂和不明晰，牛顿力学的实用性就大幅下降，比如在解决一般理想双摆的问题中，不同性质的力有各种各样的方向，让列出微分方程显得十分困难，而**拉格朗日力学**则弥补了牛顿力学在这一方面的短板：拉格朗日力学擅长保守系统的运动分析，由于抛弃了传统的 **力** 这一概念，在数学上更加注重解析表达，更具有理论美感。

### 广义坐标

在热学中，我们引入了内能$U$、焓$H$、熵$S$来描述一个热力学系统，那么为了描述一个力学系统的状态，我们也可以引入一些参数。

求解一个力学问题，我们通常需要知道系统随着时间的演化过程，我们在牛顿力学体系中可以引入 **笛卡尔坐标系** 等坐标系来描述物体的位置，并且用三维的速度矢量来描述物体位置随时间的演化，相似的，我们在拉格朗日力学体系中引入参数 **广义坐标** 来描述系统在位形空间中的位置，这对应的也就是各个物体的几何位置。

不同的是，广义坐标是一种更加抽象的概念，你可以设置 $\theta$ 作为广义坐标，你也可以设置 $2x$ 作为广义坐标，只要广义坐标可以描述系统物体的几何位置分布即可。

至少的来完整描述一个物体的几何位置分布的广义坐标个数即系统的 **自由度** ，对于一个三维空间中自由运动的粒子，其自由度是3；对于一个绕固定一点在单一平面内摆动的单摆，其自由度是1。

### 广义速度

有了广义坐标，我们就需要**广义速度**来描述广义坐标随时间的演化，其数学定义为：

$$
\dot{q} = \frac{\partial q}{\partial t}
$$

广义速度和广义坐标一起描述了系统在 **速度相空间** 中的分布情况，此处的 **速度相空间** 在热力学中也有类似的概念，我们在讨论麦克斯韦-玻尔兹曼分布的时候，我们得到的分布函数其实也是描述粒子在速度相空间的分布，对于一个在三维空间中自由运动的粒子，速度相空间是由3个广义坐标和3个广义速度织成的6维空间，但是此处我们需要澄清的是：速度相空间并不是真正的相空间，因为广义速度和广义坐标并不完全**独立**，我们在取定了广义坐标函数之后，广义速度事实上也是确定的，更加详细的讨论可见哈密顿力学。

### 拉格朗日方程

在整个拉格朗日力学的框架中，**拉格朗日量可以说是最为核心的物理量**，从性质上看，拉格朗日量是描述系统的状态函数，类似于热力学系统中的内能等，从物理意义上看，拉格朗日量是一个不随参考系而变化的量，从力学意义上看，拉格朗日量引出的拉格朗日力学需要和牛顿力学兼容。

于是拉格朗日量可以写为（此处导出的过程可以参见朗道力学篇对于拉格朗日量的导出）：

$$
\mathcal{L}{} = T - U
$$

$T$ 是系统的动能， $U$ 是系统的内能。

系统的运动方程写成：

$$
\frac{\mathrm{d}}{\mathrm{d} t}(\frac{\partial \mathcal{L}}{\partial \dot{q}}) - \frac{\partial\mathcal{L}}{\partial q} = 0
$$

此为 **欧拉-拉格朗日方程**，拉格朗日使用达朗贝尔原理导出该方程，后来哈密顿对此进行总结得到更为普适的原理——**哈密顿原理**，即现实世界的力学路径会让系统的作用量**取到极小值**。

在拉格朗日力学中的作用量即为拉格朗日量对于时间的积分：

$$
S = \int_{t_1}^{t_2} \mathcal{L} \mathrm{d}t = \int_{t_1}^{t_2}(T-U)\mathrm{d}t
$$

哈密顿提出作用量取到极值：

$$
\delta S = 0
$$

我们可以发现作用量是对于力学**路径**的**泛函**，世界会在不同的路径中选择使作用量取到极小值的路径。

我们可以使用变分法解决这个问题：

$$
\begin{aligned}
\delta S &= \int \delta\mathcal{L}\mathrm{d}t \\
&=\int (\frac{\partial \mathcal{L}}{\partial \dot{q}}\delta \dot{q} + \frac{\partial \mathcal{L}}{\partial q}\delta q + \frac{\partial \mathcal{L}}{\partial t}\delta t)\mathrm{d}t\\
&=\int (\frac{\partial \mathcal{L}}{\partial \dot{q}}\frac{\mathrm{d} \delta q}{\mathrm{d} t} + \frac{\partial \mathcal{L}}{\partial {q}}\delta q)\mathrm{d}t\\
&=\int (\frac{\mathrm{d}}{\mathrm{d}t}(\frac{\partial \mathcal{L}}{\partial \dot{q}}\delta q) - \frac{\mathrm{d}}{\mathrm{d}t}(\frac{\partial \mathcal{L}}{\partial \dot{q}})\delta q + \frac{\partial\mathcal{L}}{\partial q}\delta q)\mathrm{d}t\\
&=\int (\frac{\mathrm{d}}{\mathrm{d} t}\frac{\partial \mathcal{L}}{\partial \mathcal{\dot{q}}} - \frac{\partial \mathcal{L}}{\partial q})\delta q \mathrm{d} t = 0\\
\iff & \frac{\mathrm{d}}{\mathrm{d} t}(\frac{\partial \mathcal{L}}{\partial \dot{q}}) - \frac{\partial \mathcal{L}}{\partial q} = 0
\end{aligned}
$$

由此我们可以得到 **欧拉—拉格朗日方程**

可以预见的是：欧拉-拉格朗日方程是在任何惯性系框架内都成立，因为相对性原理指出：惯性系不会改变我们观测到的物理规律。

设变换后的广义坐标和广义速度记为 $Q, \dot{Q}$，我们可以写出新的拉格朗日量：

$$
L^{\prime}(Q, \dot{Q}, t) = T(Q,\dot{Q},t) - V(Q,\dot{Q}, t)
$$

我们不加证明的给出：

$$
\delta \int L(q, \dot{q}, t)\mathrm{d}t = 0
$$

等价于：

$$
\delta \int L^{\prime}(Q, \dot{Q}, t) = 0
$$

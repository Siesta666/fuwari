---
title: Intro
published: 2026-05-25
description: 电动力学中常用的数学基础：梯度、散度、旋度与曲线坐标系。
tags:
  - 数学
category: 电动力学
lang: zh-CN
draft: false
---

## 电动力学中常用的数学基础

### 梯度、散度、旋度

此处在笛卡尔坐标系中描述上述的微分算子：

**梯度**：描述标量函数在空间中的变化速率，沿着梯度是函数上升最快的，其几何意义是**函数等值线/面的法向量**

$$
\begin{aligned}
\nabla f &= \frac{\partial f}{\partial x}\hat{x} + \frac{\partial f}{\partial y}\hat{y} + \frac{\partial f}{\partial z}\hat{z}\\
&= \frac{\partial f}{\partial x_i}\hat{x_i}
\end{aligned}
$$

**散度**：描述矢量函数在空间中的发散程度，数学定义是：

$$
\begin{aligned}
\nabla \cdot \mathbf{F} &= \frac{\partial \textbf{F}_x}{\partial x} + \frac{\partial \textbf{F}_y }{\partial y} + \frac{\partial \textbf{F}_z}{\partial z}\\
& = \frac{\partial \mathbf{F}_i}{\partial x_i}
\end{aligned}
$$

我们可以使用使用一种朴素的方式求出散度：

$$
\nabla \cdot \mathbf{F} = \lim_{V \rightarrow 0}\frac{\oint_S \mathbf{F}\cdot\mathrm{d}\mathbf{a}}{V}
$$

**旋度**：描述矢量函数在空间中的旋转程度，数学定义是：

$$
\nabla \times \mathbf{F} = 
\begin{bmatrix}
  \hat{x} & \hat{y} & \hat{z} \\\\
  \dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z}\\\\
  \mathbf{F}_x & \mathbf{F}_y & \mathbf{F}_z 
\end{bmatrix}
$$

我们也可以写成这样

$$
\nabla \times \mathbf{F} = \lim_{S \rightarrow 0}\frac{\oint_C \mathbf{F}\cdot \mathrm{d}\mathbf{l}}{S}
$$

### 曲线坐标系

我们在处理具体问题的时候，通常不会遇到方方正正的电场，大部分场都是球对称或柱对称的，于是我们需要引入曲线坐标系来描述空间的场，接下来我将介绍**柱坐标系**和**球坐标系**。

#### 柱坐标系

柱坐标系使用 $(r, \theta, z)$ 来表述场的空间位置，相当于极坐标的三维扩展版，我们可以得到笛卡尔坐标系和柱坐标系的变换。

我们记 $(X,Y,Z)$ 是笛卡尔坐标系中的位置表述，得到：

$$
\begin{aligned}
  r &= \cos{\theta}X + \sin{\theta}Y\\
  \theta &= \arctan{\dfrac{Y}{X}}\\
  Z&=z
\end{aligned}
$$

这种变换不是线性变换，我们不能直接找到一个矩阵来表示这种非线性变换，但是我们可以使用雅可比矩阵来表示小区域的变换 $\dfrac{\partial Q_i}{\partial q_j}$ ，这相当于是一种局部线性化处理。

我们还需要关注柱坐标系中的微分算子：

$$
\begin{aligned}
  \nabla f &= \frac{\partial f}{\partial r}\hat{r} + \frac{\partial f}{r \partial \theta }\hat{\theta} + \frac{\partial f}{\partial z}\hat{z}\\\\
  \nabla \cdot \mathbf{F} &= \frac{\partial r\mathbf{F}_r}{r\partial r} + \frac{\partial \mathbf{F}_{\theta}}{r\partial r} + \frac{\partial \mathbf{F}_z}{\partial  z} \\\\
  \nabla \times \mathbf{F} &=
  \begin{bmatrix}
    \hat{r} & r\hat{\theta} & \hat{z} \\\\
    \dfrac{\partial }{\partial r} & \dfrac{\partial}{\partial \theta} & \dfrac{\partial }{\partial z} \\\\
    \mathbf{F}_r & r \mathbf{F}_\theta & \mathbf{F}_z
  \end{bmatrix}
\end{aligned}
$$

#### 球坐标

在球坐标中，我们常常使用 $(r, \theta, \varphi)$ 来表示一个点的几何位置，在静电学问题中，一旦空间扩展到三维，最常见的就是球对称场问题，比如一个点电荷的电场就是球对称的，处理球坐标和处理柱坐标大同小异，无非是改变常数，我们先给出基本的坐标变换：

$$
\begin{aligned}
  X &= r \cos \varphi \sin \theta\\
  Y &= r \sin \varphi \sin \theta \\
  Z &= r \cos \theta\\
  \mathrm{d}s &= \mathrm{d} \mathbf{r} + r \sin \theta \mathrm{d} \mathbf{\varphi }+ r \mathrm{d} \mathbf{\theta}
\end{aligned}
$$

然后我们可以写出微分算子:
$$
\begin{aligned}
  \nabla f &= \frac{\partial f}{\partial r}\hat{r} + \frac{\partial f}{r \sin \theta \partial \varphi }\hat{\varphi} + \frac{\partial f}{r\partial \theta}\hat{\theta}\\\\
  \nabla \cdot \mathbf{F} &= \frac{\partial r^2\mathbf{F}_r}{r^2\partial r} + \frac{\partial \mathbf{F}_{\varphi}}{r\sin \theta \partial \varphi} + \frac{\partial \sin \theta \mathbf{F}_{\theta}}{ r \sin \theta \partial\theta} \\\\
  \nabla \times \mathbf{F} &=
  \begin{bmatrix}
    \hat{r} & r \sin \varphi\hat{\varphi} & r\hat{\theta} \\\\
    \dfrac{\partial }{\partial r} & \dfrac{\partial}{\partial \theta} & \dfrac{\partial }{\partial z} \\\\
    \mathbf{F}_r & r \sin \varphi\mathbf{F}_\varphi & r\mathbf{F}_{\theta}
  \end{bmatrix}
\end{aligned}
$$

### 矢量恒等式

常见的矢量恒等式，在电动力学中我们常常要使用大量的矢量运算，所以一些常见的矢量恒等式也是我们必须知晓的。

$$
\begin{aligned}
  \nabla \cdot \nabla \times \mathbf{A} &= 0 \\
  \nabla \times \nabla f &= 0\\\\
  \mathbf{A} \times (\mathbf{B} \times \mathbf{C}) &= (\mathbf{A} \cdot \mathbf{C})\mathbf{B} - (\mathbf{A} \cdot \mathbf{B})\mathbf{C}\\
  (\mathbf{A} \times \mathbf{B}) \times \mathbf{C} &= (\mathbf{A} \cdot \mathbf{C})\mathbf{B} - (\mathbf{A} \cdot \mathbf{B})\mathbf{C} \\\\
  \nabla (fg) &= g\nabla f + f\nabla g\\
  \nabla \cdot (\mathbf{A}f) &= \mathbf{A} \cdot \nabla f + f \nabla \cdot \mathbf{A} \\
  \nabla \times (Af) &= f (\nabla \times \mathbf{A}) + (\nabla f) \times \mathbf{A}\\\\

  \nabla (\mathbf{A} \cdot \mathbf{B}) = \mathbf{A} \times (\nabla \times \mathbf{B} ) &+ \mathbf{B} \times (\nabla \times \mathbf{A}) + (A \cdot \nabla )\mathbf{B} + (\mathbf{B} \cdot \nabla )\mathbf{A} \\\\

  \nabla \times (\nabla \times \mathbf{A}) &= \nabla (\nabla \cdot \mathbf{A}) - \nabla^2 \mathbf{A}

\end{aligned}
$$

这些常见的矢量恒等式会极大地简化我们在电动力学、量子力学的计算量。后续可能更新一些矢量恒等式在电动力学中的应用
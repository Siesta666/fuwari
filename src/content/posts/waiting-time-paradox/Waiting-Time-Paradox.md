---
title: 等待时间悖论
published: 2026-09-05
description: 解释统计学的一个问题——等待时间悖论
image: ./4.png
tags:
  - 统计力学
category: 统计力学
draft: false
lang: zh-CN
---
# 引言

最近在学习统计力学，在做相关习题的时候遇到了一个比较有意思的问题，讲的是**等待时间悖论**，这是一个关于数学统计的悖论。

# 问题描述

我们考虑一个十分现实的场景：在路边有一个公交车站，已知的是：公交车站每过5分钟会来一班公交车，公交车严格按照时间表发车；另外，车站还会来小轿车，小轿车在一个小时内会来12辆，这个过程是一个泊松分布（不考虑任何截断、尾部效应）。

对于一个坐在车站内的人来说，车辆的等待时间十分显然，公交车的等待时间概率密度为：
$$
p(\delta^{bus}) = \delta(\delta^{bus} - \tau)
$$
小轿车的等待时间概率密度为：
$$
p(\delta^{car}) = \frac{1}{\tau}\exp\left( -\frac{\delta^{car}}{\tau} \right)
$$
我们可以十分简单地求出平均等待时间：
$$
\begin{align}
\langle \delta^{bus} \rangle  &= \int_{0}^{\tau} p(\delta^{bus})\delta^{bus}\mathrm{d}\delta^{bus} = \tau = 5 \text{ min} \\ \\
\langle \delta^{car} \rangle  &= \int_{0}^{+\infty}p(\delta^{car})\delta^{car}\mathrm{d}\delta^{bus} = 5 \text{ min} 
\end{align}
$$
这十分符合我们的直觉，因为从上帝视角来看就是如此，但是如果我们将视角切换到随机来到车站的行人呢？

---

对于行人来说，公交车的等待时间取决于他来到的时间，这个时间的分布是随机且均匀的。那么可以计算出等待时间概率密度：
$$
p(\Delta^{bus}) = \frac{1}{\tau}
$$
计算出平均等待时间：
$$
\langle \Delta^{bus} \rangle = \int_{0}^{\tau} p(\Delta^{bus}) \Delta^{bus}\mathrm{d}\Delta^{bus} = \frac{1}{2}\tau = 2.5 \text{ min}
$$
对于小轿车，由于泊松过程的无记忆性，所以我们可以知道行人观察到的等待时间分布和坐着的人的分布是一样的。那么平均等待时间是：
$$
\langle \Delta^{car} \rangle  = \tau = 5 \text{ min}
$$
悖论就出现在这里，对于随机来到车站的行人，相邻两班公交车的时间是 $2 * \langle \Delta^{bus} \rangle = 5 \text{ min}$ 但是按照这样的逻辑，计算出来的相邻两辆小轿车的时间为 $10 \text{ min}$ 这就与坐着的人观察的时间相悖了，为什么呢？

# 悖论解释

行人会随机进入一段时间，由于公交车的时间是固定的，所以对于行人来说，进入哪一段时间都是一样的，所以目测出来的间隔时间是和我们已知的是一样的；但是小轿车的时间段是随机的，行人有更大的可能性进入等待时间更长的时间段，所以行人目测出来的间隔时间是有误差的，更多的行人测出了更长的时间，所以行人测出的等待时间会更长，这个结论符合目前的现象。

接下来我们引入一些比较数学的解释：

由于间隔时间的长度会影响进入这个间隔的概率，所以引入修正，进入的概率正比于间隔的长度 $X$：
$$
p^{\prime}(x) = \frac{Xp(x)}{\langle X \rangle }
$$
对于一个 $X^{\prime} = x$ 的时间间隔，由于进入的时刻是随机的，所以等待时间 $W$ 就是取一半：
$$
\langle W \rangle  = \frac{1}{2}\langle X^{\prime} \rangle 
$$
代入修正过后的概率密度函数：
$$
\langle X^{\prime} \rangle  = \int p^{\prime}(x)X \mathrm{d}X = \langle X^{2} \rangle /\langle X \rangle 
$$
代入二阶矩的公式：
$$
\langle X^{2} \rangle = \langle X^{2} \rangle _{c} + \langle X \rangle ^{2}
$$
于是我们可以得到：
$$
\langle X^{\prime} \rangle = \langle X \rangle  + \frac{\langle X^{2} \rangle _{c}}{\langle X \rangle } > \langle X \rangle 
$$
那么我们就可以计算出：
$$
\langle W \rangle > \frac{1}{2}\langle X \rangle 
$$
这就是为什么行人目测出来的等待时间要比实际的等待时间更加长的原因。


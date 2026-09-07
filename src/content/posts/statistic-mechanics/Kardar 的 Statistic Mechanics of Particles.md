---
title: Kardar 的 Statistic Mechanics of Particles
published: 2026-08-18
description: Kardar的统计力学 读书笔记
tags:
  - 统计力学
  - Notes
category: 统计力学
draft: false
lang: zh-CN
image: ./3.jpg
---
   # Thermodynamics 热动力学

**——Thermodynamics is a phenomenological description of properties of macroscopic systems in thermal equilibrium.**

## 热力学三定律

### 热力学第零定律

如果存在两个系统 A 与 B ，它们分别于第三个系统 C 保持平衡，那么这两个系统互相之间也保持平衡

第零定律指出了经验温标 **（Empirical Temperature）**  的存在，我们人为认定两个处于平衡的系统具有相同的温度，所以我们可以指定一套规则比如摄氏温标、华氏温标来衡量温度高低。

另外我们还有绝对温标 **（Absolute Temperature）** 也叫开尔文温标，开尔文温标与极限情况下的理想气体温标一样：

$$
T(K) = 273.16 \times \big( \lim_{P \rightarrow 0}(PV)_{system} / lim_{P\rightarrow0}(PV)_w\big).
$$
### 热力学第一定律

**热力学第一定律**对应的是能量守恒定律，如果使用数学微分形式表示就是：
$$
\text{d}E = \text{đ} Q + \text{đ} W
$$
注意：在此处并没有指明微元功是体积功，事实上在不同的系统，功的形式有很大差别：
- 线   广义力为张力  广义位移是长度
- 面  广义力是表面张力  广义位移是面积
- 流体  广义力是压强  广义位移是体积
- 磁铁  广义力是磁场强度  广义位移是磁化强度
- 电介质  广义力是电场强度  广义位移是极化强度
- 化学反应  广义力是化学势  广义位移是反应粒子个数
不同的系统有不同的功的表现形式，在经典热力学中常见的功的表现形式是**体积功**：
$$
\text{đ}W = -P \mathrm{d} V
$$
一般说来：**位移** 常常是 **广延量**，**力** 常常是 **强度量** 。

#### 响应函数

**响应函数**是常见的量化系统的微观表现的方法，它们常常是使用实验的方式测量出来的，比如热容，我们定义热容为系统升高1K所吸收的焦耳热，于是我们可以定义出等容热容和等压热容：
$$
\begin{align}
C_{V} &= \frac{\text{đ} Q}{\mathrm{d} T}_{V} = \frac{ \partial E }{ \partial T }_{V} \\
C_{P} &= \frac{\text{đ} Q}{\mathrm{d} T}_{P} = \frac{ \partial E }{ \partial T }_{P} + P \frac{ \partial V }{ \partial T }_{P}  
\end{align}
$$
这些响应函数表示了热力学系统对于外界变化的响应敏感度，由于理想气体的内能只与温度有关，所以我们得到：
$$
\frac{ \partial E }{ \partial T }_{V} = \frac{ \partial E }{ \partial T }_{P}  
$$
于是我们得到：
$$
C_{P} - C_{V} = P\frac{ \partial V }{ \partial T }_{P} = PV\alpha_{P} = \nu R = Nk_{B}
$$
这里面引入了一个新的响应函数 $\alpha_{P}$ 这是**等压压缩系数**：
$$
\alpha_{P} = \frac{\dfrac{ \partial V }{ \partial T }_{P}}{V} 
$$
### 热力学第二定律

**热力学第二定律**揭示了自然界中的热现象都是具有方向性的，比如热量都是从高温物体向低温物体转移……对于热力学第二定律有许多阐述：
- **开尔文阐述**： 不存在可以将热完全转化成功而不产生其他影响的过程 ***（No process is possible whose sole result is the complete conversion of heat into work）***
- **克劳修斯阐述**：热量不可以自发地从高温物体向低温物体转移 ***（No process is possible whose sole result is the transfer of heat from a colder to a hotter body）***
开尔文表述决定了热机的效率，克劳修斯表述决定了制冷机的效率，我们可以通过构造热机或者制冷机来证明这两种表述是完全等价的。

#### 卡诺热机

**卡诺热机（Carrot engine）**是一种可逆热机，其循环只在两个温度下进行，我们通过绝热过程来连接两个热库，用等温过程来进行热量交换，最终卡诺热机会完成一次可逆循环，回到初始状态。

对于工作物质是理想气体的卡诺热机，通过简单计算，我们可以计算出卡诺热机的效率是：
$$
\eta = \frac{W}{Q_{1}} = \frac{T_{1} - T_{2}}{T_{1}}
$$

#### 卡诺定理

**卡诺定理（Carrot theorem）** 是卡诺推导证明的关于热机效率的定理，其内容是：
- 在两个热库之间工作效率最高的热机是卡诺热机

如果多个卡诺热机相互串联，每一个卡诺热机的高温热库都是上一个卡诺热机的低温热库，则总效率还是只和首尾高温低温热源相关，此处使用熵变可以证明

不论工作物质是什么，卡诺热机的效率永远是：
$$
\eta = \frac{T_{1} - T_{2}}{T_{1}}
$$
这也说明了热力学温度必须要是正数，否则效率会大于1，也违反了热力学第二定律。

### 熵

之前我们已经得到了许多共轭变量比如：压强和体积、电场强度和极化强度……那么温度的共轭变量是什么呢？我们有**克劳修斯定理**：
	对于任何一个循环，必有 $\oint \text{đ} Q / T \leq 0$ ，当循环是可逆循环时取到等号
于是我们就可以得到一个状态函数，其定义是：
$$
\mathrm{d}S = \frac{\text{đ}Q_{rev}}{T}
$$
系统的熵变等于连接两个状态的**可逆过程**的热量传递除以温度

对于一个可逆过程，我们可以写出热力学第一定律：
$$
\mathrm{d}E = \text{đ}Q + \text{đ}W = T\mathrm{d}S + \sum J_{i}\mathrm{d}x_{i}
$$ 
我们可以发现此处的温度扮演广义力，是强度量；熵变扮演广义位移，是广延量，我们成功将力学和热学进行统一。
**Noting：** 虽然此处指的是可逆循环，但是这是状态函数的关系，对于状态函数我们不需要关注过程，只需要关注首尾状态。

并且根据上面的式子我们可以得到：如果这个系统有$n$个方式可以做功，那么就需要使用$n+1$个独立变量来表示这个系统，比如我们知道内能和n个广义坐标 $\{E, x_{i}\}$，那么我们可以表示出所有的热力学函数，表示熵：
$$
\mathrm{d}S = \frac{\mathrm{d}E}{T} - \sum \frac{J_{i}}{T}\mathrm{d}x_{i}
$$
只需要取路径积分，就可以得到系统的熵，后续可以使用偏导数求出剩下的状态函数。

由克劳修斯定理，我们还可以得到一个有用的结论：
$$
\text{đ}Q \leq T\mathrm{d}S\qquad \textit{when reversible takes the equal sign}
$$
这个结论在推导一些热力学关系的时候十分有用。于是我们还可以得到一个结论：孤立系统（$\text{đ}Q = 0$）熵不减，比如一个绝热容器中气体自由膨胀，其热量传递为 $\text{đ} Q = 0$，但是其熵增为$\mathrm{d}S = \nu R \ln 2$ ，于是我们可得 $\text{đ}Q \leq 0$。

## 热平衡

对于一个热力学系统，我们常见的判定等容孤立系统达到了热平衡的判据是熵达到了最大值$\delta S = 0$，但是如果对于一个非绝热、受到外力作用的系统，我们需要引入新的热力学势函数来表示平衡态。

### 焓

**焓（Enthalpy）** 用于系统绝热、且受到外力作用的情况，比如我们考虑一个弹簧连接着一个重物，我们得到弹簧的内能是 $U = \dfrac{1}{2}kx^2$ ，重物的势能是 $U_{P} = mgx$ ，我们计算得到焓 $$H = U - U_{P} = \dfrac{1}{2}kx^2 - mgx$$ 当系统达到平衡时，我们需要让焓达到极小值 $\delta H = 0$ ，此时也就是 $x = \dfrac{mg}{k}$，这与我们的期望相符合。

当我们使用热力学参数重写这个过程，我们记广义力为$J_{i}$，广义坐标为$x_{i}$，由卡诺定理我们可以得到
$$
\text{đ}W \leq \sum J_{i} \mathrm{d} x_{i}
$$
由于系统绝热，所以
$$
\text{đ} Q = 0
$$
根据热力学第一定律得到：
$$
\mathrm{d}E = \text{đ}Q + \text{đ}W \leq \sum J_{i}\mathrm{d}x_{i}
$$
我们设焓为
$$
H = E - \sum J_{i}x_{i}
$$
于是我们就可以得到在绝热，外力恒定系统中：
$$
\delta H \leq 0
$$
也就是说，当系统达到平衡，需要有：
$$
\delta H = 0
$$
对应到理想气体模型中就是绝热等压系统，此时 $H = U + PV$ ，当系统达到平衡需要让焓到达极小值。

为了描述系统的焓，一般我们会选择 $(S, J_{i})$ 作为变量集，我们可以表示出焓：
$$
\mathrm{d} H = T \mathrm{d} S - \sum x_{i} \mathrm{d}J_{i} = T\mathrm{d}S - \mathbf{x}\cdot \mathrm{d}\mathbf{J}
$$
### 亥姆霍兹自由能

适用于等温、无机械功系统，定义 **亥姆霍兹自由能（Helmholtz free energy）** 为
$$
F = E - TS
$$
由于无机械功、等温，所以有
$$
\mathrm{d}T = 0 \qquad \text{đ} W = 0
$$
根据热力学第一定律：
$$
\mathrm{d}E = \text{đ}Q + \text{đ}W \le T\mathrm{d}S
$$
于是我们有：
$$
\mathrm{d}F = \mathrm{d}E - T\mathrm{d}S \leq 0 
$$
当系统处于热平衡，得到：
$$
\delta F = 0
$$
亥姆霍兹自由能应当取到最小值。

一般我们选定 $(T, x_{i})$ 作为变量集，可以表示出亥姆霍兹自由能：
$$
\mathrm{d}F = -S \mathrm{d}T + \mathbf{J}\cdot \mathrm{d}\mathbf{x}
$$

### 吉布斯自由能

适用于等温、有恒定外力作用的系统（等温、等压），**吉布斯自由能（Gibbs free energy）** 的定义为：
$$
G = H - TS
$$
推导方法略去和上文基本一样，我们常常使用 $(T, J_{i})$ 作为变量集，表示出吉布斯自由能：
$$
\mathrm{d}G = -S\mathrm{d}T - \mathbf{x}\cdot \mathrm{d}J
$$
对于等温、等压的系统，判定系统达到平衡，需要让吉布斯自由能取到极小值。

### Summary

这些热力学势其实都是熵的变体，我们使用了**勒让德变换（Legendre Transformation）** 变换了变量集，这里稍作总结：
- 绝热、等容、使用熵$S$、变量集选择$(S, x_{i})$
- 绝热、等压、使用焓$H$、变量集选择$(S, J_{i})$
- 等温、等容、使用亥姆霍兹自由能$F$、变量集选择$(T,x_{i})$
- 等温、等压、使用吉布斯自由能$G$、变量集选择$(T,J_{i})$

### 巨势

**巨势（Grand Potential）** 是巨正则系综的核心热力学势函数，可以理解成开放系统（粒子数可变）下的自由能。

我们设定系统的内能为 $E$，温度为 $T$，熵为 $S$，各组分粒子化学势为：$\mu = \{ \mu_{1}, \mu_{2}, \dots \}$
, 各组分粒子数为：$\mathbf{N} = \{ N_{1}, N_{2}, \dots\}$

巨势的定义是：
$$
\mathcal{G} = E - TS - \mathbf{\mu} \cdot \mathbf{N}
$$
在化学平衡中，巨势取到极小值
$$
\mathrm{d}\mathcal{G} = -S \mathrm{d}T + \mathbf{J}\cdot \mathrm{d}\mathbf{x} - \mathbf{N}\cdot \mathrm{d}\mu
$$
此处的$E$为系统的总能量，所以有：
$$
\mathrm{d}E = \text{đ}Q + \text{đ}W + \mu \cdot \mathrm{d}\mathbf{N} = T \mathrm{d}S + \mathbf{J} \cdot \mathrm{d}\mathbf{x} + \mu \cdot \mathrm{d} \mathbf{N}
$$
于是我们说：在巨正则系统中，系统达到平衡需要让巨势达到极小值。

与之相比：一般的等温、等容的封闭系统，我们使用亥姆霍兹自由能作为热力学势函数，在这个系统里面，粒子总数不会改变。

### Gibbs-Duhem 关系

**吉布斯-杜亥姆关系**指明了系统中的强度量存在约束关系，这个约束关系需要使用广延量进行推导：

首先我们需要知道系统中的广延量有内能$E$，广义位移$x_{i}$，分子数$N$，而由热力学第一定律得到：
$$
\mathrm{d}E = T\mathrm{d}S + \sum J_{i} \mathrm{d}x_{i} + \mu \mathrm{d}N
$$
由于上述量均为广延量，于是我们可以得到：
$$
E(\lambda S, \lambda x_{i}, \lambda N) = \lambda E(S, x_{i}, N)
$$
两边对$\lambda$求导，代入$\lambda = 1$得到
$$
\frac{ \partial E }{ \partial S }S + \frac{ \partial E }{ \partial x_{i} } x_{i}+ \frac{ \partial E }{ \partial N } N = E 
$$
代入我们由热力学第一定律得到的式子：
$$
E = TS + \mu N + Jx
$$
对这个式子求微分：
$$
\mathrm{d}E = T\mathrm{d}S + \mu \mathrm{d}N + J\mathrm{d}x + S\mathrm{d}T + N\mathrm{d}\mu + x \mathrm{d}J
$$
于是我们就得到了 **Gibbs-Duhem 关系**
$$
S\mathrm{d}T + N\mathrm{d}\mu + x\mathrm{d}J = 0
$$
这个关系指明了系统中的强度量并不是完全独立的，比如我们确定了广义力和温度，那么我们便可以表示出化学势$\mu(T, J)$

**Example**: 对于等温理想气体，我们已知它的压强，怎么计算出化学势：

由吉布斯-杜亥姆关系，可以得到：
$$
N\mathrm{d} \mu = V\mathrm{d}P 
$$
代入$PV = \nu R T$
$$
\mathrm{d}\mu = k_{B}T \frac{\mathrm{d}P}{P}
$$
积分得到：
$$
\mu = \mu_{0} + k_{B}T\ln \frac{P}{P_{0}}
$$
所以我们使用温度和压强表示出了系统的化学势，这说明强度量之间存在约束关系。

### 麦克斯韦关系

麦克斯韦关系需要从热力学函数的连续性导出，由于现实物理世界中的热力学函数都是平滑的，所以其**二阶导数和求导次序无关**，由此可以导出一系列关系。

先列出常见的微分关系：

$$
\begin{aligned}
\mathrm{d}E &= T\mathrm{d}S + J \mathrm{d}x + \mu \mathrm{d}N \\ \\
\mathrm{d}H &= T\mathrm{d}S - x \mathrm{d}J + \mu \mathrm{d}N \\ \\
\mathrm{d}F &= -S\mathrm{d}T + J\mathrm{d}x + \mu \mathrm{d}N\\ \\
\mathrm{d}G &= -S\mathrm{d}T - x\mathrm{d}J + \mu \mathrm{d}N 
\end{aligned}
$$
我们就以内能 $E$ 举例子：
$$
\frac{ \partial E }{ \partial S }_{x, N} = T \quad \frac{ \partial E }{ \partial x } _{S, N} = J 
$$
于是我们得到二阶导数：
$$
\frac{ \partial T }{ \partial x } _{S, N} = \frac{ \partial J }{ \partial S } _{x,N}
$$
我们代入理想气体可以得到：
$$
\frac{ \partial T }{ \partial V } _{S} = - \frac{ \partial P }{ \partial S } _{V}
$$
对于剩下的变量也是相似的处理方式。

### 吉布斯相律

对于多组分、多做功形式的气体，多相气体，利用吉布斯相律我们可以知道至少需要多少个变量才可以描述这个系统。

设有 $n$ 种做功形式、有 $c$ 种化学组分、有 $p$ 个相，我们得到自由度是：
$$
f = n + c + 1 -p
$$
那么对于水的三相点：
$$
f = 1 + 1 + 1 - 3 = 0
$$
可以看到水的三相点的自由度为0，所以使得三相点十分鲁棒，如果在水中溶解了少量的盐，那么三相点就会沿着相对应的线运动（导致盐水熔点降低）

### 平衡的稳定性
	对应于汪志诚的 3.1 节

对于一个热力学系统，我们有这样一种判断**稳定平衡**的方法：
$$
\delta T \delta S + \delta J_{i}\delta x_{i}+\delta \mu_{\alpha} \delta N_{\alpha} > 0
$$
我们可以使用假设一个孤立系统和设置子系统来证明上述方法，此处略去，总之我们得到熵变为：
$$
\delta S = - \frac{2}{T}[\delta T\delta S + \delta J \delta x + \delta \mu \delta N]
$$
在孤立系统钟，要实现稳定平衡，必须使得任何改变都会导致熵减少，所以我们需要有：
$$
\delta T \delta S + \delta J_{i}\delta x_{i}+\delta \mu_{\alpha} \delta N_{\alpha} > 0
$$
由于在此处所有的变量都是对称的，所以规定哪几个变量不变都会得到相同的结果，所以就有了最初的论断，后续我们不妨设 $\delta N = 0$

我们有：

$$
\begin{align}
\delta S &= \frac{ \partial S}{ \partial T } _{x} \delta T + \frac{ \partial S }{ \partial x_{i} } _{T}\delta x_{i}\\ \\
\delta J_{i} &= \frac{ \partial J_{i} }{ \partial T } _{x} \delta T + \frac{ \partial J_{i} }{ \partial x_{i} } \delta x_{i}
\end{align}
$$
代入我们可以得到：
$$
\frac{ \partial S }{ \partial T }_{x}(\delta T)^2 + \frac{ \partial J_{i} }{ \partial x_{j} } _{T}\delta x_{i} \delta x_{j} > 0
$$
中间项可以通过麦克斯韦关系消除

这个式子包含了三个平衡条件
- 热平衡条件
- 力学平衡条件
- 化学平衡条件

热平衡条件：当只有 $\delta T$ 不为 0 时，为了保持平衡，需要有：
$$
\frac{ \partial S }{ \partial T }_{x} > 0 
$$
等价于
$$
C_{x} = \frac{ \partial Q }{ \partial T } _{x} = \frac{ \partial S }{ \partial T } _{x} > 0
$$
等价于**系统的热容需要为正数，温度升高需要热量输入**。

---

力学平衡和化学平衡可以看作是相似的，我们都可以把其看作是广义位移和广义力的共轭作用。拿气体系统举例子，考虑只有 $\delta x_{i}$ 不为 0 的情况，需要有：
$$
\frac{ \partial J_{i} }{ \partial x_{j} }\delta x_{i}\delta x_{j} > 0 
$$
根据线性代数，可以知道这是一个二次型矩阵，要让多项式恒大于0，那么矩阵需要为正定的：
$$
\begin{bmatrix}
-\dfrac{ \partial p }{ \partial V }  & -\dfrac{ \partial p }{ \partial N } \\ \\
\dfrac{ \partial \mu }{ \partial V } & \dfrac{ \partial \mu }{ \partial N } 
\end{bmatrix}
$$
为一个正定矩阵，考虑最简单的情况，也就是只有 $(p, V)$ 一组共轭量，那么需要有 $\dfrac{\partial p}{\partial V} < 0$ ，也就是如果系统因为某一种原因体积变小，那么压强应该变大来保持系统平衡。
#### 关于临界点 Critical Point

对于非理想气体，比如范德瓦尔斯气体，其相图会存在**临界点（Critical Point）** ，此处我们讲的就是气液相变临界点，当气体在等温线上变化，总会存在一个点使得：
$$
\frac{ \partial P }{ \partial V } _{T_{c},N} = 0
$$
此时我们考虑力学稳定性，也就是 $\delta P \delta V > 0$，假设压强可以进行泰勒展开，于是得到：
$$
\delta P(T = T_{c}) = \frac{ \partial P }{ \partial V } _{T_{c}, N}\delta V + \frac{1}{2}\frac{ \partial ^2P }{ \partial V^2 } _{T_{c}, N}\delta V^2 + \frac{1}{6}\frac{ \partial ^3P }{ \partial V^3 }_{T_{c},N}\delta V^3+\dots 
$$
为了保持力学稳定性，必须使得二阶导数为0，那么我们就得到了临界点的定义。
$$
\frac{ \partial P }{ \partial V } _{T_{c}} = 0 \quad \frac{ \partial^2 P }{ \partial V^2 }_{T_{c}} = 0 
$$
在临界温度以下，等温线会出现一个 "S" 形，  大于临界温度时，气液界限消失。

## 热力学第三定律

能斯特指出:

**所有系统在绝对零度的熵均为0 （The entropy of all systems at zero absolute temperature is a universal constant that can be taken to be zero）**

我们有几种方法可以论证热力学第三定律，比如构造亚平衡态等等

此处列出热力学第三定律带来的结果：
- 在趋向绝对零度时，熵对于任何参数的导数为0  $\lim_{ T \to 0 }\dfrac{ \partial S }{ \partial X }_{T} = 0$
- 趋向绝对零度时，热容为0   $\lim_{ T \to 0 }C_{x} = 0$
- 在趋向绝对零度时，热膨胀系数为0   $\alpha_{J} = \dfrac{1}{x}\dfrac{ \partial x }{ \partial T }_{J} - \dfrac{1}{x}\dfrac{ \partial S }{ \partial J }_{T} = 0$

## 总结

至此我们完成了第一章的理论学习，第一章 Thermodynamics 热动力学，主要是从宏观角度来分析常见的热力学系统，并且介绍描述系统的参数和方法。

学习路线是：从热力学三定律引入到熵，再到热平衡中引入热力学势函数，然后计算系统平衡的稳定性，最后学习热力学第三定律为了与后续微观角度的统计力学衔接。

——Siesta 2026-08-20

# Probability 概率论

## 基本概念

热力学基本定律是建立在对于微观粒子的观察和统计概括，另一方面，物质是由原子和分子组成的，它们的运动规律受到更加基本的定律支配，所以我们有方法可以对粒子运动进行分析。我们不需要知道系统中每一个粒子的具体情况，这基本是不可能的，我们只需要知道粒子处于某一个微观状态的 **可能性（likelihood）** 即可，因此统计力学本质上是对系统的一种**概率性描述**。

概率论要研究的对象是随机变量，它有一系列可能值，可能是:
- 离散值：比如硬币的正反两面、骰子的六个面等
- 连续值：比如一个区间 $[1,2]$ 。
每一个事件都是结果的子集，我们要计算事件发生的概率，将事件记为 $E$， 将概率记为 $p(E)$.

事件的概率必须要满足以下条件：
- 概率必须为正数，$p(E) \geq 0$。
- 归一性：$\sum p(E_{i} = 1)$，所有事件的总概率必须为1
- 可加性：如果两个事件是不相关事件，那么 $p(A \text{ or } B) = p(A) + p(B)$

为了得到某一个事件的概率，有两种方法：
- 客观概率来自对某一事件大量重复得到概率：$p(A) = \lim\limits_{ N \to \infty } \dfrac{N_{A}}{N}$
- 主观概率提供一个基于理论的概率值，比如一个骰子投到1的概率就是 $\dfrac{1}{6}$
给定一个随机变量 $x$ ，其可能取值为 $\mathcal{S} = {-\infty < x < + \infty}$
- **累计概率函数（cumulative probability function）** 是随机变量取到某一个区间的概率值，可以使用积分计算得到
- **概率密度函数（probability density function）** 是描述随机变量取到单位长度区间的概率
- **期望值（the expectation value）** 是描述随机变量进行大量取值之后的平均值，使用 $\langle F(x) \rangle$ 表示
如果给定一个新的随机变量，其取值与随机变量 $x$ 相关，比如 $y = x^2$ ，那么我们可以写出其概率密度函数：
$$
p(y)_{y =x_{0}^2} \mathrm{d}y= prob(y = x_{0} ^2) = prob(x = x_{0} \text{ or } -x_{0}) = \sum p(x)\mathrm{d}x
$$
我们可以得到一个新的等式：
$$
p(y) = \sum p(x) \left| \frac{\mathrm{d}x}{\mathrm{d}y} \right|
$$
**概率密度函数的矩**是随机变量的幂的期望值：
$$
m_{n} \equiv \langle x^n \rangle = \int \mathrm{d}xp(x)x^n
$$
**特征函数**是矩的生成函数，它是概率密度函数的傅里叶变换，定义为：
$$
\tilde{p}(k) = \langle e^{-ikx} \rangle = \int \mathrm{d}x p(x) e^{-ikx}
$$
概率密度函数可以通过傅里叶变换得到：
$$
p(x) = \frac{1}{2 \pi}\int \mathrm{d}k \tilde{p}(k) e^{+ikx}
$$
我们可以将 $e^{-ikx}$ 进行泰勒展开：
$$
e^{-ikx} = \sum_{n=0}^{\infty}  \frac{1}{n!}(-ikx)^n
$$
于是我们得到了 $\tilde{p}(k)$
$$
\tilde{p}(k) = \sum \int \frac{(-ik)^n}{n!}x^n p(x) \mathrm{d}x = \sum_{n=0}^{\infty}  \frac{(-ik)^n}{n!}\langle x^n \rangle 
$$
所以我们对**特征函数求导**就可以得到矩：
$$
(-i)^n\langle x^n \rangle = ^{(n)}\tilde{p}(k)|_{k = 0}
$$
特征函数还可以进行平移，和傅里叶变换有着相同的性质：
$$
e^{ikx_0}\tilde{p}(k) = \sum \frac{(-ik)^n}{n!}\langle (x-x_{0})^n \rangle
$$
**累计生成函数（cumulant generating function）** 是对特征函数**求对数**：
$$
\ln \tilde{p}(k) = \sum_{n=1}^{\infty} \frac{(-ik)^n}{n!}\langle x^n \rangle _{c}
$$
我们对左式进行泰勒展开：
$$
\ln \tilde{p}(k) = \sum_{n=0}^{\infty} \frac{1}{n!}(\tilde{p}(k)- 1)^n
$$
对于次数较低的**累计量（cumulants）**，我们可以直接计算出来：
$$
\begin{align*}
\langle x \rangle _c &= \langle x \rangle \\ \\
\langle x^2 \rangle _{c} &= \langle x^2 \rangle  - \langle x \rangle ^2 \\ \\
\langle x^3 \rangle _{c} &= \langle x^3 \rangle  - 3 \langle x^2 \rangle \langle x \rangle  + 2 \langle x \rangle ^3
\end{align*}
$$
我们可以发现**一阶累计量就是数学期望、二阶就是方差**

根据累计生成函数的定义：
$$
\sum_{m=0}^{\infty} \frac{(-ik)^m}{m!}\langle x^m \rangle  = \exp\left[ \sum_{i=1}^{N} \frac{(-ik)^n}{n!}\langle x^n \rangle _{c} \right] = \prod \limits_{n}\sum_{p_{n}}\left[ \frac{(-ik)^np_{n}}{p_{n}!}\left( \frac{\langle x^n \rangle _{c}}{n!} \right)^{p_{n}} \right]
$$
得到：
$$
\langle x^m \rangle = \sum_{p_{n}}m!\prod_{n}  \frac{1}{p_{n}!(n!)^p_{n}}\langle x^n \rangle ^{p_{n}}
$$
其中的 $p_{n}$ 和 $n$ 需要满足 $\sum n p_{n} = m$

## 一些重要的概率分布函数

### 高斯分布（正态分布）

高斯分布函数描述了一个连续的实数随机变量：
$$
p(x) = \frac{1}{\sqrt{ 2\pi \sigma ^2 }}\exp\left[ - \frac{(x - \lambda)^2}{2 \sigma^2} \right]
$$
使用傅里叶变换我们可以得到特征函数：
$$
\tilde{p}(k) = \int p(x) e^{-ikx} \mathrm{d}x = \exp\left[ -ik\lambda - \frac{k^2\sigma^2}{2} \right]
$$
对 $k$ 求导：
$$
\langle x \rangle_{c}  = \lambda = i \frac{\mathrm{d}\tilde{p}}{\mathrm{d}k}\big|_{{k =0}}
$$
求二阶导数：
$$
\langle x^2 \rangle_{c} = \sigma^2 
$$
后续所有的累计概率函数均为 $0$，正态分布完全由其前两个累积量确定，我们可以简单地计算出矩：
$$
\begin{align*}
\langle x \rangle  &= \lambda \\
\langle x^2 \rangle  &= \sigma^2 + \lambda^2 \\
\langle x^3 \rangle  &= 3\sigma^2 \lambda + \lambda^3 \\
\dots
\end{align*}
$$
### 二项分布

二项分布描述了只有两种取值的随机变量，设事件为 $A,B$ ，概率分别是 $p_{A}, p_{B} = 1- p_{A}$ ，在 $N$ 次试验中，取到 $N_{A}$ 次 $A$ 事件的概率为：
$$
p_{N}(N_{A}) = \binom{N}{N_{A}}p_{A}^{N_A} p_{B}^{N-N_{A}}
$$
二项式系数：
$$
\binom{N}{N_{A}} = \frac{N!}{N_{A}!(N-N_{A})!}
$$
其特征函数是：
$$
\tilde{p_{N}}(k) = \langle e^{{-ikN_{A}}} \rangle  = \sum_{N_{A}=0}^{N} p_{N}(N_{A})e^{{-ikN_{A}}} = (p_{A}e^{{-ik}} + p_{B})^{N}
$$
两边同时取对数：
$$
\ln \tilde{p}_{N}(k) = N \ln \tilde{p}_{1}(k)
$$
可以看出来累计概率函数的对数就是单次对数的相加，这是因为各次试验之间是独立的。

那我们就可以很简单的求出 $N$ 次试验之后的期望和方差，设事件 $A$ 为取到 $1$，事件 $B$ 为取到 $0$：
$$
\langle x \rangle_{c}  = Np_{A}, \quad \langle x^{2} \rangle _{c} = N(p_{A} - p_{A}^{2}) 
$$
二项分布也可以推广到多项分布。

### 泊松分布

- 在事件间隔 $t \to t+ \mathrm{d}t$ 发生一次事件的概率和 $\mathrm{d}t$ 成正比，当 $\mathrm{d}t \to 0$,
- 不同事件间隔内事件的发生概率彼此独立

现在考虑在总时间为 $T$ 的二项分布中，我们将总时间分成 $n$ 个 $\mathrm{d}t$ ，利用二项分布可以计算出特征函数，而当 $\mathrm{d}t \to 0$ 则得到了泊松分布，我们设在 $\mathrm{d}t$ 的时间间隔中发生一次事件的概率为 $\alpha \mathrm{d}t$， 由于概率很低，所以就不考虑一个时间间隔中发生多次事件。所以我们会说泊松分布是二项分布的极限形式。

计算出特征函数：
$$
\tilde{p}(k) = (p e^{-ik} + (1- p) ) ^{ n}= [1 + \alpha \mathrm{d}t(e^{-ik}-1 )]^{T/\mathrm{d}t} = \exp[\alpha(e^{-ik}-1)T]
$$
反过来可以使用傅里叶逆变换计算出概率密度函数：
$$
p(k) = \frac{1}{2\pi}\int \mathrm{d}k \exp[\alpha(e^{-ik}-1)T + ikx] = \frac{e^{{-\alpha T}}}{2\pi}\int \mathrm{d}ke^{ikx}\sum_{n=0}^{\infty} \frac{1}{n!}[\alpha T e^{-ik}]^{n}
$$
根据公式：
$$
\frac{1}{2\pi}\int \mathrm{d}ke^{{ikx}} = \delta(x)
$$
代入可以求出：
$$
p(x) = e^{-\alpha T}\sum_{n=0}^{\infty} \frac{1}{n!}(\alpha T)^{n}\delta(x-n)
$$
（此处的概率密度是一个广义函数，通常见到的是 $P(n) = e^{-\alpha T} \frac{1}{n!} (\alpha T)^{n}$）这个概率密度函数指出了x只可能取到整数，也就是说我们使用狄拉克函数表示出了一个离散分布。

我们可以计算出泊松分布的累计生成函数：
$$
\ln \tilde{p}(k) = \alpha T (e^{-ik} -1 ) = \alpha T \sum_{n=1}^{\infty} \frac{1}{n!}(-ik)^{n}
$$
前文我们有一个关于累计量生成函数的公式：
$$
\ln \tilde{p}(k) = \sum_{n=1}^{\infty} \frac{(-ik)^{n}}{n!}\langle x^{n} \rangle _{c}
$$
所以我们可以计算出泊松分布的累积量是一个常数
$$
\langle x^{n} \rangle _{c} = \alpha T 
$$
从本质上来看，泊松分布是二项分布的极限情况，当二项分布的 $N \to \infty, p \to 0$ 同时 $Np = const = T \alpha$ 那么二项分布就会演化成泊松分布。此时二项分布的各累积量也都等于 $Np = \alpha T$

## 多重变量分布

当涉及到超过一个变量的时候，比如同时描述粒子的速度与位置，需要使用到 $N$ 维空间的概率分布函数。

**联合概率密度函数**是随机变量 $x$ 在点 $\mathbf{x} = \{x_{1}, x_{2},\dots, x_{N}\}$附近的概率密度，归一化表示为：
$$
\int_{\mathcal{S}} \mathrm{d}^{N}\mathbf{x}p(\mathbf{x}) =1 
$$
如果各个维度的变量是独立的，那么我们就可以得到：
$$
p(\mathbf{x}) = \prod_{i=1}^{N} p(x_{i})
$$
**无条件概率密度函数**描述了随机变量的自己的性质，比如我们有粒子的速度与位置的概率密度函数，然后经过数学运算得到粒子的位置概率密度分布，而不关心速度。
$$
p(\mathbf{x}) = \int_{\mathcal{S_{\mathbf{v}}}} p(\mathbf{x}, \mathbf{v})\mathrm{d}^{N}\mathbf{v}
$$
**条件概率密度函数**描述了随机变量在特定条件下的性质，比如我需要计算特定位置的速度分布函数，那么我就可以得到这个位置的速度-位置分布函数，然后进行归一化。
$$
p(\mathbf{v}|\mathbf{x}) = \frac{p(\mathbf{x},\mathbf{v})}{\mathcal{N}}, \quad \mathcal{N} = p(\mathbf{x}) = \int_{all} \mathrm{d}^{3}\mathbf{v}p(\mathbf{x},\mathbf{v})
$$
这样子计算出来的概率密度符合归一化条件.

**贝叶斯公式（Bayes' Theorem）** ：

$$
p(\mathbf{v}|\mathbf{x}) = \frac{p(\mathbf{v})p(\mathbf{x}|\mathbf{v})}{p(\mathbf{x})}
$$

如果各个维度之间是相互独立的，那么我们可以得到：
$$
p(\mathbf{x},\mathbf{v}) = p(\mathbf{v}|\mathbf{x})p(\mathbf{x}) = \prod p(\mathbf{x_{a}}) p(\mathbf{v_{b}})
$$
那么就得到了
$$
p(\mathbf{v}|\mathbf{x}) = p(\mathbf{v}) = \prod_{i=1}^{N} p(v_{i})
$$
此时，条件概率和非条件概率是相等的.

函数的**期望值**为：
$$
\langle F(x) \rangle = \int \mathrm{d}^{N}\mathbf{x}p(\mathbf{x})F(\mathbf{x}) 
$$
**联合特征函数**为：
$$
\tilde{p}(\mathbf{k}) = \langle e^{-i\mathbf{k}\cdot \mathbf{x}} \rangle 
$$
**联合矩与联合累积量为：**
$$
\langle x_1^{n_1} x_2^{n_2} \cdots x_N^{n_N} \rangle = 
\left[ \frac{\partial}{\partial (-ik_1)} \right]^{n_1} 
\left[ \frac{\partial}{\partial (-ik_2)} \right]^{n_2} 
\cdots 
\left[ \frac{\partial}{\partial (-ik_N)} \right]^{n_N} 
\tilde{p}(\mathbf{k} = \mathbf{0}),
$$
$$
\langle x_1^{n_1} * x_2^{n_2} * \cdots x_N^{n_N} \rangle_c = 
\left[ \frac{\partial}{\partial (-ik_1)} \right]^{n_1} 
\left[ \frac{\partial}{\partial (-ik_2)} \right]^{n_2} 
\cdots 
\left[ \frac{\partial}{\partial (-ik_N)} \right]^{n_N} 
\ln \tilde{p}(\mathbf{k} = \mathbf{0}).
$$
其中对于两个变量的二阶累积量我们称之为协方差：
$$
\langle x_{1}*x_{2} \rangle _{c} = \langle x_{1}x_{2} \rangle  - \langle x_{1} \rangle _{c}\langle x_{2} \rangle _{c}
$$
等价为:
$$
\mathrm{Cov}(x, y) = E[xy] - E[x]E[y]
$$
**多重高斯分布**：
$$
p(\mathbf{x}) = \frac{1}{\sqrt{(2\pi)^N \det[C]}} \exp \left[ -\frac{1}{2} \sum_{mn} \left( C^{-1} \right)_{mn} (x_m - \lambda_m)(x_n - \lambda_n) \right]
$$
特征函数为：
$$
\tilde{p}(\mathbf{k}) = \exp\left[ -ik_{m}\lambda_{m} - \frac{1}{2}C_{nm}k_{n}k_{m} \right]
$$
此处使用了爱因斯坦求和约定。对特征函数求对数，得到累积量生成函数：
$$
\langle x_{m} \rangle _{c} = \lambda_{m} ,\quad \langle x_{m}*x_{n} \rangle _{c} = C_{nm}
$$
偶数矩是通过两两组合随机变量得到的：
$$
\langle x_{a}x_{b}x_{c}x_{d} \rangle  = C_{ab}C_{cd}+ C_{ac}C_{bd} + C_{ad}C_{bc}
$$
## 随机变量的和与中心极限定理

考虑多个随机变量的和 $X = \sum_{i=1}^{N}x_{i}$，它的概率密度是：
$$
p_{X}(x) = \int \prod_{i=1}^{N-1}\mathrm{d}x_{i}p(x_{1} \dots, x_{N-1}, x-x_{1}-x_{2}\dots-x_{N-1}) 
$$
那么它的特征函数是：
$$
\tilde{p}_{X}(k) = \langle \exp \left( -ik\sum_{i=1}^{N} x_{i} \right)\rangle = \tilde{p}(k_{1}= k_{2}= k_{3}= \dots= k)
$$
对累积量生成函数进行泰勒展开：
$$
\ln \tilde{p}(k) = -ik\sum_{i_{1}=1}^{N}\langle x_{i_{1}} \rangle_{c} + \frac{(-ik)^{2}}{2}\sum_{i_{1}, i_{2}}^{N} \langle x_{i_{1}}x_{i_{2}} \rangle _{c} + \dots   
$$
我们得到平均值和方差：
$$
\langle X \rangle _{c} = \sum_{i=1}^{N} \langle x_{i} \rangle _{c} = \sum_{i=1}^{N} \langle x_{i} \rangle ,\quad \langle X^{2} \rangle_{c} = \sum_{i_{1}, i_{2}}^{N} \langle x_{i_{1}}x_{i_{2}} \rangle _{c} = \sum C_{ij}
$$
如果这些随机变量相互独立，那么协方差是0（因为没有相关性），于是累积量就只是各个随机变量的简单相加：
$$
\langle X^{N} \rangle _{c} = \sum_{i=1}^{N} \langle x^{N}_{i} \rangle _{c} 
$$
当所有的随机变量都来自于同一类试验，比如是二项分布，那么求和符号可以去掉：
$$
\langle X^{N} \rangle _{c} = N \langle x^{N} \rangle _{c}
$$
现在我们对变量 $X$ ，进行一些线性处理，使其平均值为0，并且使之方差趋向于一个常数：
$$
y = \frac{X - N \langle x \rangle }{\sqrt{N }}
$$
当 $N \to \infty$ ，可以估算出 $\langle y^{n} \rangle_{c} \propto N^{1 - 2/n}$，此时新变量的方差趋向于一个常数，并且由于一阶累积量（平均值）为0，所以不会出现无穷大，所有大于二阶的累积量都因为  $N \to \infty$ 而变成0，于是我们得到了高斯分布：
$$
\lim_{ N \to \infty } p\left( y = \frac{X - N \langle x \rangle_{c} }{\sqrt{N }} \right) = \frac{1}{\sqrt{ 2 \pi \langle x^{2} \rangle _{c} }}\exp\left( -\frac{y^{2}}{2\langle x_{2} \rangle_{c} } \right)
$$

### 中心极限定理

随机变量只需要满足 $\sum \langle x_{i_{1}}x_{i_{2}}\dots x_{i_{m}} \rangle_{c} \ll \mathcal{O}\left( N^{\frac{m}{2}} \right)$，那么我们就可以得到高斯分布。

## 大数处理方法

在统计力学中我们要处理大量粒子，所以概率中的 $N$ 通常趋向于正无穷，在热力学中，有三种典型 $N$ 依赖参数：

- 强度量，比如温度、压强，强度量与 $N$ 无依赖关系
- 广延量，比如体积、能量，广延量和 $N$ 有正比依赖关系，是 $\mathcal{O}(N^{1})$
- 指数依赖：计算微观状态与计算相空间的可用体积时会遇到，是 $\mathcal{O}(\exp(N\phi))$

在统计力学中，我们常常要处理指数变量的和与积分，接下来有几个简单的处理可以简化计算：

### 指数量的求和：

考虑求和：
$$
\mathcal{S} = \sum_{i=1}^{N} \mathcal{E}_{i}
$$
其中每一项都大于0，并且指数依赖于 $N$ ，也就是：
$$
0 \leq \mathcal{E}_{i} \sim \mathcal{O}(\exp(N \phi_{i}))
$$
对于求和的估算决定于最大值，我们设最大值为 $\mathcal{E}_{max}$，于是有：
$$
\mathcal{E}_{max} \leq \mathcal{S} \leq N \mathcal{E}_{max}
$$
强度量可以表示为 $\dfrac{\ln \mathcal{S}}{N}$，于是：
$$
\lim_{ N \to \infty } \frac{\ln \mathcal{S}}{N} = \phi_{max}
$$
### 鞍点积分

当我们计算积分：
$$
\mathcal{J} = \int \mathrm{d}x \exp(N\phi(x))
$$
如上，我们设出最大值，将积分变换成：
$$
\mathcal{J} = \int \mathrm{d}x \exp \left[ \phi(x_{max}) + \frac{1}{2}\phi^{\prime\prime}(x_{max})(x - x_{max})^{2}\dots \right] 
$$
可以计算出（此时一阶导数为0，二阶导数小于零）：
$$
\mathcal{J} \approx e^{N\phi(x_{max})}\int \mathrm{d}x \exp\left[ \frac{N}{2}\phi^{\prime\prime}(x- x_{max})^{2} \right] \approx \sqrt{ \frac{2\pi}{N |\phi^{\prime \prime}(x_{max})|} }e^{N \phi (x_{max})}
$$
同时代入 $N \to \infty$ 得到：
$$
\lim_{ N \to \infty } \frac{\ln \mathcal{J}}{N} = \phi(x_{max})
$$

### 斯特林公式

我们有：
$$
\int_{0}^{\infty}\mathrm{d}x e^{-ax} = \frac{1}{a}
$$
两边对 $a$ 求导得到：
$$
\int_{0}^{\infty}\mathrm{d}x x^{N}e^{-ax} = \frac{N!}{a^{N+1}}
$$
代入 $a = 1$ 得到:  $N! = \int_{0}^{\infty}\mathrm{d}x x^{N}e^{-x}$，我们可以设一个连续函数来表示阶乘：
$$
\Gamma(N+1) = N! = \int_{0}^{\infty}\mathrm{d}x x^{N}e^{-ax} 
$$
利用上一节得到的估算方法，我们知道如果可以将积分表示成 $\int \mathrm{d}x \exp(N \phi(x))$ 的形式的话，可以简化处理。

于是我们有
$$
\phi(x) = \ln x - \frac{x}{N}
$$
这个函数的极大值在 $x_{max} = N$ 其中 $\phi^{\prime\prime}(x_{max}) = -\dfrac{1}{N_{2}}$，代入值我们求得：
$$
N! = \sqrt{ 2\pi N } e^{N \ln N - N} = \sqrt{ 2\pi N }N^{N}e^{-N}
$$
同时：
$$
\ln N! = N \ln N - N + \frac{1}{2}\ln (2\pi N) + \mathcal{O}\left( \frac{1}{N} \right)
$$

# 气体动理论

### 引言

在宏观层面上来描述一个热力学系统的方法在第一章已经作过简单介绍，我们可以使用熵、焓、自由能等函数来判断系统的平衡，那么在微观层面上，我们可以使用分子间的相互作用和动力学来解释，这种解释较宏观层面更加底层和基础。其中最容易研究的系统是稀薄气体系统，我们引入相图，在任何时间，我们可以用 $N$ 个粒子的动量和位矢来表示出系统的状态，其中动量和位矢满足哈密顿方程：
$$
\begin{align}


&\dot{q_{i}} = \frac{ \partial \mathcal{H} }{ \partial p_{i} }  \\ \\
&\dot{p_{i}} = - \frac{ \partial \mathcal{H} }{ \partial q_{i} } 

\end{align}
$$
其中哈密顿量 $\mathcal{H}$ 是系统的总能量，并且哈密顿方程满足时间反演对称性，即 $p \to -p, \text{when t = 0}$ 那么粒子将会重走来路：$q(t) = q(-t)$ 也就是说哈密顿量在 $(p, q) \to (-p, q)$ 变换下保持协变。

一个系统中存在大量粒子，有许多微观状态，但是宏观来看，参数只有寥寥几个，所以我们需要引入系综平均值来作为宏观量：
$$
\langle \mathcal{O} \rangle  = \int \mathrm{d}\Gamma \rho(\mathbf{p}, \mathbf{q},t)\mathcal{O}(\mathbf{p}, \mathbf{q})
$$

### 刘维尔定理

在分析力学中我们学习到：相空间随着时间的演化本身就是一种正则变换，而正则变换不改变相空间的密度，因此我们就得到了刘维尔定理： **相流是一种无法被压缩的流体，相空间体积在演化过程中保持守恒**

证明：考虑在相空间中的体积元：
$$
\Omega = \prod \mathrm{d}q_{i}\mathrm{d}p_{i}
$$
在共轭变量的投影，比如我们取 $q_{i}, p_{i}$ ，此时投影的面积为：
$$
\mathrm{d} A = \mathrm{d}q_{i}\mathrm{d}p_{i}
$$
当时间经过了 $\delta t$，变量发生改变。
$$
\begin{align}


\mathrm{d}q_{i}^{\prime} = \mathrm{d}q_{i} + \frac{ \partial \dot{q_{i}} }{ \partial q_{i} }\mathrm{d}q_{i}\delta t +\mathcal{O}(\delta t^{2}) \\ 
\mathrm{d}p_{i}^{\prime} = \mathrm{d}  p_{i}+ \frac{ \partial \dot{p_{i}} }{ \partial p_{i} } \mathrm{d}p_{i}\delta t +\mathcal{O}(\delta t^{2})

\end{align}
$$
我们可以计算出面积的变化：
$$
\mathrm{d}A^{\prime} = \mathrm{d}q_{i}^{\prime}\mathrm{d}p_{i}^{\prime} = \mathrm{d}q_{i}\mathrm{d}p_{i}(1+ \delta t(\frac{ \partial \dot{q_{i}} }{ \partial q_{i} } + \frac{ \partial \dot{p_{i}} }{ \partial p_{i} })  + \mathcal{O}(\delta t ^{2}))
$$
代入哈密顿方程，可以发现：
$$
\mathrm{d}A^{\prime} = \mathrm{d}A
$$
相当于是投影的面积没有发生改变，这一结论对于任意一对共轭参量都成立，所以相空间的体积元大小并没有发生改变，并且在这个体积元内的所有粒子，也都转移到了新的体积元中，那么最终可以得出结论，相空间密度在时间演化下是守恒的。

---

我们也可以写成：
$$
\frac{\mathrm{d}\rho}{\mathrm{d}t} = \frac{ \partial \rho }{ \partial t }  + \{ \rho, H\}
$$
微观层面下的哈密顿方程具有时间反演不变性，于是我们有：
$$
\rho(p,q,t) = \rho(-p,q,-t)
$$
利用刘维尔定理推导系综平均值的变化：
$$
\frac{\mathrm{d}\langle \mathcal{O} \rangle }{\mathrm{d}t} = \int \mathrm{d}\Gamma \frac{ \partial \rho }{ \partial t } \mathcal{O}(\mathbf{p}, \mathbf{q}) = - \int \mathrm{d}\Gamma \{ \rho, \mathcal{H}\}\mathcal{O}(\mathbf{p},\mathbf{q})
$$
使用分部积分，已知在边界相空间密度为 $0$，于是可以略去第一项。
$$
\frac{\mathrm{d}\langle  \mathcal{O} \rangle }{\mathrm{d}t} = \int \mathrm{d}\Gamma \rho \{ \mathcal{O}, \mathcal{H}\} = \langle \{\mathcal{O, H} \} \rangle 
$$
系综平均的变化率等于物理量和哈氏量的泊松括号的系综平均值。

---

如果系统达到了平衡，那么这个系综平均值应该不再发生变化，所以我们需要
$$
\{ \rho, \mathcal{H}\} = 0
$$
满足上式的方法有许多，我们可以让 $\rho = \rho(\mathcal{H})$ 这种解说明了相空间密度在$\mathcal{H} = const$ 的超平面上是常量，但是在现实世界中相空间密度并不一定是常数，自然界的演化不一定是均匀的，所以我们这种判断等效于将客观概率替换为主观概率。

### BBGKY层级

考虑一个粒子出现在 $(\vec{p}, \vec{q}, t)$ 的概率密度 **（One-particle density）**，我不考虑这个粒子是哪一个粒子，我可以对所有粒子进行求和然后求系综平均：
$$
f_{1}(\vec{p}, \vec{q}, t) = \langle \sum_{i=1}^{N}  \delta^{3}(\vec{p_{i}}- \vec{p})\delta^{3}(\vec{q_{i}} - \vec{q}) \rangle  
$$
我们可以进行变形，由于在这里我不用考虑是哪一个粒子，所以我可以直接在积分符号外面乘上 $N$ 来表示上面的累加。
$$
f_{1}(\mathbf{p},\mathbf{q},t) = N \int \prod_{i=2}^{N} \mathrm{d}^{3}p_{i}\mathrm{d}^{3}q_{i \rho}(p_{1} = \mathbf{p}, q_{1} = \mathbf{q}, p_{2}, q_{2}, \dots, t) 
$$
如果我们将后面的积分单独来看，可以发现这是一个**无条件概率密度**，指的是不考虑 $2-N$ 这些粒子的状态，只看第一个粒子的状态，我们可以将这个概率密度记为 $\rho_{1}$ ，那么有 $f_{1} = N\rho_{1}$ ，也就说如果没有前面的**归一化系数** $N$ 那么得到的只是一个无条件概率

两个粒子的概率密度为：
$$
f_{2}(\vec{p}, \vec{q}) = N(N-1)\int \prod_{i=3}^{N} \mathrm{d}V_{i}\rho(\vec{p}_{1}, \dots, \vec{q_{N}}, t) = N(N-1)\rho_{2}
$$
此处对于归一化系数的解释：对于第一个粒子有 $N$ 个选择，那么对于第二个粒子就有 $N-1$ 个选择。

推广到 $s$ 个粒子：
$$
f_{s}(\vec{p},\vec{q},t) = \frac{N!}{(N-S)!}\int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\rho = \frac{N!}{(N-S)!}\rho_{s}
$$
我们感兴趣的是这些参数对时间的依赖性，于是我们写出：
$$
\frac{ \partial f_{s} }{ \partial t } = \frac{N!}{(N-s)!}\int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\frac{ \partial \rho }{ \partial t }  
$$
根据刘维尔定理我们知道：
$$
\frac{ \partial \rho }{ \partial t }  = -\{\rho, \mathcal{H} \} = \{\mathcal{H}, \rho \}
$$
那么我们就去写出系统的哈密顿量 $\mathcal{H}$，这里的哈密顿量都是与时间无关的。 
$$
\mathcal{H} = \sum_{i=1}^{N} \left[ \frac{p_{i}^{2}}{2m} + U(\vec{q_{i}})\right] + \frac{1}{2} \sum_{i,j}^{N} U(\vec{q_{i}}- \vec{q_{j}})
$$
由于前面我们正写出了 $s$ 个粒子的概率密度函数，自然而然地我们想到将哈密顿量拆分成三个部分。
$$
\mathcal{H} = \mathcal{H}_{s} + \mathcal{H}_{N-s} + \mathcal{H}_{inter}
$$
其中：
$$
\mathcal{H}_{s} = \sum_{m=1}^{s} \left[ \frac{p_{m}^{2}}{2m} + U(\vec{q_{m}}) \right] + \frac{1}{2}\sum_{n \neq m}^{s} U (\vec{q}_{m}- \vec{q}_{n}) 
$$
同理于 $\mathcal{H}_{N-s}$，$\mathcal{H}_{int er}$ 等于剩下的交叉项，也就是 $s$ 个和 $N-s$ 个粒子的交叉。

接下来我们可以对之前对于时间的偏导数进行计算：
$$
\frac{ \partial f_{s} }{ \partial t } = \frac{N!}{(N-s)!}\int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\left\{ \mathcal{H}_{s} + \mathcal{H}_{N-s} + \mathcal{H}_{inter}, \rho \right\}
$$
计算第一项：
$$
\int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\{ \mathcal{H}_{s}, \rho\} = \left\{ \mathcal{H}_{s}, \int \prod_{i=s+1}^{N} \mathrm{d}V_{i} \rho \right\} = \{ \mathcal{H}_{s}, \rho_{s}\}
$$
计算第二项，我们发现可以使用分部积分，最终得到第二项为 $0$
$$
\int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\{ \mathcal{H}_{N-s}, \rho\} = \int \prod_{i=s+1}^{N} \mathrm{d}V_{i} \sum_{j=1}^{N} \left[ \frac{ \partial \mathcal{H} }{ \partial q_{j} }\frac{ \partial \rho }{ \partial p_{j} }  - \frac{ \partial \mathcal{H} }{ \partial p_{j} }\frac{ \partial \rho }{ \partial q_{j} }  \right]
\sim \int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\sum_{j=1}^{N} \left[ \frac{ \partial^{2} \mathcal{H} }{ \partial p_{j} \partial q_{j}} - \frac{ \partial ^{2}\mathcal{H} }{ \partial q_{j}\partial p_{j} }  \right] = 0
$$
对于第三项，我们也可以使用分部积分的方法计算出来，我们可以得到：
$$
\int \prod_{i=s+1}^{N} \mathrm{d}V_{i}\{ \mathcal{H}_{in ter}, \rho \} = (N-s) \sum_{n=1}^{s} \int \mathrm{d}V_{s+1}\frac{ \partial \mathcal{V}(\vec{q}_{n} - \vec{q}_{s+1}) }{ \partial \vec{q}_{n} } \cdot \frac{ \partial  }{ \partial \vec{p}_{n} }\left[ \int \prod_{i=s+2}^{N} \mathrm{d}V_{i}\rho \right] 
$$
最后那一项是 $s+1$ 个粒子的概率密度
$$
\int \prod_{i=s+2}^{N} \mathrm{d}V_{i}\rho = \rho_{s+1}
$$
整合我们所有的结果我们可以写出：
$$
\frac{ \partial f_{s} }{ \partial t } - \{\mathcal{H}_{s}, f_{s} \} = \sum_{n=1}^{s} \int \mathrm{d}V_{s+1}\frac{ \partial \mathcal{V}(\vec{q}_{n}- \vec{q}_{s+1}) }{ \partial \vec{q}_{n} }\cdot \frac{ \partial f_{s+1} }{ \partial \vec{p_{n}} }  
$$
这就是我们想要的**BBGKY层级**，我们想要求出$f_{s}$ 必须先求出 $\frac{ \partial f_{s+1} }{ \partial t }$，那么这个逻辑链会不断向上增加，最终和整一个系统的复杂度相当。

我们也可以从物理角度来理解这个公式：我们选择 $s$ 个粒子作为研究对象，这 $s$ 个粒子的相空间密度按照刘维尔定理，其演化应当是：$\frac{ \partial \rho_{s} }{ \partial t }=\{\mathcal{H}, \rho_{s}\}$，但是这个系统并不是一个稳定均匀的系统，粒子之间会又相互碰撞，所以我们需要引入修正项，这 $s$ 个粒子都可能和剩下来的 $N-s$ 个粒子发生碰撞，这就是等式右边的解释。  
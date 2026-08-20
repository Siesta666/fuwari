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
等价于系统的热容需要为正数，温度升高需要热量输入。

力学平衡和化学平衡可以看作是相似的，我们都可以把其看作是广义位移和广义力的共轭作用。拿气体系统举例子，考虑只有 $\delta x_{i}$ 不为 0 的情况，需要有：
$$
\frac{ \partial J_{i} }{ \partial x_{j} }\delta x_{i}\delta x_{j} > 0 
$$
根据线性代数，可以知道这是一个二次型矩阵，要让多项式恒大于0，那么矩阵需要为正定的：
$$
\begin{bmatrix}
-\dfrac{ \partial P }{ \partial V }  & -\dfrac{ \partial P }{ \partial N } \\ \\
\dfrac{ \partial \mu }{ \partial V } & \dfrac{ \partial \mu }{ \partial N } 
\end{bmatrix}
$$
为一个正定矩阵

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

## 总结 🤠

至此我们完成了第一章的理论学习，第一章 Thermodynamics 热动力学，主要是从宏观角度来分析常见的热力学系统，并且介绍描述系统的参数和方法。

学习路线是：从热力学三定律引入到熵，再到热平衡中引入热力学势函数，然后计算系统平衡的稳定性，最后学习热力学第三定律为了与后续微观角度的统计力学衔接。

——Siesta 2026-08-20
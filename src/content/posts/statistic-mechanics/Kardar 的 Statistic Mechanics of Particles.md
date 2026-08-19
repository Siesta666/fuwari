---
title: Kardar 的 Statistic Mechanics of Particles
published: 2026-08-18
description: Kardar的统计力学 读书笔记
image: ./cover.jpg
tags:
  - 统计力学
  - Notes
category: 统计力学
draft: false
lang: zh-CN
---
# Thermodynamics 热动力学
	Thermodynamics is a phenomenological description of properties of macroscopic systems in thermal equilibrium.

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
这个结论在推导一些热力学关系的时候十分有用。于是我们还可以得到一个结论：孤立系统（$\text{đ}Q = 0$）熵不减，比如一个绝热容器中气体自由膨胀。




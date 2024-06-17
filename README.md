# vue-stock-alarm

## 股票预警系统

目前实现涨速预警，满足涨速条件时弹出窗口，发出提示音

数据源：东方财富接口

#### [Vue](https://vuejs.org/)+[Vite](https://vitejs.dev/)+[PrimeVue](https://primevue.org/)+[Pinia](https://pinia.vuejs.org/)+[Tauri](https://tauri.app/)

## 项目使用说明

### 克隆到本地
```sh
git clone 
```
### 安装依赖包
```sh
pnpm install
```

### 编译和热重载以进行开发

```sh
pnpm run dev
```

### 为生产进行类型检查、编译和缩小

```sh
pnpm run build
```
### tauri生成桌面程序

```sh
cargo tauri build
```

### 运行程序

![主界面](https://github.com/Naza3/vue-stock-alert/blob/master/public/mainWindowScreen.png)

打开软件，点击上传股票列表，按照`stock.txt`文件中格式填写想要观察的股票。

#### 参数说明：

数据更新频率：默认10秒，指隔10秒从服务器获取股票实时数据。

异动计算周期：默认60秒，指计算60秒内的涨速。

涨速临界值：默认3，指计算周期内涨速超过3%，则弹出消息提示(手动关闭)以及提示音。

# React Form useRef

`useRef`を使用して、名前と年齢を入力するフォームを作成する練習アプリです。

入力内容は`useState`では管理せず、`ref`を使って取得します。

---

## 目次

* [1. 概要](#1-概要)
* [2. 学習内容](#2-学習内容)
* [3. 課題内容](#3-課題内容)
* [4. 条件](#4-条件)
* [5. ファイル構成](#5-ファイル構成)
* [6. 実装内容](#6-実装内容)

  * [6.1 refの作成](#61-refの作成)
  * [6.2 inputへのrefの設定](#62-inputへのrefの設定)
  * [6.3 フォーム送信処理](#63-フォーム送信処理)
  * [6.4 入力値の取得](#64-入力値の取得)
* [7. useRefを使用する理由](#7-userefを使用する理由)
* [8. 動作イメージ](#8-動作イメージ)
* [9. 起動方法](#9-起動方法)

---

## 1. 概要

`useRef`を使用して、名前と年齢を入力するフォームを実装します。

フォームに入力された値は`useState`では管理せず、`useRef`を使用してDOMから直接取得します。

フォームを送信すると、入力された名前と年齢を`alert`で表示します。

---

## 2. 学習内容

このアプリでは、以下の内容を学習します。

* `useRef`
* DOM要素への参照
* `ref`
* `ref.current`
* フォーム送信処理
* `FormEvent`
* `event.preventDefault()`
* ControlledコンポーネントとUncontrolledコンポーネントの違い

---

## 3. 課題内容

`useRef`を使って、名前と年齢を入力するフォームを作成します。

送信時に、以下の形式でアラートを表示します。

```text
名前: ○○、年齢: ○○
```

ただし、入力内容を`useState`では管理しないものとします。

---

## 4. 条件

以下の条件を満たすように実装します。

### 条件1

`nameInput`と`ageInput`の2つの`ref`を作成します。

```ts
const nameInput = useRef<HTMLInputElement>(null);
const ageInput = useRef<HTMLInputElement>(null);
```

### 条件2

フォーム送信時に`alert`を使用して入力された値を表示します。

```ts
alert(
  `名前: ${nameInput.current.value}、年齢: ${ageInput.current.value}`,
);
```

### 条件3

入力値が変更されても、入力値の変更をStateで管理しないため、入力のたびにStateによる再レンダリングを発生させません。

---

## 5. ファイル構成

```text
src/
├── hooks/
│   └── useHandleForm.ts
├── Pages/
│   └── Form.tsx
├── App.tsx
├── index.css
└── main.tsx
```

### ファイルの役割

| ファイル               | 役割                   |
| ------------------ | -------------------- |
| `useHandleForm.ts` | `useRef`とフォーム送信処理を管理 |
| `Form.tsx`         | フォームの表示              |
| `App.tsx`          | アプリ全体の構成             |
| `index.css`        | Tailwind CSSの読み込み    |
| `main.tsx`         | Reactアプリのエントリーポイント   |

---

## 6. 実装内容

### 6.1 refの作成

`useRef`を使用して、名前と年齢の入力欄を参照するためのrefを作成します。

```ts
import { useRef } from "react";

const nameInput = useRef<HTMLInputElement>(null);
const ageInput = useRef<HTMLInputElement>(null);
```

`useRef<HTMLInputElement>(null)`によって、`HTMLInputElement`を参照できるrefを作成します。

---

### 6.2 inputへのrefの設定

作成したrefを`input`の`ref`属性に設定します。

```tsx
<label htmlFor="name">
  名前:
  <input
    id="name"
    type="text"
    ref={nameInput}
    className="ml-2 border rounded-lg"
  />
</label>
```

年齢も同様に設定します。

```tsx
<label htmlFor="age">
  年齢:
  <input
    id="age"
    type="number"
    ref={ageInput}
    className="ml-2 border rounded-lg"
  />
</label>
```

これにより、

```text
nameInput
   ↓
名前のinput要素

ageInput
   ↓
年齢のinput要素
```

という関係になります。

---

### 6.3 フォーム送信処理

フォームが送信されたときに処理を実行します。

```ts
const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  if (nameInput.current && ageInput.current) {
    alert(
      `名前: ${nameInput.current.value}、年齢: ${ageInput.current.value}`,
    );
  }
};
```

`event.preventDefault()`によって、フォーム送信時のページリロードを防ぎます。

---

### 6.4 入力値の取得

`useRef`で参照しているDOM要素は、`current`から取得できます。

```ts
nameInput.current
```

これによって名前の`input`要素を取得できます。

さらに、

```ts
nameInput.current.value
```

とすることで、現在入力されている値を取得できます。

年齢も同様です。

```ts
ageInput.current.value
```

そのため、

```ts
alert(
  `名前: ${nameInput.current.value}、年齢: ${ageInput.current.value}`,
);
```

とすることで、入力された値を表示できます。

---

## 7. useRefを使用する理由

通常、フォームの入力値を`useState`で管理すると、入力するたびにStateが更新されます。

```tsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

一方、今回の課題では`useRef`を使用します。

```tsx
const nameInput = useRef<HTMLInputElement>(null);

<input ref={nameInput} />
```

入力値はDOM側で保持され、必要になったタイミングで、

```ts
nameInput.current?.value
```

として取得できます。

そのため、入力値の変更そのものを理由としたState更新や再レンダリングは発生しません。

### 比較

| 方法         | 入力値の管理      | 入力時のState更新 |
| ---------- | ----------- | ----------- |
| `useState` | React State | 発生する        |
| `useRef`   | DOM         | 発生しない       |

今回の実装は、`useRef`を使った**Uncontrolledコンポーネント**の基本的な例です。

---

## 8. 動作イメージ

フォームに入力します。

```text
名前: [山田太郎]

年齢: [25]

[送信]
```

「送信」ボタンをクリックすると、

```text
名前: 山田太郎、年齢: 25
```

というアラートが表示されます。

入力中は`useState`によるState更新を行わないため、入力値の変更による再レンダリングは発生しません。

---

## 9. 起動方法

### パッケージのインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

表示されたURLにアクセスして、フォームの動作を確認します。

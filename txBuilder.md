# Scallop Transaction Builder

## Initialize Transaction Builder

```typescript
import * as dotenv from 'dotenv';
import { describe, test, expect } from 'vitest';
import { NetworkType } from '@scallop-io/sui-kit';
import { Scallop } from '../src';
dotenv.config();

describe('Test Scallop transaction builder', async () => {
  const NETWORK: NetworkType = 'testnet';
  const scallopSDK = new Scallop({
    secretKey: process.env.SECRET_KEY,
    networkType: NETWORK,
  });
  const sender = scallopSDK.suiKit.currentAddress();
  const txBuilder = await scallopSDK.createTxBuilder();
  // ...
  // ...
});
```

## Open an account on Scallop (To borrow from scallop, account is required)

```typescript
test('"openObligationEntry" should create a shared obligation, and send obligationKey to sender', async () => {
  const tx = txBuilder.createTxBlock();
  tx.openObligationEntry();
  const openObligationResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('openObligationResult:', openObligationResult);
  expect(openObligationResult.effects.status.status).toEqual('success');
});
```

## Borrow from Scallop

```typescript
test('"borrowQuick" should borrow 1 USDC, and return borrowed USDC', async () => {
  const tx = txBuilder.createTxBlock();
  // Sender is required to invoke "borrowQuick"
  tx.setSender(sender);
  const borrowedCoin = await tx.borrowQuick(10 ** 9, 'usdc');
  // Transfer borrowed coin to sender
  tx.transferObjects([borrowedCoin], sender);
  const borrowQuickResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('borrowQuickResult:', borrowQuickResult);
  expect(borrowQuickResult.effects.status.status).toEqual('success');
});
```

## Repay to Scallop

```typescript
test('"repayQuick" should repay 1 USDC', async () => {
  const tx = txBuilder.createTxBlock();
  // Sender is required to invoke "repayQuick"
  tx.setSender(sender);
  await tx.repayQuick(10 ** 9, 'usdc');
  const repayQuickResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('repayQuickResult:', repayQuickResult);
  expect(repayQuickResult.effects.status.status).toEqual('success');
});
```

## Lend on Scallop

```typescript
test('"depositQuick" should lend 1 USDC, and return the "USDC market coin"', async () => {
  const tx = txBuilder.createTxBlock();
  // Sender is required to invoke "depositQuick"
  tx.setSender(sender);
  const marketCoin = await tx.depositQuick(10 ** 9, 'usdc');
  tx.transferObjects([marketCoin], sender);
  const depositQuickResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('depositQuickResult:', depositQuickResult);
  expect(depositQuickResult.effects.status.status).toEqual('success');
});
```

## Withdraw from Scallop

```typescript
test('"withdrawQuick" should burn 1 "USDC market coin", and return at least 1 USDC and the interest', async () => {
  const tx = txBuilder.createTxBlock();
  // Sender is required to invoke "withdrawQuick"
  tx.setSender(sender);
  const coin = await tx.withdrawQuick(10 ** 9, 'usdc');
  tx.transferObjects([coin], sender);
  const withdrawQuickResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('withdrawQuickResult:', withdrawQuickResult);
  expect(withdrawQuickResult.effects.status.status).toEqual('success');
});
```

## Add collateral to account

```typescript
test('"addCollateralQuick" should add 1 USDC as collateral', async () => {
  const tx = txBuilder.createTxBlock();
  // Sender is required to invoke "addCollateralQuick"
  tx.setSender(sender);
  await tx.addCollateralQuick(10 ** 9, 'usdc');
  const addCollateralQuickResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('addCollateralQuickResult:', addCollateralQuickResult);
  expect(addCollateralQuickResult.effects.status.status).toEqual('success');
});
```

## Take collateral from account

```typescript
test('"takeCollateralQuick" should take 1 USDC from collateral', async () => {
  const tx = txBuilder.createTxBlock();
  // Sender is required to invoke "removeCollateralQuick"
  tx.setSender(sender);
  const coin = await tx.takeCollateralQuick(10 ** 9, 'usdc');
  tx.transferObjects([coin], sender);
  const removeCollateralQuickResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('takeCollateralQuickResult:', removeCollateralQuickResult);
  expect(removeCollateralQuickResult.effects.status.status).toEqual('success');
});
```

## FlashLoan on Scallop

```typescript
test('"borrowFlashLoan" & "repayFlashLoan" should be able to borrow and repay 1 USDC flashLoan from Scallop', async () => {
  const tx = txBuilder.createTxBlock();
  const [coin, loan] = tx.borrowFlashLoan(10 ** 9, 'usdc');
  /**
   * Do something with the borrowed coin
   * such as pass it to a dex to make a profit
   * tx.moveCall('xx::dex::swap', [coin]);
   */
  // In the end, repay the loan
  tx.repayFlashLoan(coin, loan, 'usdc');
  const borrowFlashLoanResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('borrowFlashLoanResult:', borrowFlashLoanResult);
  expect(borrowFlashLoanResult.effects.status.status).toEqual('success');
});
```

## Compatability with @mysten/sui.js TransactionBlock

Scallop Transaction Builder contains a `TransactionBlock` instance from `@mysten/sui.js`.
So you can use both `TransactionBlock` and `ScallopTransactionBlock` at the same time to build your transaction.

```typescript
test('"txBlock" is an instance of "TransactionBlock" from @mysten/sui.js', async () => {
  const tx = txBuilder.createTxBlock();
  expect(tx.txBlock).toBeInstanceOf(TransactionBlock);
  /**
   * For example, you can do the following:
   * 1. split SUI from gas
   * 2. depoit SUI to Scallop
   * 3. transfer SUI Market Coin to sender
   */
  const suiTxBlock = tx.txBlock;
  const [coin] = suiTxBlock.splitCoins(suiTxBlock.gas, [
    suiTxBlock.pure(10 ** 6),
  ]);
  const marketCoin = tx.deposit(coin, 'sui');
  suiTxBlock.transferObjects([marketCoin], suiTxBlock.pure(sender));
  const txBlockResult = await txBuilder.signAndSendTxBlock(tx);
  console.info('txBlockResult:', txBlockResult);
  expect(txBlockResult.effects.status.status).toEqual('success');
});
```

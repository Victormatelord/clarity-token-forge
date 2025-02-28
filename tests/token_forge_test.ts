import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types
} from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Ensure only owner can create tokens",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    // Test token creation as owner
    let block = chain.mineBlock([
      Tx.contractCall('token-forge', 'create-token', [
        types.ascii("TestToken"),
        types.ascii("TTK"),
        types.uint(8),
        types.bool(true),
        types.bool(true),
        types.bool(true)
      ], deployer.address)
    ]);
    block.receipts[0].result.expectOk().expectUint(1);
    
    // Test token creation as non-owner (should fail)
    block = chain.mineBlock([
      Tx.contractCall('token-forge', 'create-token', [
        types.ascii("TestToken2"),
        types.ascii("TT2"),
        types.uint(8),
        types.bool(true),
        types.bool(true),
        types.bool(true)
      ], wallet1.address)
    ]);
    block.receipts[0].result.expectErr().expectUint(100);
  }
});

Clarinet.test({
  name: "Test token info retrieval",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    // Create token first
    let block = chain.mineBlock([
      Tx.contractCall('token-forge', 'create-token', [
        types.ascii("TestToken"),
        types.ascii("TTK"),
        types.uint(8),
        types.bool(true),
        types.bool(true),
        types.bool(true)
      ], deployer.address)
    ]);
    
    // Get token info
    const response = chain.callReadOnlyFn(
      'token-forge',
      'get-token-info',
      [types.uint(1)],
      deployer.address
    );
    
    const token = response.result.expectOk().expectTuple();
    assertEquals(token['name'].value, "TestToken");
    assertEquals(token['symbol'].value, "TTK");
    assertEquals(token['decimals'].value, 8);
  }
});

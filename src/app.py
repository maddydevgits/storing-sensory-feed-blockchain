from web3 import Web3, HTTPProvider
import json
import random
import time

web3=Web3(HTTPProvider('http://127.0.0.1:7545'))
web3.eth.defaultAccount = web3.eth.accounts[0]

compiled_contract_path='../build/contracts/device.json'
deployed_contract_address='0x5eb128497496857f0aFA46161902A6D5c804b4D0'

with open(compiled_contract_path) as file:
    contract_json=json.load(file)
    contract_abi=contract_json['abi']

contract=web3.eth.contract(address=deployed_contract_address,abi=contract_abi)

while True:
    h=random.randint(40,100)
    t=random.randint(20,35)
    h=str(h).encode('utf-8')
    t=str(t).encode('utf-8')
    tx_hash=contract.functions.storeFeed(h,t).transact()
    web3.eth.waitForTransactionReceipt(tx_hash)
    print(tx_hash)
    time.sleep(4)
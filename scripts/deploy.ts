import { ethers } from 'hardhat'
import { run, network } from 'hardhat'

import {} from 'hardhat'
import 'dotenv/config'

const verify = async (contractAddress: string, args: any[]) => {
  console.log('Verifying Contract')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.log(e)
    }
  }
}
const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying Contract')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`SimpleStorage deployed to ${simpleStorage.address} `)
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    console.log('Verifying contract')
    // as we need some time so etherscan can identify if there is a transaction
    await simpleStorage.deployTransaction.wait(26)
    await verify(simpleStorage.address, [])
  }
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is ${currentValue}`)
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Current value has updated to ${updatedValue}`)
}

const deploy = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
deploy()

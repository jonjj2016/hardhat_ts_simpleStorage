import { task } from 'hardhat/config'

export default task('block-number', 'Print the Current Block number').setAction(
  async (taskArguments, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current Block Number is ${blockNumber}`)
  },
)

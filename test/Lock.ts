import { SimpleStorage__factory } from '../typechain-types/factories/SimpleStorage__factory'
import { assert, expect } from 'chai'
import { ethers } from 'hardhat'
import { SimpleStorage } from '../typechain-types/SimpleStorage'

describe('SimpleStorage', () => {
  let simpleStorage: SimpleStorage
  let SimpleStorageFactory: SimpleStorage__factory
  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      'SimpleStorage',
    )) as SimpleStorage__factory
    simpleStorage = await SimpleStorageFactory.deploy()
  })
  it('Should start with a favorite number of 0', async function () {
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(0)
  })
  it('Should update when we call store', async function () {
    let expectedValue = 7
    let transactionResponse = await simpleStorage.store(expectedValue)
    let transactionReceipt = await transactionResponse.wait()
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(expectedValue)
  })
  it('Adding People with addPerson function', async () => {
    const name = 'Joe'
    const favoriteNumber = '1963'
    await simpleStorage.addPerson(name, favoriteNumber)
    const usersNumber = await simpleStorage.people(0)
    console.log(usersNumber.favoriteNumber)
    assert(favoriteNumber, String(usersNumber.favoriteNumber))
    assert(name, usersNumber.name)
  })
})

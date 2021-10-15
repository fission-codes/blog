import { Feed } from './feed'

describe('feed', () => {
  it('should create a new instance', () => {
    var feed = new Feed('example feed', [])
    expect(feed).toBeTruthy()
  })
})

import { Feed } from './feed'

describe('feed constructor', () => {
  it('should create a new instance', () => {
    var feed = new Feed({
      version: '1',
      title: 'aaa',
      authors: [{ name: 'alice' }],
      items: []
    })

    expect(feed instanceof Feed).toEqual(true)
    expect(feed).toBeTruthy()
    expect(feed.title).toEqual('aaa')
  })
})

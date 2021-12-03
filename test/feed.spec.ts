import { Feed } from "../src/utils/feed"

describe("feed constructor", () => {
  it("should create a new instance", () => {
    const feed = new Feed({
      version: "1",
      title: "aaa",
      authors: [{ name: "alice" }],
      items: []
    })

    expect(feed instanceof Feed).toEqual(true)
    expect(feed.title).toEqual("aaa")
  })
})

describe("Feed.fromString", () => {
  it("should take a JSON string", () => {
    const serializedFeed = JSON.stringify({
      title: "foo",
      items: [{ id: "1", title: "title example" }]
    })

    const feed = Feed.fromString(serializedFeed)
    expect(feed.items[0].title).toEqual("title example")
  })
})

describe("feed.toString", () => {
  it("should serialize the feed", () => {
    const feed = new Feed({
      version: "1",
      title: "example",
      authors: [{ name: "alice" }],
      items: []
    })

    const str = feed.toString()
    expect(str).toEqual(JSON.stringify(feed))
  })
})

describe("feed.addItem ", () => {
  it("should add an item to the list", () => {
    const feed = new Feed({
      title: "test",
      authors: [{ name: "alice" }],
      items: []
    })

    expect(feed.items.length).toEqual(0)
    feed.addItem({ id: "1", title: "example" })
    expect(feed.items[0].title).toEqual("example")
  })
})

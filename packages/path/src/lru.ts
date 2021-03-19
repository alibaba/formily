/**
 * A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
 * recently used items while discarding least recently used items when its limit
 * is reached.
 *
 * Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
 * See README.md for details.
 *
 * Illustration of the design:
 *
 *       entry             entry             entry             entry
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */
/* eslint-disable */

const NEWER = Symbol('newer')
const OLDER = Symbol('older')

export function LRUMap(limit: number, entries?: any) {
  if (typeof limit !== 'number') {
    // called as (entries)
    entries = limit
    limit = 0
  }

  this.size = 0
  this.limit = limit
  this.oldest = this.newest = undefined
  this._keymap = new Map()

  if (entries) {
    this.assign(entries)
    if (limit < 1) {
      this.limit = this.size
    }
  }
}

function Entry(key: any, value: any) {
  this.key = key
  this.value = value
  this[NEWER] = undefined
  this[OLDER] = undefined
}

LRUMap.prototype._markEntryAsUsed = function(entry: any) {
  if (entry === this.newest) {
    // Already the most recenlty used entry, so no need to update the list
    return
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry[NEWER]) {
    if (entry === this.oldest) {
      this.oldest = entry[NEWER]
    }
    entry[NEWER][OLDER] = entry[OLDER] // C <-- E.
  }
  if (entry[OLDER]) {
    entry[OLDER][NEWER] = entry[NEWER] // C. --> E
  }
  entry[NEWER] = undefined // D --x
  entry[OLDER] = this.newest // D. --> E
  if (this.newest) {
    this.newest[NEWER] = entry // E. <-- D
  }
  this.newest = entry
}

LRUMap.prototype.assign = function(entries: any) {
  let entry: any
  let limit = this.limit || Number.MAX_VALUE
  this._keymap.clear()
  const it = entries[Symbol.iterator]()
  for (let itv = it.next(); !itv.done; itv = it.next()) {
    const e = new Entry(itv.value[0], itv.value[1])
    this._keymap.set(e.key, e)
    if (!entry) {
      this.oldest = e
    } else {
      entry[NEWER] = e
      e[OLDER] = entry
    }
    entry = e
    if (limit-- === 0) {
      throw new Error('overflow')
    }
  }
  this.newest = entry
  this.size = this._keymap.size
}

LRUMap.prototype.get = function(key: any) {
  // First, find our cache entry
  const entry = this._keymap.get(key)
  if (!entry) {
    return
  } // Not cached. Sorry.
  // As <key> was found in the cache, register it as being requested recently
  this._markEntryAsUsed(entry)
  return entry.value
}

LRUMap.prototype.set = function(key: any, value: any) {
  let entry = this._keymap.get(key)

  if (entry) {
    // update existing
    entry.value = value
    this._markEntryAsUsed(entry)
    return this
  }

  // new entry
  this._keymap.set(key, (entry = new Entry(key, value)))

  if (this.newest) {
    // link previous tail to the new tail (entry)
    this.newest[NEWER] = entry
    entry[OLDER] = this.newest
  } else {
    // we're first in -- yay
    this.oldest = entry
  }

  // add new entry to the end of the linked list -- it's now the freshest entry.
  this.newest = entry
  ++this.size
  if (this.size > this.limit) {
    // we hit the limit -- remove the head
    this.shift()
  }

  return this
}

LRUMap.prototype.shift = function() {
  // todo: handle special case when limit == 1
  const entry = this.oldest
  if (entry) {
    if (this.oldest[NEWER]) {
      // advance the list
      this.oldest = this.oldest[NEWER]
      this.oldest[OLDER] = undefined
    } else {
      // the cache is exhausted
      this.oldest = undefined
      this.newest = undefined
    }
    // Remove last strong reference to <entry> and remove links from the purged
    // entry being returned:
    entry[NEWER] = entry[OLDER] = undefined
    this._keymap.delete(entry.key)
    --this.size
    return [entry.key, entry.value]
  }
}

// ----------------------------------------------------------------------------
// Following code is optional and can be removed without breaking the core
// functionality.

LRUMap.prototype.find = function(key: any) {
  const e = this._keymap.get(key)
  return e ? e.value : undefined
}

LRUMap.prototype.has = function(key: any) {
  return this._keymap.has(key)
}

LRUMap.prototype.delete = function(key: any) {
  const entry = this._keymap.get(key)
  if (!entry) {
    return
  }
  this._keymap.delete(entry.key)
  if (entry[NEWER] && entry[OLDER]) {
    // relink the older entry with the newer entry
    entry[OLDER][NEWER] = entry[NEWER]
    entry[NEWER][OLDER] = entry[OLDER]
  } else if (entry[NEWER]) {
    // remove the link to us
    entry[NEWER][OLDER] = undefined
    // link the newer entry to head
    this.oldest = entry[NEWER]
  } else if (entry[OLDER]) {
    // remove the link to us
    entry[OLDER][NEWER] = undefined
    // link the newer entry to head
    this.newest = entry[OLDER]
  } else {
    // if(entry[OLDER] === undefined && entry.newer === undefined) {
    this.oldest = this.newest = undefined
  }

  this.size--
  return entry.value
}

LRUMap.prototype.clear = function() {
  // Not clearing links should be safe, as we don't expose live links to user
  this.oldest = this.newest = undefined
  this.size = 0
  this._keymap.clear()
}

function EntryIterator(oldestEntry: any) {
  this.entry = oldestEntry
}
EntryIterator.prototype[Symbol.iterator] = function() {
  return this
}
EntryIterator.prototype.next = function() {
  const ent = this.entry
  if (ent) {
    this.entry = ent[NEWER]
    return { done: false, value: [ent.key, ent.value] }
  } else {
    return { done: true, value: undefined }
  }
}

function KeyIterator(oldestEntry) {
  this.entry = oldestEntry
}
KeyIterator.prototype[Symbol.iterator] = function() {
  return this
}
KeyIterator.prototype.next = function() {
  const ent = this.entry
  if (ent) {
    this.entry = ent[NEWER]
    return { done: false, value: ent.key }
  } else {
    return { done: true, value: undefined }
  }
}

function ValueIterator(oldestEntry) {
  this.entry = oldestEntry
}
ValueIterator.prototype[Symbol.iterator] = function() {
  return this
}
ValueIterator.prototype.next = function() {
  const ent = this.entry
  if (ent) {
    this.entry = ent[NEWER]
    return { done: false, value: ent.value }
  } else {
    return { done: true, value: undefined }
  }
}

LRUMap.prototype.keys = function() {
  return new KeyIterator(this.oldest)
}

LRUMap.prototype.values = function() {
  return new ValueIterator(this.oldest)
}

LRUMap.prototype.entries = function() {
  return this
}

LRUMap.prototype[Symbol.iterator] = function() {
  return new EntryIterator(this.oldest)
}

LRUMap.prototype.forEach = function(
  fun: (value: any, key: any, ctx: object) => void,
  thisObj: any
) {
  if (typeof thisObj !== 'object') {
    thisObj = this
  }
  let entry = this.oldest
  while (entry) {
    fun.call(thisObj, entry.value, entry.key, this)
    entry = entry[NEWER]
  }
}

/** Returns a JSON (array) representation */
LRUMap.prototype.toJSON = function() {
  const s = new Array(this.size)
  let i = 0
  let entry = this.oldest
  while (entry) {
    s[i++] = { key: entry.key, value: entry.value }
    entry = entry[NEWER]
  }
  return s
}

/** Returns a String representation */
LRUMap.prototype.toString = function() {
  let s = ''
  let entry = this.oldest
  while (entry) {
    s += String(entry.key) + ':' + entry.value
    entry = entry[NEWER]
    if (entry) {
      s += ' < '
    }
  }
  return s
}

/**
 * LRU（Least Recently Used，最近最少使用）是一种缓存淘汰策略，核心思想是：当缓存容量满时，优先淘汰最久未被访问的数据。
 * 利用 Map 数据结构的特性（既能存储键值对，又能保持插入顺序）实现：
 * - 最近访问的数据放在 Map 末尾
 * - 最久未访问的数据在 Map 头部
 * - 淘汰时直接删除头部元素即可
 */
class LRUCache {
  /**
   * 构造函数，初始化缓存容量
   * @param {number} capacity 缓存最大容量
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * 存入缓存数据
   * @param {any} key 缓存键
   * @param {any} value 缓存值
   */
  get(key) {
    // 如果key不存在，返回-1
    if (!this.cache.has(key)) {
      return -1;
    }

    // 如果key存在，先删除原键值对，再重新插入到Map末尾（表示最近访问）
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  /**
   * 存入缓存数据
   * @param {any} key 缓存键
   * @param {any} value 缓存值
   */
  put(key, value) {
    if (!this.capacity) {
      return;
    }

    // 如果key已经存在，先删除原键值对
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // 存入新的键值对到Map末尾
    this.cache.set(key, value);

    // 如果缓存容量超过限制，删除Map头部的键值对（最久未访问）
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  /**
   * 查看当前LRU缓存内容
   * @returns
   */
  check() {
    return this.cache;
  }
}

// 初始化容量为 2 的 LRU 缓存
const lru = new LRUCache(2);

lru.put(1, 1); // 缓存: {1: 1}
lru.put(2, 2); // 缓存: {1: 1, 2: 2}
console.log(lru.get(1)); // 返回 1，缓存变为: {2: 2, 1: 1}（1 被移到末尾）

lru.put(3, 3); // 容量满，删除最久未用的 2，缓存: {1: 1, 3: 3}
console.log(lru.get(2)); // 返回 -1（2 已被淘汰）

lru.put(4, 4); // 容量满，删除最久未用的 1，缓存: {3: 3, 4: 4}
console.log(lru.get(1)); // 返回 -1（1 已被淘汰）
console.log(lru.get(3)); // 返回 3，缓存变为: {4: 4, 3: 3}
console.log(lru.get(4)); // 返回 4

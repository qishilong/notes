/**
 * 实现 TTL 的 LRU 算法，是指将 LRU（最近最少使用淘汰） 和 TTL（Time To Live，生存时间 / 过期时间淘汰） 两种策略结合的缓存算法，是工业界最常用的实用型缓存方案之一。
 *
 * 核心概念拆解
 * - LRU：管「容量」—— 当缓存容量满时，优先淘汰最久未被访问的数据。
 * - TTL：管「时间」—— 每个缓存数据都有一个「有效期」，超过时间后即使没被 LRU 淘汰，也会被视为失效数据并删除。
 *
 * 结合后形成双淘汰策略，更贴合实际业务需求（比如 Redis 的 LRU 缓存就原生支持 TTL）。
 *
 * 核心逻辑
 * 数据结构：每个缓存条目除了存 key、value，还要存 expireTime（过期时间戳）。
 * 访问时（get）：
 * - 先检查数据是否过期（当前时间 > expireTime），过期则直接删除并返回 -1。
 * - 未过期则更新其「最近访问顺序」（移到 LRU 队列末尾），并返回 value。
 * 存入时（put）：
 * - 若 key 已存在：更新 value 和 expireTime，并调整 LRU 顺序。
 * - 若 key 不存在：先检查容量，满了则淘汰「最久未用」的数据；再存入新数据（含 expireTime）。
 */

class TTLLRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> { value, expireTime }
  }

  // 读取数据
  get(key) {
    if (!key) {
      return -1;
    }
    if (!this.cache.has(key)) {
      return -1;
    }

    const date = Date.now();

    const entry = this.cache.get(key);

    if (date > entry.expireTime) {
      this.cache.delete(key);
      return -1;
    }

    // 更新数据最近访问顺序
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  /**
   * 缓存数据
   * @param {any} key
   * @param {any} value
   * @param {number} ttl 过期时间，毫秒
   * @returns
   */
  put(key, value, ttl) {
    if (!key || typeof ttl !== 'number' || ttl <= 0) {
      return;
    }

    if (!this.capacity) {
      return;
    }

    // 如果 key 已存在，先删除旧的
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // 如果当前容量已经满了，删除缓存中最久未使用的（Map第一个元素）
    if (this.cache.size >= this.capacity) {
      this.latestKey = this.cache.keys().next().value;
      this.cache.delete(latestKey);
    }

    this.cache.set(key, {
      value,
      expireTime: Date.now() + ttl
    });
  }
}

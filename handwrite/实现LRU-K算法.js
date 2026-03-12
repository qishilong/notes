/**
 * LRU-K(Least Recently Used-K)
 * 是 LRU 的主流进阶版本，核心解决原生 LRU 的「缓存污染」问题（单次访问的冷数据挤掉高频访问的热数据）。
 * 核心逻辑：数据需要被访问 K 次后，才会被正式放入缓存队列；淘汰时，以「倒数第 K 次访问的时间」为依据，优先淘汰时间最久的数据。
 */
class LRUKCache {
  /**
   * 构造函数
   * @param {number} capacity 正式缓存最大容量
   * @param {numeric} K 访问次数阀值（默认为2）
   */
  constructor(capacity, K = 2) {
    this.capacity = capacity;
    this.K = K;
    this.lruCache = new Map(); // 正式缓存：key -> { value }（Map插入顺序模拟倒数第K次访问时间）
    this.historyCache = new Map(); // 历史缓存：key -> { value, count, accessTimes:[] }
  }

  /**
   * 获取缓存数据
   * @param {any} key 缓存键
   * @returns {any} 缓存值，不存在返回-1
   */
  get(key) {
    // 1. 先查正式缓存
    if (this.lruCache.has(key)) {
      const { value } = this.lruCache.get(key);
      // 更新正式缓存顺序：删除后重新插入到末尾，模拟最近访问
      this.lruCache.delete(key);
      this.lruCache.set(key, { value });
      return value;
    }
    // 2. 再查历史缓存
    if (this.historyCache.has(key)) {
      const historyEntry = this.historyCache.get(key);
      // 更新访问次数和时间戳
      historyEntry.count++;
      historyEntry.accessTimes.push(Date.now());

      // 保证accessTimes长度不超过K
      if (historyEntry.accessTimes.length > this.K) {
        historyEntry.accessTimes.shift();
      }

      // 若访问次数达到K，移入正式缓存
      if (historyEntry.count >= this.K) {
        this.historyCache.delete(key);
        this._addToLRUCache(key, historyEntry.value);
        return historyEntry.value;
      }

      return historyEntry.value;
    }

    // 3. 都不存在返回-1
    return -1;
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

    // 1. 正式缓存中已经存在，更新value并调整顺序
    if (this.lruCache.has(key)) {
      this.lruCache.delete(key);
      this.lruCache.set(key, { value });
      return;
    }
    // 2. 正式缓存中不存在，但历史缓存中已存在，更新value并触发this.get(更新访问次数)
    if (this.historyCache.has(key)) {
      this.historyCache.get(key).value = value;
      this.get(key);
      return;
    }
    // 3. 都不存在，加入历史缓存数据
    const historyEntry = {
      value,
      count: 1,
      accessTimes: [Date.now()]
    };
    this.historyCache.set(key, historyEntry);
    // 4. 如果K===1，直接加入正式缓存
    if (this.K <= 1) {
      this.historyCache.delete(key);
      this._addToLRUCache(key, value);
    }
  }

  /**
   * 辅助方法：将key加入正式缓存，同时处理容量溢出
   * @param {any} key
   * @param {any} value
   */
  _addToLRUCache(key, value) {
    // 最大缓存容量满了，删除正式缓存中最久的(Map第一个元素)
    if (this.lruCache.size >= this.capacity) {
      const oldestKey = this.lruCache.keys().next().value;
      this.lruCache.delete(oldestKey);
    }
    this.lruCache.set(key, { value });
  }

  /**
   * 查看当前LRU正式缓存和历史缓存
   */
  check() {
    return {
      lruCache: this.lruCache,
      historyCache: this.historyCache
    };
  }
}

const lruK = new LRUKCache(2, 2); // 容量2，K=2
lruK.put(1, 1); // 加入历史缓存（count=1）
lruK.get(1); // 历史缓存count=2，移入正式缓存：{1:1}
lruK.put(2, 2); // 加入历史缓存（count=1）
lruK.put(3, 3); // 加入历史缓存（count=1）
lruK.get(2); // 历史缓存count=2，移入正式缓存：{1:1, 2:2}
lruK.get(3); // 历史缓存count=2，正式缓存满，淘汰1，正式缓存：{2:2, 3:3}
console.log(lruK.get(1)); // 返回-1（1已被淘汰）
console.log(lruK.check());
